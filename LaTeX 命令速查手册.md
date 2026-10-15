---
title: "LaTeX 命令速查手册"
author: "佚名"
category: "Markdown文档"
tags: [Markdown文档, 佚名]
summary: "整理自 LATEX Command Summary（LaTeX v2.09，）。涵盖正文全部命令条目，按命令名字母顺序排…"
---
# LaTeX 命令速查手册
> 整理自 *LATEX Command Summary*（LaTeX v2.09，）。涵盖正文全部命令条目，按命令名字母顺序排列。
| 中文名 | 代码 | 备注 |
| --- | --- | --- |

## 符号与格式命令
| 负细空格 | `\!` | 数学模式下产生 −1/6 quad 的负间距，如 xx\!x 得 xxx |
| 分音符（元音变音） | `\"` | 在字母上加两点分音符，如 ö |
| 井号 | `\#` | 输出 # 符号 |
| 美元符 | `\$` | 输出 $ 符号 |
| 百分号 | `\%` | 输出 % 符号 |
| 与号 | `\&` | 输出 & 符号 |
| 锐音符 | `\'` | 在字母上加锐音符（´）；在 tabbing 环境中把当前列移到前一列右侧 |
| 行内数学开始 | `\(` | 开始行内数学模式，同 \begin{math} 或 $ |
| 行内数学结束 | `\)` | 结束行内数学模式，同 \end{math} 或 $ |
| 可选乘号 | `\*` | 输出可在此处断行的乘号 |
| 制表位右移 | `\+` | 在 tabbing 环境中把左边距右移一个制表位，并开启制表行 |
| 细空格 | `\,` | 产生 1/6 quad 的细空格，不限于数学模式 |
| 制表位左移 / 可选连字符 | `\-` | 在 tabbing 环境中把左边距左移一个制表位；其余情形为可选连字符 |
| 点音符 | `\.` | 在字母上方加点，如 ȯ |
| 斜体校正空格 | `\/` | 插入斜体校正间距 |
| 中等空格 | `\:` | 数学模式下产生 2/9 quad 的中等空格 |
| 粗空格 | `\;` | 数学模式下产生 5/18 quad 的粗空格 |
| 置于左边距左侧 | `\<` | 在 tabbing 环境中把文字放到局部左边距的左侧 |
| 设置制表位 / 长音符 | `\=` | 在 tabbing 环境中设置一个制表位；其余情形为长音符（¯） |
| 前进一个制表位 / 中等空格 | `\>` | 在 tabbing 环境中为前进制表；数学模式下为 2/9 quad 中等空格 |
| 句末句号 | `\@` | 声明其后的句号为句子结束的句号 |
| 换行且禁止分页 | `\\*` | 终止当前行，但不允许在此处分页 |
| 结束显示数学 | `\]` | 同 \end{displaymath} 或 $$ |
| 抑扬符 | `\^` | 产生抑扬符号，如 ô |
| 下划线 | `\_` | 产生下划线，如 hours\_worked |
| 钝音符 / 右对齐 | `\`` | 在 tabbing 环境中把其后文字（至 \\）推到右边界；其余情形为钝音符（ò） |
| 左花括号 | `\{` | 输出左花括号 { |
| 竖线（范数） | `\\ | ` | 数学模式下输出竖线 |
| 右花括号 | `\}` | 输出右花括号 } |
| 波浪符 | `\~` | 产生波浪号，如 ñ |

