---
title: "Home"
hide:
  - navigation
  - toc
---

# Xiiiing's Wiki & Blog

> 今天又被谁发现了?

白嫖github,实现云盘知识查看!

慢慢学,慢慢记,以后交给GPT!

[算法&数据结构](https://xiiiing.github.io/Algorithm/){ .md-button }
[开发&工程](https://xiiiing.github.io/Development/){ .md-button }
[科研&医学](https://xiiiing.github.io/Research/){ .md-button }
[Blog](https://xiiiing.github.io/blog){ .md-button }

<style>
  .maps-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    margin: 1em 0;
  }
  .maps-row > div {
    flex: 1 1 100%;  /* 初始中国地图占满宽度 */
    height: 400px;    /* 增大地图高度 */
  }
  /* 省份地图默认隐藏 */
  .province-map {
    display: none;
  }
  /* 返回按钮样式 */
  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 8px 16px;
    background: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    z-index: 100;
  }
  .back-button:hover {
    background: #40a9ff;
  }
</style>

<div class="maps-row">
  <!-- 中国地图容器（始终显示） -->
  <div data-echarts-map="china"></div>
  
  <!-- 省份地图容器（默认隐藏） -->
  <div data-echarts-map="sichuan" class="province-map">
    <button class="back-button" data-target="china">← 返回中国地图</button>
  </div>
  <div data-echarts-map="guangdong" class="province-map">
    <button class="back-button" data-target="china">← 返回中国地图</button>
  </div>
  <div data-echarts-map="liaoning" class="province-map">
    <button class="back-button" data-target="china">← 返回中国地图</button>
  </div>
</div>