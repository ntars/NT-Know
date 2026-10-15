/* ========================================
   玄玖知识库 - 应用核心逻辑
   功能：文档目录列表渲染 / 全文检索 / 阅读页（Markdown 渲染 + 侧栏目录 + 页内高亮）/ 三端适配
   数据单一真源：window.KNOWLEDGE_DOCS（由 build-knowledge.mjs 生成）
   ======================================== */
(function () {
  'use strict';

  var DOCS = (window.KNOWLEDGE_DOCS || []);
  var STATE = { currentId: null, terms: [] };

  // ---------- DOM 引用 ----------
  // 说明：阅读页的文档名由左侧目录栏顶部承载，正文上方不再重复显示
  var $docList = document.getElementById('doc-list');
  var $docsSection = document.getElementById('docs-section');
  var $docsTitle = document.getElementById('docs-title');
  var $searchInput = document.getElementById('global-search');
  var $searchResults = document.getElementById('search-results');
  var $reader = document.getElementById('reader');
  var $readerBack = document.getElementById('reader-back');
  var $readerSide = document.querySelector('.reader-side');
  var $readerToc = document.getElementById('reader-toc');
  var $readerContent = document.getElementById('reader-content');
  var $greetingTitle = document.getElementById('greeting-title');

  // ========================================
  // 工具函数
  // ========================================
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  // 与 build-knowledge.mjs 中 slugify 保持一致，确保锚点与目录 id 匹配
  function slugify(text, usedSet) {
    var base = text
      .replace(/[`*_[\]()#>]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5._\-]/g, '');
    if (!base) base = 'h';
    var id = base, i = 2;
    while (usedSet && usedSet.has(id)) { id = base + '-' + (i++); }
    if (usedSet) usedSet.add(id);
    return id;
  }

  // ========================================
  // 轻量 Markdown 渲染（不依赖外部 CDN）
  // ========================================

  function inline(text) {
    var re = /`([^`]+)`/g;
    var out = '';
    var last = 0;
    var m;
    while ((m = re.exec(text)) !== null) {
      out += formatInline(escapeHtml(text.slice(last, m.index)));
      out += '<code>' + escapeHtml(m[1]) + '</code>';
      last = m.index + m[0].length;
    }
    out += formatInline(escapeHtml(text.slice(last)));
    return out;
  }
  function formatInline(s) {
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (mm, t, u) {
      return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + '</a>';
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return s;
  }
  function splitRow(line) {
    var s = line.trim();
    if (s.charAt(0) === '|') s = s.slice(1);
    if (s.charAt(s.length - 1) === '|') s = s.slice(0, -1);
    return s.split('|').map(function (c) { return c.trim(); });
  }
  function renderMarkdown(md) {
    var lines = String(md).replace(/\r\n/g, '\n').split('\n');
    var out = [];
    var i = 0;
    var para = [];
    var used = new Set();
    function flushPara() {
      if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; }
    }
    while (i < lines.length) {
      var line = lines[i];
      // 代码块
      if (/^```/.test(line)) {
        flushPara();
        var buf = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        out.push('<pre><code>' + escapeHtml(buf.join('\n')) + '</code></pre>');
        continue;
      }
      // 标题
      var h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        flushPara();
        var lvl = h[1].length;
        var txt = h[2].trim();
        out.push('<h' + lvl + ' id="' + slugify(txt, used) + '">' + inline(txt) + '</h' + lvl + '>');
        i++;
        continue;
      }
      // 分隔线
      if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { flushPara(); out.push('<hr>'); i++; continue; }
      // 引用
      if (/^\s*>\s?/.test(line)) {
        flushPara();
        var qbuf = [];
        while (i < lines.length && /^\s*>\s?/.test(lines[i])) { qbuf.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
        out.push('<blockquote>' + inline(qbuf.join('\n')).replace(/\n/g, '<br>') + '</blockquote>');
        continue;
      }
      // 表格
      if (/^\s*\|.*\|\s*$/.test(line) && i + 1 < lines.length &&
          /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1]) && lines[i + 1].indexOf('-') !== -1) {
        flushPara();
        var header = splitRow(line);
        i += 2;
        var rows = [];
        while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) { rows.push(splitRow(lines[i])); i++; }
        var t = '<table><thead><tr>' + header.map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead><tbody>';
        for (var r = 0; r < rows.length; r++) {
          t += '<tr>' + rows[r].map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
        }
        t += '</tbody></table>';
        out.push(t);
        continue;
      }
      // 列表
      if (/^\s*([-*+])\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
        flushPara();
        var lbuf = [];
        var ordered = /^\s*\d+[.)]\s+/.test(line);
        while (i < lines.length && (/^\s*([-*+])\s+/.test(lines[i]) || /^\s*\d+[.)]\s+/.test(lines[i]))) {
          lbuf.push(lines[i]); i++;
        }
        var tag = ordered ? 'ol' : 'ul';
        out.push('<' + tag + '>' + lbuf.map(function (li) {
          var mm = li.match(/^\s*(?:[-*+]|\d+[.)])\s+(.*)$/);
          return '<li>' + inline(mm ? mm[1] : li) + '</li>';
        }).join('') + '</' + tag + '>');
        continue;
      }
      // 空行
      if (/^\s*$/.test(line)) { flushPara(); i++; continue; }
      // 段落
      para.push(line.trim());
      i++;
    }
    flushPara();
    return out.join('\n');
  }

  // ========================================
  // 文档目录列表渲染（紧凑目录式：序号 + 标题 + 描述 + 章节数，单行不占篇幅）
  // 分页：每页最多 5 条
  // ========================================
  var PAGE_SIZE = 5;
  var PAGE = 1;
  function renderDocCards() {
    if (!DOCS.length) {
      $docList.innerHTML = '<li class="search-empty">未加载到知识库数据（knowledge-data.js）。请先运行 build-knowledge.mjs 生成。</li>';
      return;
    }
    $docsTitle.textContent = 'Knowledge Base';
    renderDocPage();
  }
  function renderDocPage() {
    var total = DOCS.length;
    var pageCount = Math.ceil(total / PAGE_SIZE);
    if (PAGE > pageCount) PAGE = pageCount;
    var start = (PAGE - 1) * PAGE_SIZE;
    var pageDocs = DOCS.slice(start, start + PAGE_SIZE);
    var html = pageDocs.map(function (d) {
      var desc = d.summary || 'Markdown 文档';
      var num = String(start + 1 + pageDocs.indexOf(d));
      if (num.length === 1) num = '0' + num;
      return '' +
        '<li class="doc-index-item" data-id="' + encodeURIComponent(d.id) + '">' +
          '<span class="doc-index-num">' + num + '</span>' +
          '<span class="doc-index-title">' + escapeHtml(d.title) + '</span>' +
          '<span class="doc-index-desc">' + escapeHtml(desc) + '</span>' +
          '<span class="doc-index-meta">' + (d.tocCount || 0) + ' 章</span>' +
        '</li>';
    }).join('');
    // 分页导航（仅多于一页时显示）
    var pager = '';
    if (pageCount > 1) {
      pager = '<li class="doc-pager">' +
        '<button class="pager-btn" data-page="prev" ' + (PAGE <= 1 ? 'disabled' : '') + '>‹ 上一页</button>' +
        '<span class="pager-info">' + PAGE + ' / ' + pageCount + '</span>' +
        '<button class="pager-btn" data-page="next" ' + (PAGE >= pageCount ? 'disabled' : '') + '>下一页 ›</button>' +
        '</li>';
    }
    $docList.innerHTML = html + pager;
    Array.prototype.forEach.call($docList.querySelectorAll('.doc-index-item'), function (el) {
      el.addEventListener('click', function () {
        openDoc(decodeURIComponent(el.getAttribute('data-id')), []);
      });
    });
    var prev = $docList.querySelector('.pager-btn[data-page="prev"]');
    var next = $docList.querySelector('.pager-btn[data-page="next"]');
    if (prev) prev.addEventListener('click', function () { if (PAGE > 1) { PAGE--; renderDocPage(); } });
    if (next) next.addEventListener('click', function () { PAGE++; renderDocPage(); });
  }
  // 进入阅读页时重置分页
  function resetDocPage() { PAGE = 1; }

  // ========================================
  // 检索（跨文档全文）
  // ========================================
  function searchDocs(query) {
    var q = query.trim().toLowerCase();
    if (!q) return [];
    var terms = q.split(/\s+/).filter(Boolean);
    var results = [];
    DOCS.forEach(function (doc) {
      var hay = (doc.title + '\n' + (doc.toc || []).map(function (t) { return t.text; }).join('\n') + '\n' + doc.content).toLowerCase();
      var pass = terms.every(function (t) { return hay.indexOf(t) !== -1; });
      if (!pass) return;
      var score = 0;
      var contentL = doc.content.toLowerCase();
      terms.forEach(function (t) {
        if (doc.title.toLowerCase().indexOf(t) !== -1) score += 10;
        (doc.toc || []).forEach(function (tc) { if (tc.text.toLowerCase().indexOf(t) !== -1) score += 3; });
        var idx = contentL.indexOf(t), c = 0;
        while (idx !== -1 && c < 50) { score += 1; idx = contentL.indexOf(t, idx + 1); c++; }
      });
      // 取首个命中片段
      var firstTerm = terms[0];
      var pos = contentL.indexOf(firstTerm);
      var snippet = '';
      if (pos !== -1) {
        var s = Math.max(0, pos - 24), e = Math.min(doc.content.length, pos + firstTerm.length + 56);
        snippet = (s > 0 ? '…' : '') + doc.content.slice(s, e) + (e < doc.content.length ? '…' : '');
      }
      results.push({ doc: doc, score: score, snippet: snippet });
    });
    results.sort(function (a, b) { return b.score - a.score; });
    return results;
  }

  function highlight(text, terms) {
    var safe = escapeHtml(text);
    terms.forEach(function (t) {
      if (!t) return;
      try {
        safe = safe.replace(new RegExp('(' + escapeRegExp(t) + ')', 'gi'), '<mark>$1</mark>');
      } catch (e) {}
    });
    return safe;
  }

  function renderSearch(q) {
    var results = searchDocs(q);
    if (!results.length) {
      $searchResults.hidden = false;
      $searchResults.innerHTML = '<div class="search-empty">未找到与「' + escapeHtml(q) + '」相关的内容</div>';
      $docsSection.style.display = 'none';
      return;
    }
    $searchResults.hidden = false;
    $docsSection.style.display = 'none';
    $searchResults.innerHTML = results.map(function (r) {
      var meta = r.doc.title + ' · ' + (r.doc.author || '佚名') + ' · ' + fmtSize(r.doc.wordCount || 0);
      return '' +
        '<div class="search-result-item" data-id="' + encodeURIComponent(r.doc.id) + '">' +
          '<div class="search-result-meta">' + escapeHtml(meta) + '</div>' +
          '<div class="search-result-snippet">' + highlight(r.snippet, q.trim().toLowerCase().split(/\s+/).filter(Boolean)) + '</div>' +
        '</div>';
    }).join('');
    Array.prototype.forEach.call($searchResults.querySelectorAll('.search-result-item'), function (el) {
      el.addEventListener('click', function () {
        openDoc(decodeURIComponent(el.getAttribute('data-id')), q.trim().toLowerCase().split(/\s+/).filter(Boolean));
      });
    });
  }

  function clearSearchUI() {
    $searchResults.hidden = true;
    $searchResults.innerHTML = '';
    $docsSection.style.display = '';
  }

  // ========================================
  // 阅读页
  // ========================================
  function openDoc(id, terms) {
    var doc = DOCS.filter(function (d) { return d.id === id; })[0];
    if (!doc) return;
    STATE.currentId = id;
    STATE.terms = terms || [];
    // 文档名显示在左侧目录栏顶部（正文上方不再重复）
    var tocHtml = '<div class="toc-doc-title">' + escapeHtml(doc.title) + '</div>' +
      (doc.toc || []).map(function (t) {
        return '<a class="toc-h' + t.level + '" href="#' + t.id + '" data-target="' + t.id + '">' + escapeHtml(t.text) + '</a>';
      }).join('');
    $readerToc.innerHTML = tocHtml;
    $readerContent.innerHTML = renderMarkdown(doc.content);
    Array.prototype.forEach.call($readerToc.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById(a.getAttribute('data-target'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        $readerToc.classList.remove('open');
      });
    });
    // 页内高亮
    if (STATE.terms.length) highlightInContent(STATE.terms);
    // 显示阅读页
    $docsSection.style.display = 'none';
    $searchResults.hidden = true;
    $reader.hidden = false;
    // 恢复阅读进度
    var saved = readProgress(id);
    window.scrollTo(0, saved || 0);
    updateTocActive();
  }

  function closeDoc() {
    if (STATE.currentId) saveProgress(STATE.currentId, window.scrollY);
    STATE.currentId = null;
    $reader.hidden = true;
    $docsSection.style.display = '';
    clearSearchUI();
    resetDocPage();
    renderDocPage();
    window.scrollTo(0, 0);
  }

  function highlightInContent(terms) {
    var walker = document.createTreeWalker($readerContent, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) {
      var txt = walker.currentNode.nodeValue;
      if (terms.some(function (t) { return txt.toLowerCase().indexOf(t) !== -1; })) nodes.push(walker.currentNode);
    }
    nodes.forEach(function (node) {
      var html = escapeHtml(node.nodeValue);
      terms.forEach(function (t) {
        try { html = html.replace(new RegExp('(' + escapeRegExp(t) + ')', 'gi'), '<mark>$1</mark>'); } catch (e) {}
      });
      var span = document.createElement('span');
      span.innerHTML = html;
      node.parentNode.replaceChild(span, node);
    });
    var first = $readerContent.querySelector('mark');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function updateTocActive() {
    if ($reader.hidden) return;
    var links = $readerToc.querySelectorAll('a');
    if (!links.length) return;
    var cur = null;
    Array.prototype.forEach.call(links, function (a) {
      var el = document.getElementById(a.getAttribute('data-target'));
      if (el && el.getBoundingClientRect().top < 120) cur = a;
    });
    Array.prototype.forEach.call(links, function (a) { a.classList.remove('active'); });
    if (cur) cur.classList.add('active');
  }

  // 阅读进度（localStorage）
  function saveProgress(id, y) { try { localStorage.setItem('kb-read-' + id, String(y)); } catch (e) {} }
  function readProgress(id) { try { return parseInt(localStorage.getItem('kb-read-' + id) || '0', 10); } catch (e) { return 0; } }

  // ========================================
  // 交互绑定
  // ========================================
  var searchTimer = null;
  $searchInput.addEventListener('input', function () {
    var v = $searchInput.value;
    clearTimeout(searchTimer);
    if (!v.trim()) { clearSearchUI(); return; }
    searchTimer = setTimeout(function () { renderSearch(v); }, 140);
  });
  $searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { $searchInput.value = ''; clearSearchUI(); }
  });
  $readerBack.addEventListener('click', closeDoc);
  window.addEventListener('scroll', function () {
    if (!STATE.currentId) return;
    updateTocActive();
  }, { passive: true });
  // "/" 快捷聚焦检索
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== $searchInput && !STATE.currentId) {
      e.preventDefault();
      $searchInput.focus();
    }
  });

  // ========================================
  // 平板/手机彩蛋（Ntars / Ntarstudio，与官网一致）
  // 卡片光晕鼠标交互由 app.min.js（官网同款模块）负责，此处不再重复
  // ========================================
  (function easterEgg() {
    if (!$greetingTitle) return;
    var titleHi = $greetingTitle.querySelector('.title-hi');
    var titleName = $greetingTitle.querySelector('.title-name');
    var isAnimating = false;
    function isTablet() {
      return window.innerWidth >= 768 && window.innerWidth <= 1180 &&
        ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
    function update(mode) {
      if (mode === 'studio') { titleHi.textContent = 'Hi, We\'re'; titleName.textContent = 'Ntarstudio'; }
      else { titleHi.textContent = 'Hi, I\'m'; titleName.textContent = 'Ntars'; }
    }
    function apply() {
      if (isTablet()) {
        // 平板：横屏显示工作室，竖屏显示个人（与官网一致）
        update(window.innerWidth > window.innerHeight ? 'studio' : 'person');
      } else {
        update(window.innerWidth < 768 ? 'person' : 'studio');
      }
    }
    apply();
    $greetingTitle.addEventListener('click', function () {
      if (isTablet()) return;
      isAnimating = true;
      var current = titleName.textContent === 'Ntarstudio' ? 'studio' : 'person';
      var next = current === 'studio' ? 'person' : 'studio';
      $greetingTitle.classList.add('fade-out');
      setTimeout(function () {
        update(next);
        $greetingTitle.classList.remove('fade-out');
        $greetingTitle.classList.add('fade-in');
        setTimeout(function () { $greetingTitle.classList.remove('fade-in'); isAnimating = false; }, 300);
      }, 300);
    });
    window.addEventListener('resize', apply);
    window.addEventListener('orientationchange', function () { setTimeout(apply, 200); });
  })();

  // ========================================
  // 启动
  // ========================================
  renderDocCards();

})();
