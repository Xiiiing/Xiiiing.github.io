// china-map.js

// 公共图表配置（可根据需求调整）
const commonChartOptions = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}'
  },
  series: [{
    type: 'map',
    roam: false,
    selectedMode: false,
    label: { show: false },
    itemStyle: {
      normal: {
        areaColor: '#ccc',
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        areaColor: '#999',
        label: { show: false }
      }
    }
  }]
};

// 省份名称到 geoJSON 文件名（数字编码或拼音）
const provinceCodeMap = {
  '四川': '51',
  '广东': '44',
  '辽宁': '21',
  // 如需支持更多省份，可按上述格式补充
};

/**
 * 初始化 ECharts 地图
 * @param {Object} params
 *   - selector: 容器选择器
 *   - mapName: 注册时使用的地图名称
 *   - jsonPath: geoJSON 文件路径
 *   - seriesName: 图例名称
 *   - data: 系列数据（可选）
 *   - onClick: 点击事件回调 (params, containerDom)
 */
function initEchartsMap({ selector, mapName, jsonPath, seriesName, data = [], onClick }) {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(selector);
    if (!container) return;

    // 如果已初始化过，先销毁旧实例
    if (container._echartsInstance) {
      echarts.dispose(container._echartsInstance);
    }

    const chart = echarts.init(container);
    container._echartsInstance = chart;

    fetch(jsonPath)
      .then(res => res.json())
      .then(geoJson => {
        echarts.registerMap(mapName, geoJson);

        chart.setOption({
          ...commonChartOptions,
          series: [{
            ...commonChartOptions.series[0],
            name: seriesName,
            map: mapName,
            data: data
          }]
        });

        // 绑定点击事件
        if (typeof onClick === 'function') {
          chart.off('click');
          chart.on('click', params => onClick(params, container));
        }
      })
      .catch(err => {
        console.error(`${seriesName} 地图加载失败:`, err);
      });
  });
}

// ---------- 钻取逻辑实现 ----------

// 点击全国地图某省时，钻取到该省地图；省地图点击时，返回全国
function bindChinaDrill() {
  initEchartsMap({
    selector: '[data-echarts-map="china"]',
    mapName: 'china',
    jsonPath: '/_javascripts/china.json',
    seriesName: '中国地图',
    onClick: (params, container) => {
      const provinceName = params.name;
      const code = provinceCodeMap[provinceName];
      if (!code) {
        console.warn(`未配置 ${provinceName} 的编码，无法钻取。`);
        return;
      }

      // 钻取到省级地图
      initEchartsMap({
        selector: '[data-echarts-map="china"]',
        mapName: provinceName,
        jsonPath: `/_javascripts/${code}.json`,
        seriesName: `${provinceName} 地图`,
        onClick: () => {
          // 点击省级地图时，返回全国
          bindChinaDrill();
        }
      });
    }
  });
}

// 页面加载后，先绑定全国钻取
bindChinaDrill();
