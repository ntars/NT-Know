#!/usr/bin/env node
/**
 * build-knowledge.mjs
 * 将 NT-Know 根目录下的 md 文档统一转换为 JS 数据文件
 * 输出：assets/js/knowledge-data.js（window.KNOWLEDGE_DOCS）
 *
 * 转换规则：
 * 1. 解析 frontmatter（title/author/category/tags/summary）
 * 2. 正文中的 OCR 畸形表格（一行内含 || 的分隔符）归一化为标准 markdown 表格
 * 3. 提取标题大纲（## / ###）生成目录 TOC
 * 4. 原文正文完整保留进 JS，网页端渲染，md 源文件不再被网页引用
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, copyFileSync, unlinkSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = __dirname;                 // md 源文件所在目录（NT-Know 根目录）
const OUT_FILE = join(__dirname, 'assets/js/knowledge-data.js');

// ---------- 工具函数 ----------

/** 解析 frontmatter：返回 { meta, body } */
function parseFrontmatter(raw) {
  const meta = {};
  let body = raw;
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (m) {
    body = raw.slice(m[0].length);
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (!kv) continue;
      const key = kv[1];
      let val = kv[2].trim();
      // 去掉成对引号
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      // 数组 [a, b]
      if (val.startsWith('[') && val.endsWith(']')) {
        val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
      }
      meta[key] = val;
    }
  }
  return { meta, body };
}

/** 把 slug 化的中文/英文标题转为可作锚点的 id */
function slugify(text, usedSet) {
  let base = text
    .replace(/[`*_[\]()#>]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5._\-]/g, '');
  if (!base) base = 'h';
  let id = base;
  let i = 2;
  while (usedSet.has(id)) { id = `${base}-${i++}`; }
  usedSet.add(id);
  return id;
}

/**
 * 归一化 OCR 畸形表格：
 * 一行内含多组 "A | B | C || D | E | F" 的形式 → 拆成多行标准 markdown 表
 * 规则：按 || 切分为若干"行"，行内再按 | 切分为单元格；
 * 单元格内容形如 :--- / --- / ---: 的视为分隔行，单独保留为 |---| 行
 */
function normalizeOcrTables(body) {
  const lines = body.split(/\r?\n/);
  const out = [];
  for (const line of lines) {
    // 仅处理含 || 且至少含 2 个 | 的行（表格特征）
    if (line.includes('||') && (line.match(/\|/g) || []).length >= 4) {
      const groups = line.split('||').map(g => g.replace(/^#+/, '').trim()).filter(Boolean);
      const rows = groups.map(g => g.split('|').map(c => c.trim()));
      const tableLines = [];
      for (const cells of rows) {
        // 判断是否分隔行（全为 :--- 之类）
        if (cells.length > 1 && cells.every(c => /^:?-{2,}:?$/.test(c))) {
          tableLines.push('| ' + cells.map(c => c.replace(/:?/g, '')).join(' | ') + ' |');
        } else {
          tableLines.push('| ' + cells.join(' | ') + ' |');
        }
      }
      out.push(tableLines.join('\n'));
    } else {
      out.push(line);
    }
  }
  return out.join('\n');
}

/**
 * 表格规整：修复 OCR 常见畸形 —— 行尾多余的分隔符、列数不齐。
 * 规则：
 * - 连续 `|` 开头的行视为同一表格块
 * - 以「表头 + 分隔行」的列数为准（首块），逐行裁掉多余列 / 补齐缺失列
 * - 行尾多余 `|`（如 `| a | b | c ||`）归一化为单列边界
 * - 表格块内的非表格行（正文混入）分离出去，避免污染表格
 */
function normalizeTables(body) {
  const lines = body.split(/\r?\n/);
  const out = [];
  let i = 0;
  let inCode = false;

  function splitCells(line) {
    let s = line.trim();
    if (s.startsWith('|')) s = s.slice(1);
    if (s.endsWith('|')) s = s.slice(0, -1);
    return s.split('|').map(c => c.trim());
  }
  function isSep(cells) {
    return cells.length > 1 && cells.every(c => c === '' || /^:?-+:?$/.test(c));
  }

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith('```')) { inCode = !inCode; out.push(line); i++; continue; }
    // 非代码块内、且以 | 开头的行 → 汇总为一个表格块
    if (!inCode && line.trim().startsWith('|')) {
      const block = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { block.push(lines[i]); i++; }
      // 拆成单元格矩阵
      let matrix = block.map(splitCells);
      // 找出分隔行位置（必须存在，且在第 1 行之后）
      const sepIdx = matrix.findIndex(isSep);
      if (sepIdx < 1) { out.push(...block); continue; } // 不是规范表格，原样保留
      const colCount = matrix[sepIdx].length;
      const rebuilt = matrix.map((cells, idx) => {
        let c = cells.slice();
        // 分隔行统一为 ---（保留对齐符号）
        if (idx === sepIdx) {
          c = c.map(x => x === '' ? '---' : x);
        }
        // 裁掉多余列（OCR 常见行尾多一个空串）
        while (c.length > colCount && c[c.length - 1] === '') c.pop();
        // 补齐缺失列
        while (c.length < colCount) c.push('');
        // 若裁完仍多列（非空多余列），也强行截断，保证列数一致
        if (c.length > colCount) c = c.slice(0, colCount);
        return '| ' + c.join(' | ') + ' |';
      });
      out.push(...rebuilt);
      continue;
    }
    out.push(line);
    i++;
  }
  return out.join('\n');
}

/**
 * 标题层级归一化（正文只保留 H2 及以下）：
 * - 第 1 个 H1 = 文档标题，由阅读页顶栏承载 → 从正文中移除
 * - 其余 H1（作者当章节用，如「1. 不要早死」）→ 降级为 H2
 * 代码块内的 # 行不受影响。
 */
function normalizeHeadings(body) {
  const lines = body.split(/\r?\n/);
  const out = [];
  let inCode = false;
  let titleRemoved = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) { inCode = !inCode; out.push(line); continue; }
    if (!inCode) {
      const m = line.match(/^#\s+(.+)$/);
      if (m) {
        if (!titleRemoved) { titleRemoved = true; continue; } // 第 1 个 H1 = 文档标题，移除
        out.push('## ' + m[1]);                                // 后续 H1 降级为 H2
        continue;
      }
    }
    out.push(line);
  }
  return out.join('\n');
}

