---
title: "Xiiiing's Wiki & Blog"
hide:
  - navigation
  - toc
---

# Xiiiing's Wiki & Blog

<!-- 添加 CSS 样式 -->
<style>
.flex-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 600px; /* 容器最小高度 */
  margin-top: 30px; /* 内容间距 */
}

.text-section {
  flex: 0 0 60%; /* 文字区域占比 60% */
  padding: 20px;
}

.map-section {
  flex: 0 0 40%; /* 地图区域占比 40% */
  padding: 20px;
  border-left: 1px solid #e0e0e0; /* 分隔线 */
}

#map-container {
  width: 100%;
  height: 100%; /* 地图撑满容器 */
  min-height: 500px;
}
</style>

<div class="flex-container">
  <div class="text-section">
    > 今天又被谁发现了?

    白嫖 github, 实现云盘知识查看!

    慢慢学, 慢慢记, 以后交给 GPT!

    [算法&数据结构](https://xiiiing.github.io/Algorithm/){ .md-button }
    [开发&工程](https://xiiiing.github.io/Development/){ .md-button }
    [科研&医学](https://xiiiing.github.io/Research/){ .md-button }
    [Blog](https://xiiiing.github.io/blog){ .md-button }
  </div>

  <div class="map-section">
    <!-- 地图主容器（关键容器，用于切换显示） -->
    <div id="map-container"></div>
  </div>
</div>