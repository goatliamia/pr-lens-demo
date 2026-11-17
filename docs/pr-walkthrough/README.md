# AI 时代 PR 审查可视化展示：以架构与复杂度主线取代逐行 Diff

本目录展示如何基于 **`archify/story` 通用图组件编排引擎**，将 PR 审查从“肉眼扫千行 diff”收敛为回答 AI 时代的三个本质问题：**目的是什么（意图与契约）**、**对架构造成了什么影响**、**加重了什么复杂度**。

深度理论背景与 2026 年工程界共识（Margaret-Anne Storey、Armin Ronacher、Mitchell Hashimoto、Martin Fowler / Birgitta Böckeler）见：[AI-ERA-PR-REVIEW.zh-CN.md](AI-ERA-PR-REVIEW.zh-CN.md)。

## 展示案例一览（三问框架 × 四类跨视图编排）

| 审查维度（PR 三问） | 展示案例 | 原生图谱组合 | 揭示的关键信号 | 产物入口 |
| --- | --- | --- | --- | --- |
| **1. 目的是什么**<br>意图与契约偏移 | **Pulse Billing PR #5** | `architecture → sequence → erd` | 同步 `200 Paid` 改为幂等锁定后异步 `202 Queued` + `org_ledger` 台账表 | [Stage](stages/pulse-billing.stage.html) · [1080p MP4](videos/pulse-billing.mp4) |
| **2. 架构影响了什么**<br>所有权与并发状态 | **Tokio #1657** | `architecture → lifecycle` | 100 文件调度器重写收敛为有界环形队列 + 溢出窃取 + Worker 状态迁移 | [Stage](stages/tokio-scheduler.stage.html) · [1080p MP4](videos/tokio-scheduler.mp4) |
| **2. 架构影响了什么**<br>通用引擎解耦（自举） | **Archify Line A 拆分** | `architecture → dataflow` | 通用 AST 编排引擎与领域 Skill 解耦，`StoryContainer` 支持 fast-start MP4 与 4 帧批量回读 | [Stage](stages/arc-story-split.stage.html) · [1080p MP4](videos/arc-story-split.mp4) |
| **3. 加重了什么复杂度**<br>局部复杂度跃升 | **Vue #2532** | `dataflow → architecture` | 外层 `processExpression` 维持 `22 → 22`，嵌套 `prefix()` 从 `2 → 6`（源码行级定位） | [Stage](stages/vue-complexity.stage.html) · [1080p MP4](videos/vue-complexity.mp4) |

## 在线预览（GitHub 自适应明暗动态 SVG）

### 1. 意图与契约偏移：Pulse Billing PR #5（同步直付 → 异步幂等队列）

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/pulse-billing-dark.svg">
  <img alt="Pulse Billing PR #5 动态架构与契约讲解" src="images/pulse-billing-light.svg" width="960">
</picture>

### 2. 架构影响（外部大型工程）：Tokio #1657 调度器重写与 Worker 生命周期

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/tokio-scheduler-dark.svg">
  <img alt="Tokio #1657 调度器队列替换与 Worker 状态机动态讲解" src="images/tokio-scheduler-light.svg" width="960">
</picture>

### 3. 架构影响（本引擎自举 PR）：通用组件编排与 MP4/内存优化拆分

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/arc-story-split-dark.svg">
  <img alt="Archify 通用组件编排与 MP4 导出管道自举讲解" src="images/arc-story-split-light.svg" width="960">
</picture>

### 4. 复杂度代价：Vue #2532 嵌套函数 `prefix()` 复杂度 `2 → 6`

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/vue-complexity-dark.svg">
  <img alt="Vue #2532 编译绑定与 prefix 局部复杂度对比讲解" src="images/vue-complexity-light.svg" width="960">
</picture>

## 本地一键复现

需要 Node 22+ 与对应分支的 `archify` 源码仓库（生成 MP4 视频还需本机 Chrome / Edge WebCodecs 支持）：

```powershell
$env:ARCHIFY_BIN = "C:/path/to/archify/bin/archify.mjs"
$env:ARCHIFY_CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe"
node docs/pr-walkthrough/build-showcase.mjs --with-video
```

说明：若仅需生成双主题动态 SVG、静态关键帧 `stills/` 与交互舞台 HTML `stages/`，可省略 `--with-video`。

## 署名与许可

- 原生图表渲染与通用编排引擎：`tt-a1i/archify`（Apache-2.0，摘录源码片段与 [arc-LICENSE](attribution/arc-LICENSE) 一并保留）。
- Vue `#2532` 编译器源码片段保留 [vue-LICENSE](attribution/vue-LICENSE)（MIT）。
- 案例编排与文本梳理基于公开 PR 差异、`inputs/` 实测源码及 `feat/story-choreography-engine` 实测产物。
