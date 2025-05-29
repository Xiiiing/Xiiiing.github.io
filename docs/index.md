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
  /* 大地图 */
  .maps-row > .big {
    flex: 2 1 0;       /* 占比更大 */
    height: 500px;     /* 高度也更高 */
  }
  /* 小地图 */
  .maps-row > .small {
    flex: 1 1 160px;   /* 基准宽度 160px，剩余空间平分 */
    height: 250px;     /* 较小的高度 */
  }
</style>

<div class="maps-row">
  <!-- 大地图 -->
  <div class="big" data-echarts-map="china"></div>
  <!-- 三张小地图 -->
  <div class="small" data-echarts-map="sichuan"></div>
  <div class="small" data-echarts-map="guangdong"></div>
  <div class="small" data-echarts-map="liaoning"></div>
</div>