## 命令 · \a – \e
| tabbing 锐音符 | `\a'` | 在 tabbing 环境中产生锐音符，如 ó |
| tabbing 钝音符 | `\a`` | 在 tabbing 环境中产生钝音符，如 ò |
| tabbing 长音符 | `\a=` | 在 tabbing 环境中产生长音符，如 ō |
| 北欧字母 å | `\aa` | 输出 å；\AA 输出 Å |
| 锐音符（数学） | `\acute` | 数学模式下加锐音符，如 á |
| 写入目录条目 | `\addcontentsline{toc}{section}{name}` | 向 .toc 文件写入 \contentsline{section}{name} |
| 回信地址 | `\address{text}` | 在 letter 文档样式中声明回信地址 |
| 追加目录内容 | `\addtocontents{toc}{text}` | 把 text 写入 .toc 文件 |
| 计数器增加 | `\addtocounter{name}{amount}` | 给计数器 name 增加 amount |
| 长度增加 | `\addtolength{\nl}{length}` | 给长度命令 \nl 增加 length，另见 \setlength、\newlength、\settowidth |
| 连字 æ | `\ae` | 输出 æ；\AE 输出 Æ |
| 阿列夫符号 | `\aleph` | 数学模式输出 ℵ |
| 小写字母计数 | `\alph{counter}` | 把计数器输出为小写字母；\Alph 输出大写字母 |
| 希腊字母 α | `\alpha` | 数学模式输出 α |
| 余积符号 | `\amalg` | 数学模式输出 ∐ |
| 多作者分隔 | `\and` | 为 \maketitle 分隔多位作者 |
| 角符号 | `\angle` | 数学模式输出 ∠ |
| 开始附录 | `\appendix` | 开始附录部分 |
| 约等于 | `\approx` | 数学模式输出 ≈ |
| 阿拉伯数字计数 | `\arabic{counter}` | 把计数器输出为阿拉伯数字 1、2 等 |
| 反正切 | `\arctan` | 数学模式输出 arctan |
| 辐角 | `\arg` | 数学模式输出 arg |
| 数组列间距 | `\arraycolsep` | array 环境中列与列之间的间距宽度 |
| 数组线宽 | `\arrayrulewidth` | tabular 或 array 环境中由 \ | 、\hline、\vline 产生的线条宽度 |
| 数组行距因子 | `\arraystretch` | array 与 tabular 环境中行间距的缩放因子 |
| 星号运算符 | `\ast` | 数学模式输出 ∗ |
| 渐近等于 | `\asymp` | 数学模式输出 ≍ |
| 声明作者 | `\author{names}` | 为 \maketitle 声明作者 |
| 下短横线音符 | `\b` | 产生下横杠音符，如 o̱ |
| 上横线（均值） | `\bar` | 数学模式下在字母上加横线，如 ā |
| 基线间距 | `\baselineskip` | 上一行底部到下一行底部的距离 |
| 基线伸展因子 | `\baselinestretch` | 每次执行字号改变命令时 \baselineskip 所乘的因子 |
| 开始环境 | `\begin{environment}` | 总与 \end{environment} 配对，后列各类具体环境 |
| 摘要环境 | `\begin{abstract}` | 开始摘要环境 |
| 数组环境 | `\begin{array}{lrc}` | 开始 array 环境，lrc 指定各列左齐、右齐、居中 |
| 居中环境 | `\begin{center}` | 开始每行居中的环境 |
| 描述列表环境 | `\begin{description}` | 开始带标签的列表，条目用 \item[label] |
| 独立数学环境 | `\begin{displaymath}` | 把公式单独排成一行 |
| 正文开始 | `\begin{document}` | 开始文档正文 |
| 编号列表环境 | `\begin{enumerate}` | 开始编号列表，条目用 \item |
| 多行公式环境 | `\begin{eqnarray}` | 开始 eqnarray 环境，每行用 \\ 或 \\* 分隔，可用 \nonumber 去掉编号 |
| 无编号多行公式 | `\begin{eqnarray*}` | 类似 eqnarray 但不编号 |
| 浮动图形环境 | `\begin{figure}[pos]` | 开始可浮动定位的图形环境，pos 见位置参数 |
| 通栏图形环境 | `\begin{figure*}[pos]` | 开始跨双栏的图形环境 |
| 左对齐环境 | `\begin{flushleft}` | 开始右边界不齐的左对齐环境，行间用 \\ 分隔，另见 \raggedright |
| 右对齐环境 | `\begin{flushright}` | 开始左边界不齐的右对齐环境，行间用 \\ 分隔，另见 \raggedleft |
| 无编号列表环境 | `\begin{itemize}` | 开始带项目符号（•）的列表，条目用 \item |
| 通用列表环境 | `\begin{list}{labeling}{spacing}` | 开始通用列表；labeling 指定 \item 无参数时的标签，spacing 为可选间距参数 |
| 行内数学环境 | `\begin{math}` | 开始如 x²+y² 的行内数学，同 $ 或 \( |
| 小页环境 | `\begin{minipage}[pos]{vsize}` | 开始高度为 vsize 的盒子，文字按 pos 定位 |
| 绘图环境 | `\begin{picture}(x,y)(x,y )` | 开始 picture 绘图环境，指定画布尺寸与参考点 |
| 引用块环境 | `\begin{quotation}` | 开始带缩进的引用环境 |
| 短引用环境 | `\begin{quote}` | 开始边距更宽的引用环境 |
| 制表环境 | `\begin{tabbing}` | 开始分栏对齐的 tabbing 环境 |
| 浮动表格环境 | `\begin{table}[pos]` | 开始可浮动定位的表格环境 |
| 通栏表格环境 | `\begin{table*}[pos]` | 开始跨双栏的表格环境 |
| 制表环境 | `\begin{tabular}{arg}` | 开始 tabular 表格环境，arg 指定列格式 |
| 定理环境 | `\begin{theorem}` | 另见 \newtheorem |
| 标题页环境 | `\begin{titlepage}` | 开始不带页码的标题页，其后一页编号为 1 |
| 原样排版环境 | `\begin{verbatim}` | 开始逐字原样排版环境，回车等一律照排，通常用等宽字体 |
| 诗歌环境 | `\begin{verse}` | 开始诗歌环境，边距更宽、不缩进段首、右边界不齐 |
| 希腊字母 β | `\beta` | 数学模式输出 β |
| 粗体 | `\bf` | 切换到粗体字 |
| 参考文献条目 | `\bibitem{ref}` | 创建编号为 ref 的参考文献条目 |
| 插入参考文献 | `\bibliography{file}` | 从 file.bib 插入参考文献 |
| 参考文献样式 | `\bibliographystyle{style}` | 指定参考文献格式，类似 \documentstyle |
| 大圆符号 | `\bigcirc` | 数学模式输出 ○ |
| 大下三角 | `\bigtriangledown` | 数学模式输出 ▽ |
| 大上三角 | `\bigtriangleup` | 数学模式输出 △ |
| 大垂直间距 | `\bigskip` | 标准的大号垂直跳过 |
| 大间距默认值 | `\bigskipamount` | \bigskip 的默认长度 |
| 二元取模 | `\bmod` | 输出二元取模表达式 a mod m |
| 数学粗体 | `\boldmath` | 把数学斜体与数学符号改为粗体，应在数学模式外使用 |
| 垂直符号 | `\bot` | 数学模式输出 ⊥ |
| 页底浮动占比 | `\bottomfraction` | 页底可被浮动体占据的最大比例 |
| 领结符号 | `\bowtie` | 数学模式输出 ⋈ |
| 方框符号 | `\Box` | 数学模式输出 □ |
| 短音符 | `\breve` | 数学模式下加短音符，如 ă |
| 项目圆点 | `\bullet` | 数学模式输出 • |
| 下加尾符（软音符） | `\c` | 产生软音符，如 ç |
| 交集 | `\cap` | 数学模式输出 ∩ |
| 图表标题 | `\caption[loftitle]{text}` | 在 figure 或 table 环境中创建带编号的标题；loftitle 为图表目录条目 |
| 抄送列表 | `\cc{text}` | 在 letter 文档样式中声明抄送人列表 |
| 居中点（乘点） | `\cdot` | 数学模式输出 · |
| 居中省略号 | `\cdots` | 输出居中于行的三个点 ···（对比 \ldots） |
| 居中声明 | `\centering` | 声明其后所有文字居中（对比 \begin{center}） |
| 开始章 | `\chapter[toctitle]{text}` | 开始新章，自动加标题并编号；toctitle 为目录条目 |
| 无编号章 | `\chapter*{title}` | 同 \chapter，但不编号、不进目录 |
| 抑扬符（数学） | `\check` | 数学模式下加抑扬符，如 ǎ |
| 希腊字母 χ | `\chi` | 数学模式输出 χ |
| 小圆圈 | `\circ` | 数学模式输出 ◦ |
| 画圆 | `\circle{diameter}` | 作为 \put 的参数绘制指定直径的圆 |
| 画实心圆 | `\circle*{diameter}` | 同 \circle，但绘制实心圆 |
| 文献引用 | `\cite[subcit]{ref}` | 产生方括号形式的引用，可选 subcit 追加说明 |
| 清空至奇数页 | `\cleardoublepage` | 强制下一页为右侧的奇数页 |
| 强制分页 | `\clearpage` | 就地结束当前页，并把浮动体排出 |
| 部分横线 | `\cline{i-j}` | 在 tabular 中从第 i 列到第 j 列画一条横线 |
| 信函结束语 | `\closing{text}` | 在 letter 文档样式中声明信函结束语 |
| 梅花花色 | `\clubsuit` | 数学模式输出 ♣ |
| 栏间距 | `\columnsep` | 两栏之间的距离 |
| 栏间线宽 | `\columnseprule` | 两栏之间分隔线的宽度 |
| 当前栏宽 | `\columnwidth` | 当前栏的宽度 |
| 余弦 | `\cos` | 数学模式输出 cos |
| 双曲余弦 | `\cosh` | 数学模式输出 cosh |
| 余切 | `\cot` | 数学模式输出 cot |
| 双曲余切 | `\coth` | 数学模式输出 coth |
| 余割 | `\csc` | 数学模式输出 csc |
| 并集 | `\cup` | 数学模式输出 ∪ |
| 下点音符 | `\d` | 产生下加点音符，如 ọ |
| 剑标 | `\dag` | 输出 † |
| 剑标（数学） | `\dagger` | 数学模式输出 † |
| 虚线框盒子 | `\dashbox{dwid}(width,height)[pos]{text}` | 绘制线宽为 dwid 的虚线框盒子 |
| 左断言符号 | `\dashv` | 数学模式输出 ⊣ |
| 声明 | `\date{adate}` | 为 \maketitle 声明，默认为 \today |
| 当前日 | `\day` | 当前是当月的第几日 |
| 双栏浮动页占比 | `\dblfloatpagefraction` | 双栏浮动页上必须被浮动体占据的最小比例 |
| 双栏浮动间距 | `\dblfloatsep` | 双栏浮动体之间的距离 |
| 双栏文本浮动间距 | `\dbltextfloatsep` | 双栏时顶部或底部浮动体与正文之间的距离 |
| 双栏顶部占比 | `\dbltopfraction` | 双栏页顶部可被浮动体占据的最大比例 |
| 双剑标 | `\ddag` | 输出 ‡ |
| 双剑标（数学） | `\ddagger` | 数学模式输出 ‡ |
| 双点音符 | `\ddot` | 在字母上加两点，如 ä |
| 斜向省略号 | `\ddots` | 输出斜向排列的省略点（数学模式） |
| 度数 | `\deg` | 数学模式输出 deg |
| 希腊字母 δ | `\delta` | 输出 δ；\Delta 输出 Δ |
| 行列式 | `\det` | 数学模式输出 det |
| 菱形 | `\diamond` | 输出 ⋄；\Diamond 输出 ◇（均为数学模式） |
| 方块花色 | `\diamondsuit` | 数学模式输出 ♢ |
| 维数 | `\dim` | 数学模式输出 dim |
| 显示数学样式 | `\displaystyle` | 切换到独立公式的排版样式 |
| 上点（导数） | `\dot` | 数学模式下在字母上方加点，如 ȧ |
| 点线填充 | `\dotfill` | 用点线填充水平空间 |
| 双线间距 | `\doublerulesep` | 双线之间的水平距离 |
| 向下箭头 | `\downarrow` | 输出 ↓；\Downarrow 输出 ⇓（数学模式） |
| 花体小写 l | `\ell` | 数学模式输出 ℓ |
| 强调 | `\em` | 在正体与斜体之间切换以表示强调 |
| 空集 | `\emptyset` | 数学模式输出 ∅ |
| 附件列表 | `\encl{text}` | 在 letter 文档样式中声明附件列表 |
| 结束环境 | `\end{environment}` | 结束由 \begin{environment} 开始的环境 |
| 希腊字母 ε | `\epsilon` | 数学模式输出 ε |
| 恒等于 | `\equiv` | 数学模式输出 ≡ |
| 希腊字母 η | `\eta` | 数学模式输出 η |
| 偶数页左边距 | `\evensidemargin` | 偶数页左边距的附加量 |
| 存在 | `\exists` | 数学模式输出 ∃ |
| 指数函数 | `\exp` | 数学模式输出 exp |

## 命令 · \f – \i
| 带框盒子 | `\fbox{text}` | 在文字外围画一个框 |
| 框线粗细 | `\fboxrule` | \fbox 与 \framebox 框线的粗细 |
| 框内边距 | `\fboxsep` | \fbox 与 \framebox 中框与文字之间的距离 |
| 弹性填充长度 | `\fill` | 可伸展填充任意长度的橡皮长度（glue） |
| 降音符 | `\flat` | 数学模式输出 ♭ |
| 浮动页占比 | `\floatpagefraction` | 浮动页上被浮动体占据的最小比例 |
| 浮动体间距 | `\floatsep` | 出现在同一页顶部或底部的浮动体之间的距离 |
| 页面底部对齐 | `\flushbottom` | 使页面拉伸至 \textheight 的高度 |
| 符号计数 | `\fnsymbol{counter}` | 把计数器输出为一串符号之一 |
| 脚注 | `\footnote{text}` | 以 text 创建脚注 |
| 脚注编号 | `\footnotemark` | 在正文中放置脚注编号 |
| 脚注间距撑 | `\footnotesep` | 脚注之间所放支柱的高度 |
| 脚注字号 | `\footnotesize` | 切换到脚注大小的字号 |
| 页脚距离 | `\footskip` | 正文底部到页脚底部的垂直距离 |
| 脚注文本 | `\footnotetext{text}` | 为 \footnotemark 指定脚注文本 |
| 全称量词 | `\forall` | 数学模式输出 ∀ |
| 分数 | `\frac{numerator}{denominator}` | 输出分子在上、分母在下的分数 |
| 加框（描边） | `\frame{text}` | 为文字制作一个描边框 |
| 定宽框盒子 | `\framebox[size][pos]{text}` | 产生指定大小与对齐位置的框盒子 |
| 向下弯弧 | `\frown` | 数学模式输出 ⌢ |
| 严格断行 | `\fussy` | 默认的断行声明，对断行要求较严格 |
| 希腊字母 γ | `\gamma` | 输出 γ；\Gamma 输出 Γ |
| 最大公约数 | `\gcd` | 数学模式输出 gcd |
| 大于等于 | `\ge` | 数学模式输出 ≥ |
| 大于等于 | `\geq` | 数学模式输出 ≥ |
| 向左赋值 | `\gets` | 数学模式输出 ← |
| 远大于 | `\gg` | 数学模式输出 ≫ |
| 术语条目 | `\glossary{text}` | 把 text 追加到 .glo 文件 |
| 术语表条目 | `\glossaryentry{text}{ref}` | 写入术语表的条目，含文本与引用 |
| 钝音符（数学） | `\grave` | 数学模式下加钝音符，如 à |
| 匈牙利长分音符 | `\H` | 输出匈牙利式长分音符，如 ő |
| 宽帽符（数学） | `\hat` | 数学模式下加抑扬符，如 â |
| 普朗克常数符号 | `\hbar` | 数学模式输出 ℏ |
| 页眉间距 | `\headsep` | 页眉底部到正文顶部的垂直距离 |
| 红桃花色 | `\heartsuit` | 数学模式输出 ♡ |
| 水平填充 | `\hfill` | 等价于 \hspace{\fill}，向右撑满剩余空间 |
| 水平线 | `\hline` | 在 tabular 中横跨所有列画一条水平线 |
| 同态 | `\hom` | 数学模式输出 hom |
| 带钩左箭头 | `\hookleftarrow` | 数学模式输出 ↩ |
| 带钩右箭头 | `\hookrightarrow` | 数学模式输出 ↪ |
| 水平线填充 | `\hrulefill` | 用水平线填充水平空间 |
| 水平间距 | `\hspace{len}` | 留出长度为 len 的水平空白 |
| 不断行水平间距 | `\hspace*{len}` | 同 \hspace，但该处不允许断行 |
| 超大字号 | `\huge` | 切换到非常大的字号；\Huge 更大 |
| 指定断词点 | `\hyphenation{wordlist}` | 声明单词的可断词位置 |
| 无点小写 i | `\i` | 输出 ı |
| 当且仅当 | `\iff` | 数学模式输出 ⟺ |
| 虚部 | `\Im` | 数学模式输出 ℑ |
| 无点 i（数学） | `\imath` | 数学模式输出 ı |
| 属于 | `\in` | 数学模式输出 ∈ |
| 包含文件（分页） | `\include{filename}` | 在此处引入 filename 的内容，并另起新页 |
| 限定包含范围 | `\includeonly{file1,file2,...}` | 限制 \include 只处理列出的文件 |
| 索引条目 | `\index{text}` | 把 text 追加到 .idx 索引文件 |
| 索引条目写入 | `\indexentry{text}{ref}` | 写入 .idx 文件的条目 |
| 索引分组空行 | `\indexspace` | 在索引中每组首字母前插入空行 |
| 下确界 | `\inf` | 数学模式输出 inf |
| 无穷 | `\infty` | 数学模式输出 ∞ |
| 读入文件 | `\input{file}` | 在此处读入 file.tex 的内容 |
| 页内浮动间距 | `\intextsep` | 页面内浮动体上下所留的垂直间距 |
| 希腊字母 ι | `\iota` | 数学模式输出 ι |
| 斜体 | `\it` | 切换到斜体 |
| 条目缩进 | `\itemindent` | 列表中标签前的附加缩进 |
| 条目间距 | `\itemsep` | 列表中相邻条目之间的垂直间距 |

## 命令 · \j – \q
| 无点小写 j | `\j` | 输出 ȷ |
| 无点 j（数学） | `\jmath` | 数学模式输出 ȷ |
| 连接符号 | `\Join` | 数学模式输出 ⋈ |
| 希腊字母 κ | `\kappa` | 数学模式输出 κ |
| 核 | `\ker` | 数学模式输出 ker |
| 丢弃制表行 | `\kill` | 在 tabbing 环境中删除当前制表行 |
| 波兰字母 ł | `\l` | 输出 ł；\L 输出 Ł |
| 标签（引用锚点） | `\label{text}` | 提供可被 \ref 或 \pageref 引用的锚点 |
| 标签盒宽度 | `\labelwidth` | 列表中容纳标签的盒子宽度 |
| 标签间距 | `\labelsep` | 标签盒与条目正文之间的距离 |
| 希腊字母 λ | `\lambda` | 输出 λ；\Lambda 输出 Λ |
| 逻辑与 | `\land` | 数学模式输出 ∧ |
| 左尖括号 | `\langle` | 数学模式输出 ⟨ |
| 大号字 | `\large` | \large、\Large、\LARGE 依次切换到更大的字号 |
| LaTeX 标志 | `\LaTeX` | 输出 LaTeX 徽标 |
| 左花括号（数学） | `\lbrace` | 数学模式输出 { |
| 左方括号 | `\lbrack` | 数学模式输出 [ |
| 左上限括号 | `\lceil` | 数学模式输出 ⌈ |
| 基线省略号 | `\ldots` | 输出位于基线的三个点 … |
| 小于等于 | `\le` | 数学模式输出 ≤ |
| 曲折箭头 | `\leadsto` | 数学模式输出 ⇝ |
| 左定界符 | `\left*` | 与 \right* 配对使用（* 为定界符，不必左右相同） |
| 左箭头 | `\leftarrow` | 输出 ←；\Leftarrow 输出 ⇐（数学模式） |
| 左对齐公式 | `\lefteqn{formula}` | 在 eqnarray 环境中使用，使公式左对齐 |
| 左鱼叉下箭头 | `\leftharpoondown` | 数学模式输出 ↽ |
| 左鱼叉上箭头 | `\leftharpoonup` | 数学模式输出 ↼ |
| 左边距 | `\leftmargin` | 在 list 环境中，环境左边距到列表左边距的水平距离 |
| 小于等于 | `\leq` | 数学模式输出 ≤ |
| 左下限括号 | `\lfloor` | 数学模式输出 ⌊ |
| 常用对数 | `\lg` | 数学模式输出 lg |
| 左三角头 | `\lhd` | 数学模式输出 ⊲ |
| 极限 | `\lim` | 数学模式输出 lim |
| 下极限 | `\liminf` | 数学模式输出 lim inf |
| 上极限 | `\limsup` | 数学模式输出 lim sup |
| 画线 | `\line(x,y){len}` | 在 picture 环境中配合 \put，从 \put 位置画一条指定斜率的线 |
| 强制断行 | `\linebreak[n]` | 强制在此处断行，n 为可选优先级 |
| 线宽 | `\linethickness{dimen}` | 设置其后所有线条的粗细 |
| 当前行宽 | `\linewidth` | 当前行的宽度 |
| 图目录 | `\listoffigures` | 生成插图目录 |
| 表目录 | `\listoftables` | 生成表格目录 |
| 列表段落缩进 | `\listparindent` | 列表中条目内段落的附加缩进 |
| 远小于 | `\ll` | 数学模式输出 ≪ |
| 自然对数 | `\ln` | 数学模式输出 ln |
| 逻辑非 | `\lnot` | 数学模式输出 ¬ |
| 对数 | `\log` | 数学模式输出 log |
| 长左箭头 | `\longleftarrow` | 输出 ⟵；\Longleftarrow 输出 ⟸ |
| 长左右箭头 | `\longleftrightarrow` | 输出 ⟷ |
| 长双线左右箭头 | `\Longleftrightarrow` | 数学模式输出 ⟺ |
| 长映射箭头 | `\longmapsto` | 数学模式输出 ⟼ |
| 长右箭头 | `\longrightarrow` | 输出 ⟶；\Longrightarrow 输出 ⟹ |
| 逻辑或 | `\lor` | 数学模式输出 ∨ |
| 左引号 | `\lq` | 输出左引号 ` |
| 定宽盒子 | `\makebox[size][pos]{text}` | 创建指定大小与对齐位置的盒子 |
| 启用索引 | `\makeindex` | 允许写入 \indexentry 命令到 .idx 文件 |
| 生成标题 | `\maketitle` | 用 \title、\author 及可选 \date 生成标题 |
| 映射箭头 | `\mapsto` | 数学模式输出 ↦ |
| 边注 | `\marginpar{text}` | 把文字作为边注放在页边 |
| 边注最小间距 | `\marginparpush` | 两条边注之间允许的最小垂直距离 |
| 边注间距 | `\marginparsep` | 正文与边注之间的水平距离 |
| 边注宽度 | `\marginparwidth` | 边注的宽度 |
| 左右页眉 | `\markboth{lhd}{rhd}` | 定义左页眉 lhd 与右页眉 rhd |
| 右页眉 | `\markright{rhd}` | 定义右页眉 rhd |
| 最大值 | `\max` | 数学模式输出 max |
| 水平盒子 | `\mbox{text}` | 把文字放入一个水平盒子，内部不允许断行 |
| 中等垂直间距 | `\medskip` | 标准的中等垂直跳过 |
| 中等间距默认值 | `\medskipamount` | \medskip 的默认长度 |
| 姆欧符号 | `\mho` | 数学模式输出 ℧ |
| 整除 / 中点 | `\mid` | 数学模式输出 ∣ |
| 最小值 | `\min` | 数学模式输出 min |
| 数学斜体 | `\mit` | 数学斜体字体，如 ⋄（数学模式） |
| 蕴含（模型） | `\models` | 数学模式输出 ⊨ |
| 当前月 | `\month` | 当前是第几个月 |
| 减加号 | `\mp` | 数学模式输出 ∓ |
| 希腊字母 μ | `\mu` | 数学模式输出 μ |
| 跨列单元格 | `\multicolumn{noc}{fmt}{text}` | 在 tabular 环境中让文字横跨 noc 列，格式由 fmt 指定 |
| 多次重复放置 | `\multiput(x,y)(Δx,Δy){n}{obj}` | 在 picture 环境中按 (Δx,Δy) 步长重复放置 n 次 obj |
| 倒三角（梯度） | `\nabla` | 数学模式输出 ∇ |
| 还原记号 | `\natural` | 数学模式输出 ♮ |
| 不等于 | `\ne` | 数学模式输出 ≠ |
| 右上箭头 | `\nearrow` | 数学模式输出 ↗ |
| 否定符号 | `\neg` | 数学模式输出 ¬ |
| 不等于 | `\neq` | 数学模式输出 ≠ |
| 定义新命令 | `\newcommand{\cs}[narg]{def}` | 定义新命令 \cs，narg 为参数个数，def 为定义体 |
| 定义新计数器 | `\newcounter{counter}[name]` | 定义计数器，可选在 name 计数器递增时归零 |
| 定义新环境 | `\newenvironment{envname}[narg]{def1}{def2}` | 定义新环境，def1 在进入时执行、def2 在退出时执行 |
| 定义新字体命令 | `\newfont{cs}{name}` | 定义选择字体 name 的命令 \cs |
| 定义新长度 | `\newlength{\nl}` | 把 \nl 建立为一个初始为 0in 的长度 |
| 换行 | `\newline` | 就地断行，且不拉伸该行 |
| 分页 | `\newpage` | 就地结束当前页（对比 \clearpage） |
| 定义新盒子 | `\newsavebox{\binname}` | 声明一个新盒子用于存放 \savebox |
| 定义定理环境 | `\newtheorem{env}[env2]{label}[sectyp]` | 定义定理类环境 env，可选沿用 env2 的编号或与章节关联 |
| 包含（反向属于） | `\ni` | 数学模式输出 ∋ |
| 不写辅助文件 | `\nofiles` | 禁止写出 .idx、.toc 等辅助文件 |
| 取消首行缩进 | `\noindent` | 取消段落首行的缩进 |
| 禁止断行 | `\nolinebreak[n]` | 禁止在此处断行，n 为可选优先级 |
| 取消公式编号 | `\nonumber` | 在 eqnarray 环境中取消该行公式编号 |
| 禁止分页 | `\nopagebreak[n]` | 禁止在此处分页，n 为可选优先级 |
| 常规边注位置 | `\normalmarginpar` | 边注位置的默认声明（对比 \reversemarginpar） |
| 正文字号 | `\normalsize` | 文档的默认字号 |
| 加斜线否定 | `\not` | 给关系运算符加一条斜线，如 \not= 输出 ≠ |
| 不属于 | `\notin` | 数学模式输出 ∉ |
| 希腊字母 ν | `\nu` | 数学模式输出 ν |
| 左上箭头 | `\nwarrow` | 数学模式输出 ↖ |
| 北欧字母 ø | `\o` | 输出 ø；\O 输出 Ø |
| 奇数页左边距 | `\oddsidemargin` | 奇数页左边距的附加量 |
| 圆点运算符 | `\odot` | 数学模式输出 ⊙ |
| 连字 œ | `\oe` | 输出 œ；\OE 输出 Œ |
| 希腊字母 ω | `\omega` | 输出 ω；\Omega 输出 Ω |
| 圆减运算符 | `\ominus` | 数学模式输出 ⊖ |
| 单栏排版 | `\onecolumn` | 声明单栏排版（默认） |
| 信函开场白 | `\opening{text}` | 在 letter 文档样式中声明开场白 |
| 圆加运算符 | `\oplus` | 数学模式输出 ⊕ |
| 圆斜线运算符 | `\oslash` | 数学模式输出 ⊘ |
| 张量积 | `\otimes` | 数学模式输出 ⊗ |
| 画椭圆 | `\oval(x,y)` | 作为 \put 的参数绘制椭圆 |
| 上划线 | `\overline{text}` | 在文字上方加一条横线（数学模式） |
| 包含 | `\owns` | 数学模式输出 ∋ |
| 段落符号 | `\P` | 输出 ¶ |
| 强制分页 | `\pagebreak[n]` | 在此处强制分页，n 为可选优先级 |
| 页码样式 | `\pagenumbering{style}` | 决定页码的编号样式 |
| 页码引用 | `\pageref{text}` | 输出 \label{text} 所在页的页码 |
| 页面样式 | `\pagestyle{sty}` | 决定页眉页脚的样式 |
| 开始段落标题 | `\paragraph[toctitle]{text}` | 开始新的段落级标题，自动编号；toctitle 为目录条目 |
| 无编号段落标题 | `\paragraph*{text}` | 开始段落标题并输出标题，但不编号、不进目录 |
| 平行符号 | `\parallel` | 数学模式输出 ∥ |
| 段落盒子 | `\parbox[pos]{size}{text}` | 创建一个可容纳多行的文本盒子 |
| 首行缩进 | `\parindent` | 段落首行添加的水平缩进 |
| 段间距 | `\parskip` | 段落之间附加的垂直间距 |
| 开始部 | `\part[toctitle]{text}` | 开始新的"部"，自动编号；toctitle 为目录条目 |
| 无编号部 | `\part*{text}` | 开始部并输出标题，但不编号、不进目录 |
| 偏导数符号 | `\partial` | 数学模式输出 ∂ |
| 列表顶部附加间距 | `\partopsep` | 列表环境前附加的垂直间距 |
| 垂直符号 | `\perp` | 数学模式输出 ⊥ |
| 希腊字母 φ | `\phi` | 输出 φ；\Phi 输出 Φ |
| 希腊字母 π | `\pi` | 输出 π；\Pi 输出 Π |
| 正负号 | `\pm` | 数学模式输出 ± |
| 带括号取模 | `\pmod{modulus}` | 输出带括号的取模表达式 |
| 恢复制表位 | `\poptabs` | 撤销上一次 \pushtabs |
| 英镑符号 | `\pounds` | 输出 £ |
| 概率 | `\Pr` | 数学模式输出 Pr |
| 先于 | `\prec` | 数学模式输出 ≺ |
| 先于或等于 | `\preceq` | 数学模式输出 ⪯ |
| 撇号（导数） | `\prime` | 数学模式输出 ′ |
| 正比于 | `\propto` | 数学模式输出 ∝ |
| 保护易损命令 | `\protect` | 允许在移动参数中使用"易损"命令 |
| 附言 | `\ps` | 在 letter 文档样式中允许添加附言 |
| 希腊字母 ψ | `\psi` | 输出 ψ；\Psi 输出 Ψ |
| 保存制表位 | `\pushtabs` | 在 tabbing 环境中保存当前制表位定义，可用 \poptabs 恢复 |
| 放置对象 | `\put(x,y){stuff}` | picture 环境最基本的绘图命令，(x,y) 为参考点 |

