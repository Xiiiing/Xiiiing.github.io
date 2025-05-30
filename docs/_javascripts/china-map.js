/*
 * Enhanced ECharts Map Toggle
 * - ES6+ syntax
 * - Async/Await
 * - DRY: common options and handlers
 * - Modular: easy to extend provinces
 */

// 公共图表配置
const commonChartOptions = {
  title: {
    text: '求学 驻足',
    left: 'center',
    top: 10,
    textStyle: { fontSize: 18 }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}'
  },
  series: [{
    type: 'map',
    roam: false,
    selectedMode: false,
    layoutCenter: ['50%', '50%'], // 居中
    layoutSize: '100%', // 全面自适应容器
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

// 省份地图配置
const provinceMapConfig = {
  '辽宁省': { mapName: 'liaoning', jsonPath: '/_javascripts/21.json', seriesName: '辽宁地图' },
  '四川省': { mapName: 'sichuan',  jsonPath: '/_javascripts/51.json', seriesName: '四川地图' },
  '广东省': { mapName: 'guangdong',jsonPath: '/_javascripts/44.json', seriesName: '广东地图' }
};

// 需要高亮的区域数据示例
const highlightData = {
  'china': [
    { name: '辽宁省' },
    { name: '四川省' },
    { name: '广东省' }
  ],
  '辽宁省': [ { name: '沈阳市' } ],
  '四川省': [ { name: '绵阳市' }, { name: '宜宾市' } ],
  '广东省': [ { name: '深圳市' } ]
};

let currentMap = 'china';
let chartInstance = null;

/**
 * 初始化地图
 * @param {string} mapName
 * @param {string} jsonPath
 * @param {string} seriesName
 * @param {Array} data
 */
const initMap = async ({ mapName, jsonPath, seriesName, data }) => {
  // 销毁旧实例
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }

  const container = document.querySelector('#map-container');
  // 初始化地图后，获取 canvas 元素并设置 z-index
  const chartInstance = echarts.init(container);
  const canvas = chartInstance.getZr().canvas;
  canvas.style.zIndex = 1; // 设为低于弹窗的层级
  if (!container) return;

  const chart = echarts.init(container);
  chartInstance = chart;

  try {
    const res = await fetch(jsonPath);
    const geoJson = await res.json();
    echarts.registerMap(mapName, geoJson);

    const option = {
      ...commonChartOptions,
      series: [{
        ...commonChartOptions.series[0],
        name: seriesName,
        map: mapName,
        data: data.map(item => ({
          ...item,
          itemStyle: {
            normal: { areaColor: '#1890ff' },
            emphasis: { areaColor: '#40a9ff' }
          }
        }))
      }]
    };

    chart.setOption(option);
    chart.off('click');
    chart.on('click', (params) => {
      if (params.componentType === 'series') {
        handleMapToggle(params.name);
      }
    });
  } catch (err) {
    console.error(`${seriesName} 地图加载失败:`, err);
  }
};

/**
 * 切换地图逻辑
 * @param {string} name 点击的区域名称
 */
function handleMapToggle(name) {
  if (currentMap === 'china' && provinceMapConfig[name]) {
    // 切至省份
    const { mapName, jsonPath, seriesName } = provinceMapConfig[name];
    currentMap = name;
    initMap({ mapName, jsonPath, seriesName, data: highlightData[name] });
  } else if (currentMap === 'china'){
    //alert(`笔者未曾求学于${name}`);
    showAutoCloseDialog(`笔者未曾求学于 <strong>${name}</strong>`);
  }else {
    // 返回全国地图
    currentMap = 'china';
    initMap({ mapName: 'china', jsonPath: '/_javascripts/china.json', seriesName: '中国地图', data: highlightData.china });
  }
}

// 首次加载全国地图
initMap({ mapName: 'china', jsonPath: '/_javascripts/china.json', seriesName: '中国地图', data: highlightData.china });


/** 显示自动关闭的自定义弹窗 */
function showAutoCloseDialog(message, duration = 2000) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    padding: 16px 24px;       /* 增大内边距 */
    border-radius: 6px;      /* 稍大圆角 */
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 9999;
    font-size: 16px;         /* 增大字体 */
    max-width: 80%;          /* 限制最大宽度 */
    text-align: center;
    line-height: 1.5;
  `;
  overlay.innerHTML = message;
  document.body.appendChild(overlay);
  setTimeout(() => {
    document.body.removeChild(overlay);
  }, duration);
}