/**
 * 提取标题大纲（目录只收录 H2/H3 两层）。
 * 去重锚点 id 与网页渲染器（app.js renderMarkdown）保持同一序列：
 * 按文档顺序对所有 H1–H6 计算 slug，仅 H2/H3 生成目录条目，
 * 保证「同名标题跨层级」时锚点与目录链接一致。
 */
function extractToc(body) {
  const usedSet = new Set();
  const toc = [];
  let inCode = false;
  for (const line of body.split(/\r?\n/)) {
    if (line.trim().startsWith('```')) { inCode = !inCode; continue; }
    if (inCode) continue;
    const m = line.match(/^(#{1,6})\s+(.+)$/);
    if (!m || line.includes('|')) continue;
    const level = m[1].length;
    const text = m[2].trim();
    if (!text) continue;
    const id = slugify(text, usedSet);
    if (level === 2 || level === 3) toc.push({ level, text, id });
  }
  return toc;
}

/** 文件名转 id（去掉扩展名，中文保留） */
function fileToId(filename) {
  return basename(filename, '.md')
    .replace(/[\\/:*?"<>|]/g, '_')
    .trim();
}

/**
 * 生成卡片一行短描述：优先 frontmatter 的 summary；
 * 缺省时自动提取正文首个有效段落（跳过标题 / 代码块 / 表格 / 列表），
 * 去掉行内 markdown 符号，超 60 字截断加省略号。
 */
function deriveSummary(meta, body) {
  if (meta.summary && String(meta.summary).trim()) return String(meta.summary).trim();
  const lines = body.split(/\r?\n/);
  let inCode = false;
  for (const line of lines) {
    let t = line.trim();
    if (t.startsWith('```')) { inCode = !inCode; continue; }
    if (inCode || !t) continue;
    // 剥离引用块前缀（可多层）
    t = t.replace(/^(?:>\s*)+/, '').trim();
    if (!t) continue;
    if (/^#{1,6}\s/.test(t)) continue;          // 标题行
    if (/^[\s|:-]+$/.test(t)) continue;          // 表格分隔行 |---|
    if (/^\|/.test(t)) continue;                 // 表格行
    if (/^[-*+]\s/.test(t) || /^\d+[.)]\s/.test(t)) continue; // 列表项
    const plain = t
      .replace(/`([^`]+)`/g, '$1')               // 行内代码
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')   // 链接 → 文字
      .replace(/[*_~]/g, '')                     // 强调符号
      .replace(/^[-–—:：>]+\s*/, '')             // 残余行首标记
      .trim();
    if (!plain) continue;
    return plain.length > 60 ? plain.slice(0, 60) + '…' : plain;
  }
  return 'Markdown 文档';
}

// ---------- 主流程 ----------

function main() {
  // 源目录：优先 NT-Know 根目录；找不到时回退到 Github 根目录（md 已迁移的位置）
  const candidates = [SRC_DIR, dirname(SRC_DIR)].filter(Boolean);
  let SRC = null;
  let mdFiles = [];
  for (const dir of candidates) {
    try {
      mdFiles = readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('build') && !f.startsWith('README'));
    } catch (e) { mdFiles = []; }
    if (mdFiles.length) { SRC = dir; break; }
  }

  if (!SRC || mdFiles.length === 0) {
    console.error('[build] 未找到 md 源文件（已在 ' + candidates.join('、') + ' 中查找）');
    console.error('[build] 已中止，未改动 ' + OUT_FILE);
    process.exit(1);
  }
  console.log('[build] 源目录：' + SRC);

  const docs = [];
  for (const file of mdFiles) {
    const raw = readFileSync(join(SRC, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const normalized = normalizeHeadings(normalizeTables(normalizeOcrTables(body.trim())));
    const toc = extractToc(normalized);

    docs.push({
      id: fileToId(file),
      file,
      title: meta.title || fileToId(file),
      author: meta.author || '佚名',
      category: meta.category || 'Markdown文档',
      tags: Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []),
      summary: deriveSummary(meta, normalized),
      toc,
      content: normalized,
      // 统计信息（供卡片展示）
      wordCount: normalized.length,
      tocCount: toc.length,
    });
    console.log(`[build] 已转换：${file} → ${docs[docs.length - 1].title}（${toc.length} 个章节）`);
  }

  // ==================== 安全护栏（防止静默销毁已生成数据） ====================
  // 护栏 1：文档数骤减保护 —— 新结果显著少于现有数据时中止，除非 --force
  const FORCE = process.argv.includes('--force');
  if (!FORCE && existsSync(OUT_FILE)) {
    let prevCount = -1;
    try {
      const prevSrc = readFileSync(OUT_FILE, 'utf8');
      const pm = prevSrc.match(/global\.KNOWLEDGE_DOCS\s*=\s*(\[[\s\S]*\]);/);
      if (pm) prevCount = JSON.parse(pm[1]).length;
    } catch (e) { prevCount = -1; }
    if (prevCount > 0 && docs.length < prevCount) {
      console.error('');
      console.error('[build] ⚠ 安全护栏触发：文档数将从 ' + prevCount + ' 篇减为 ' + docs.length + ' 篇');
      console.error('[build] 这通常意味着 md 源文件缺失（而非你真的删了文档）。');
      console.error('[build] 已中止，未改动 ' + OUT_FILE);
      console.error('[build] 确认要减少文档，请用：node build-knowledge.mjs --force');
      process.exit(1);
    }
  }

  // 护栏 2：写前自动备份（仅保留最近一份 .bak，避免堆积）
  if (existsSync(OUT_FILE)) {
    const BAK = OUT_FILE + '.bak';
    try {
      if (existsSync(BAK)) unlinkSync(BAK);
      copyFileSync(OUT_FILE, BAK);
      console.log('[build] 已备份旧数据 → ' + BAK);
    } catch (e) {
      console.error('[build] ⚠ 备份失败，已中止以保护数据：' + e.message);
      process.exit(1);
    }
  }

  // 护栏 3：内容非空校验 —— 任何一篇正文为空都视为异常
  const emptyDoc = docs.find(d => !d.content || d.content.trim().length === 0);
  if (emptyDoc) {
    console.error('[build] ⚠ 文档《' + emptyDoc.title + '》正文为空，已中止');
    process.exit(1);
  }
  // ========================================================================

  mkdirSync(dirname(OUT_FILE), { recursive: true });
  const jsCode = [
    '/**',
    ' * knowledge-data.js —— 玄玖知识库数据（由 build-knowledge.mjs 自动转换生成，请勿手改）',
    ' * 生成源文件：' + docs.map(d => d.file).join('、'),
    ' * 结构：window.KNOWLEDGE_DOCS = [{ id, title, author, tags, summary, toc:[{level,text,id}], content: "<markdown>" }]',
    ' */',
    '(function (global) {',
    '  "use strict";',
    `  global.KNOWLEDGE_DOCS = ${JSON.stringify(docs, null, 2)};`,
    '})(window);',
    '',
  ].join('\n');

  writeFileSync(OUT_FILE, jsCode, 'utf8');
  const kb = (Buffer.byteLength(jsCode, 'utf8') / 1024).toFixed(0);
  console.log(`[build] 输出：${OUT_FILE}（${kb} KB，共 ${docs.length} 篇）`);
}

main();