## 命令 · \r – \w
| 页面底部不齐 | `\raggedbottom` | 让页面保持自然高度，不做拉伸 |
| 右对齐声明 | `\raggedleft` | 声明其后所有文字靠右边界对齐 |
| 抬升盒子 | `\raisebox{dim}[d2][d3]{text}` | 把文字抬升 dim（可为负）；d2、d3 可改变系统认定的盒高与盒深 |
| 右尖括号 | `\rangle` | 数学模式输出 ⟩ |
| 右花括号（数学） | `\rbrace` | 数学模式输出 } |
| 右方括号 | `\rbrack` | 数学模式输出 ] |
| 右上限括号 | `\rceil` | 数学模式输出 ⌉ |
| 实部 | `\Re` | 数学模式输出 ℜ |
| 编号引用 | `\ref{text}` | 输出 \label{text} 所在节/图的编号 |
| 重定义命令 | `\renewcommand{\cs}[narg]{def}` | 重定义已有命令 \cs，参数在 def 中以 #1、#2 表示 |
| 重定义环境 | `\renewenvironment{envname}[narg]{def1}{def2}` | 重定义已有环境，另见 \newenvironment |
| 恢复回车 | `\restorecr` | 撤销 \obeycr 命令（使回车重新不产生空格） |
| 反转边注位置 | `\reversemarginpar` | 把边注放到相反的页边（如奇数页放左边） |
| 右下限括号 | `\rfloor` | 数学模式输出 ⌋ |
| 右三角头 | `\rhd` | 数学模式输出 ⊳ |
| 希腊字母 ρ | `\rho` | 数学模式输出 ρ |
| 右定界符 | `\right*` | 与 \left* 配对使用（* 为定界符） |
| 右箭头 | `\rightarrow` | 输出 →；\Rightarrow 输出 ⇒（数学模式） |
| 右鱼叉下箭头 | `\rightharpoondown` | 数学模式输出 ⇁ |
| 右鱼叉上箭头 | `\rightharpoonup` | 数学模式输出 ⇀ |
| 平衡箭头 | `\rightleftharpoons` | 数学模式输出 ⇌ |
| 右边距 | `\rightmargin` | 在 list 环境中，环境右边距到列表右边距的水平距离 |
| 罗马体 | `\rm` | 切换到正体（Roman） |
| 小写罗马数字计数 | `\roman{counter}` | 把计数器输出为小写罗马数字；\Roman 输出大写 |
| 小节符号 | `\S` | 输出 § |
| 保存盒子 | `\savebox{\binname}[width][pos]{text}` | 同 \makebox，但把盒子定义保存到 \binname，用 \usebox 取用 |
| 保存文本到盒子 | `\sbox{\binname}{text}` | 把文字保存到盒子 \binname（另见 \savebox） |
| 小型大写 | `\sc` | 切换到小型大写字母字体 |
| 脚注级字号 | `\scriptsize` | 切换到下标大小的字号 |
| 上下标字号 | `\scriptstyle` | 切换到上下标大小的排版 |
| 二级上下标字号 | `\scriptscriptstyle` | 切换到二级（极小）上下标大小的排版（数学模式） |
| 右下箭头 | `\searrow` | 数学模式输出 ↘ |
| 正割 | `\sec` | 数学模式输出 sec |
| 开始节 | `\section[toctitle]{text}` | 开始新节，自动加标题并编号；toctitle 为目录条目 |
| 无编号节 | `\section*{text}` | 开始新节并输出标题，但不编号、不进目录 |
| 设置计数器 | `\setcounter{counter}{value}` | 把计数器的值重置为 value |
| 设置长度 | `\setlength{\nl}{length}` | 把长度命令 \nl 的值设为 length |
| 集合差 | `\setminus` | 数学模式输出 ∖ |
| 按文本宽度设长度 | `\settowidth{\nl}{text}` | 把 \nl 设为 text 的排版宽度 |
| 无衬线体 | `\sf` | 切换到无衬线字体 |
| 升音符 | `\sharp` | 数学模式输出 ♯ |
| 堆叠盒子 | `\shortstack[pos]{x\\yy\\zzz}` | 把参数堆叠成单列排布，pos 可为 l 或 r |
| 希腊字母 σ | `\sigma` | 输出 σ；\Sigma 输出 Σ |
| 签名 | `\signature{text}` | 在 letter 文档样式中声明签名 |
| 波浪相似 | `\sim` | 数学模式输出 ∼ |
| 近似等于 | `\simeq` | 数学模式输出 ≃ |
| 倾斜体 | `\sl` | 切换到倾斜字体 |
| 宽松断行 | `\sloppy` | 放宽断行算法以减少溢出警告 |
| 小号字 | `\small` | 切换到比正文字号更小的字号 |
| 小积分号 | `\smallint` | 数学模式输出 ∫（小号） |
| 小垂直间距 | `\smallskip` | 标准的小号垂直跳过 |
| 小间距默认值 | `\smallskipamount` | \smallskip 的默认长度 |
| 微笑弧 | `\smile` | 数学模式输出 ⌣ |
| 黑桃花色 | `\spadesuit` | 数学模式输出 ♠ |
| 方交 | `\sqcap` | 数学模式输出 ⊓ |
| 方并 | `\sqcup` | 数学模式输出 ⊔ |
| 开方 | `\sqrt[3]{arg}` | 输出根式；方括号中的根指数可选 |
| 方包含于 | `\sqsubset` | 数学模式输出 ⊏ |
| 方包含于或等于 | `\sqsubseteq` | 数学模式输出 ⊑ |
| 方包含 | `\sqsupset` | 数学模式输出 ⊐ |
| 方包含或等于 | `\sqsupseteq` | 数学模式输出 ⊒ |
| 德语 ß | `\ss` | 输出 ß |
| 上下堆叠 | `\stackrel{stuff}{delim}` | 把 stuff 放在 delim 的上方 |
| 星形运算符 | `\star` | 数学模式输出 ⋆ |
| 交互式停止 | `\stop` | 当 TEX 出现 * 提示符且无文件名时输入此命令 |
| 开始子段落标题 | `\subparagraph[toctitle]{text}` | 开始新的子段落标题，自动编号 |
| 无编号子段落标题 | `\subparagraph*{text}` | 开始子段落标题并输出标题，但不编号 |
| 开始小节 | `\subsection[toctitle]{text}` | 开始新小节，自动加标题并编号；toctitle 为目录条目 |
| 无编号小节 | `\subsection*{text}` | 与 \subsubsection* 一起开始小节，但不编号、不进目录 |
| 包含于 | `\subset` | 数学模式输出 ⊂ |
| 包含于或等于 | `\subseteq` | 数学模式输出 ⊆ |
| 后于 | `\succ` | 数学模式输出 ≻ |
| 后于或等于 | `\succeq` | 数学模式输出 ⪰ |
| 包含或等于 | `\supseteq` | 数学模式输出 ⊇ |
| 根号 | `\surd` | 数学模式输出 √ |
| 左下箭头 | `\swarrow` | 数学模式输出 ↙ |
| 输出字形 | `\symbol{cc}` | 输出指定编码的字形（符号） |
| 连音符 | `\t` | 产生连字（tie-after）音符，如 o͡o |
| 制表位左距 | `\tabbingsep` | 制表位左侧的距离 |
| 表格列间距 | `\tabcolsep` | tabular 中列间距的一半 |
| 生成目录 | `\tableofcontents` | 生成目录，需要有 .toc 文件 |
| 正切 | `\tan` | 数学模式输出 tan |
| 双曲正切 | `\tanh` | 数学模式输出 tanh |
| 希腊字母 τ | `\tau` | 数学模式输出 τ |
| TeX 标志 | `\TeX` | 输出 TeX 徽标 |
| 浮动体与正文间距 | `\textfloatsep` | 页面顶部或底部浮动体与正文之间的距离 |
| 正文最小占比 | `\textfraction` | 页面中正文必须占据的最小比例 |
| 正文高度 | `\textheight` | 正文区域的正常垂直尺寸 |
| 行内数学样式 | `\textstyle` | 切换到行内数学环境的排版样式 |
| 正文宽度 | `\textwidth` | 正文区域的正常水平尺寸 |
| 致谢脚注 | `\thanks{footnote}` | 为 \maketitle 添加致谢或脚注 |
| 希腊字母 θ | `\theta` | 输出 θ；\Theta 输出 Θ |
| 粗线 | `\thicklines` | picture 环境中较粗的线条样式 |
| 细线 | `\thinlines` | picture 环境中默认的线条样式（对比 \thicklines） |
| 细空格 | `\thinspace` | 单引号之间应有的细间距 |
| 本页样式 | `\thispagestyle{sty}` | 仅决定当前页的页眉页脚样式 |
| 波浪符（数学） | `\tilde` | 数学模式下加波浪符，如 ã |
| 乘号 | `\times` | 数学模式输出 × |
| 极小字号 | `\tiny` | 切换到非常小的字号 |
| 声明标题 | `\title{text}` | 为 \maketitle 声明文档标题 |
| 顶部符号 | `\top` | 数学模式输出 ⊤ |
| 页顶浮动占比 | `\topfraction` | 页顶可被浮动体占据的最大比例 |
| 上边距 | `\topmargin` | TEX 页面顶部（距纸张顶端 1 英寸）到页眉顶部的距离 |
| 列表顶部间距 | `\topsep` | 列表环境前附加的垂直间距 |
| 页顶最小间距 | `\topskip` | 页面顶部到正文第一行基线的最小距离 |
| 三角形 | `\triangle` | 数学模式输出 △ |
| 左三角 | `\triangleleft` | 数学模式输出 ◁ |
| 右三角 | `\triangleright` | 数学模式输出 ▷ |
| 等宽打字机体 | `\tt` | 切换到打字机字体 |
| 双栏排版 | `\twocolumn[text]` | 声明双栏页面，可选 text 为通栏内容 |
| 交互式输入 | `\typein[\cs]{text}` | 在屏幕上显示提示并把输入存入 \cs |
| 输出到屏幕 | `\typeout{text}` | 在屏幕上显示 text 并写入 log 文件 |
| 短音符（文本） | `\u` | 产生短音符，如 ŏ |
| 取消数学粗体 | `\unboldmath` | 取消数学斜体与数学符号的粗体，应在数学模式外使用 |
| 下花括号 | `\underbrace{text}` | 在文字下方加花括号（数学模式） |
| 下划线 | `\underline{text}` | 在文字下方加一条线（数学模式与文本模式均可） |
| 坐标单位长度 | `\unitlength` | picture 环境中坐标单位的长度 |
| 左三角头（含等号） | `\unlhd` | 数学模式输出 ⊴ |
| 右三角头（含等号） | `\unrhd` | 数学模式输出 ⊵ |
| 向上箭头 | `\uparrow` | 输出 ↑；\Uparrow 输出 ⇑（数学模式） |
| 上下箭头 | `\updownarrow` | 输出 ↕；\Updownarrow 输出 ⇕（数学模式） |
| 多重并集 | `\uplus` | 数学模式输出 ⊎ |
| 希腊字母 υ | `\upsilon` | 输出 υ；\Upsilon 输出 Υ |
| 取用盒子 | `\usebox{\binname}` | 取回保存在盒子 \binname 中的定义 |
| 列表用计数器 | `\usecounter{counter}` | 在 list 环境中使用指定计数器为条目编号 |
| 抑扬符（文本） | `\v` | 产生抑扬符，如 ǒ |
| 计数器数值 | `\value{counter}` | 产生计数器的数值，可用于运算 |
| 变体 π | `\varpi` | 数学模式输出 ϖ |
| 变体 ρ | `\varrho` | 数学模式输出 ϱ |
| 变体 σ | `\varsigma` | 数学模式输出 ς |
| 变体 θ | `\vartheta` | 数学模式输出 ϑ |
| 断言符号 | `\vdash` | 数学模式输出 ⊢ |
| 竖向省略号 | `\vdots` | 数学模式输出 ⋮ |
| 向量箭头 | `\vec` | 数学模式下在字母上方加向量箭头，如 a⃗ |
| 画向量 | `\vector(x,y){len}` | 在 picture 环境中配合 \put 画一条带箭头的向量 |
| 逻辑或（析取） | `\vee` | 数学模式输出 ∨ |
| 原样文本 | `\verb` | 以 \verb+text+ 形式原样输出文本 |
| 原样文本（显空格） | `\verb*` | 同 \verb，但空格以可见符号显示 |
| 竖线 | `\vert` | 输出 \ | ；\Vert 输出 ‖（数学模式） |
| 垂直填充 | `\vfill` | 等价于 \vspace{\fill}，向下撑满剩余空间 |
| 垂直间距 | `\vspace{len}` | 留出长度为 len 的垂直空白 |
| 不断页垂直间距 | `\vspace*{len}` | 同 \vspace，但该处不允许分页 |
| 逻辑与（合取） | `\wedge` | 数学模式输出 ∧ |
| 宽帽符 | `\widehat{arg}` | 在参数上方加一个宽抑扬符（数学模式） |
| 宽波浪符 | `\widetilde{arg}` | 在参数上方加一个宽波浪符（数学模式） |
| 魏尔斯特拉斯 p | `\wp` | 数学模式输出 ℘ |
| 缠绕积 | `\wr` | 数学模式输出 ≀ |

## 命令 · \x – \z
| 希腊字母 ξ | `\xi` | 输出 ξ；\Xi 输出 Ξ |
| 当前年 | `\year` | 当前年份（公元） |
| 希腊字母 ζ | `\zeta` | 数学模式输出 ζ |  |