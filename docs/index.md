---
title: "Xiiiing's Wiki & Blog"
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

<!-- 地图容器区域 -->
<div class="map-container">
    <!-- 主地图：全国地图（占满宽度） -->
    <div 
        data-echarts-map="china" 
        class="main-map" 
        aria-label="中国地图，点击省份查看详情"
    >
        地图加载中...
    </div>

    <!-- 可选：子地图区域（如需展示热门省份缩略图） -->
    <div class="sub-maps-row">
        <div data-echarts-map="sichuan" class="sub-map"></div>
        <div data-echarts-map="guangdong" class="sub-map"></div>
        <div data-echarts-map="liaoning" class="sub-map"></div>
    </div>
</div>

<style>
    /* 主地图容器样式 */
    .map-container {
        margin: 2em 0;
    }

    .main-map {
        width: 100%;
        height: 500px;  /* 主地图高度设为500px更突出 */
        margin-bottom: 1.5em;
        border: 1px solid #e5e7eb;  /* 添加浅色边框提升质感 */
        border-radius: 8px;
        overflow: hidden;
    }

    /* 子地图行样式（可选，根据需求显示/隐藏） */
    .sub-maps-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }

    .sub-map {
        flex: 1 1 280px;  /* 子地图基准宽度280px */
        height: 200px;
        border: 1px solid #f3f4f6;
        border-radius: 6px;
    }

    /* 加载提示样式 */
    [data-echarts-map] {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6b7280;
        font-size: 0.9em;
    }
    [data-echarts-map]::after {
        content: "地图加载中...";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    [data-echarts-map] canvas {  /* ECharts渲染后隐藏加载提示 */
        position: relative;
        z-index: 1;
    }
</style>
    