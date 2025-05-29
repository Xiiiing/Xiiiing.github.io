---
title: "Xiiiing's Wiki & Blog"
hide:
  - navigation
  - toc
---

# Xiiiing's Wiki & Blog

<style>
.split-layout {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px; /* 限制最大宽度 */
  margin: 2rem auto; /* 居中 */
}

.left-column {
  flex: 1; /* 文字区占剩余宽度（可调整为固定比例，如 flex: 0 0 60%） */
  padding: 1rem;
}

.right-column {
  flex: 1; /* 地图区占剩余宽度（同上） */
  padding: 1rem;
  border-left: 1px solid #e5e7eb; /* 可选分隔线 */
}

#map-container {
  width: 100%;
  height: 400px; /* 地图高度 */
}
</style>

<div class="split-layout">
  <div class="left-column">
    > 今天又被谁发现了?

    白嫖 GitHub，实现云盘知识查看！  
    慢慢学，慢慢记，以后交给 GPT！

    <!-- 按钮使用正确的 Markdown 内联样式 -->
    [算法&数据结构](https://xiiiing.github.io/Algorithm/){.md-button}  
    [开发&工程](https://xiiiing.github.io/Development/){.md-button}  
    [科研&医学](https://xiiiing.github.io/Research/){.md-button}  
    [Blog](https://xiiiing.github.io/blog){.md-button}
  </div>

  <div class="right-column">
    <div id="map-container"></div> <!-- 地图容器（需配合 JS 渲染） -->
  </div>
</div>