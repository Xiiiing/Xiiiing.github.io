// Enhanced ECharts Map Toggle
// 1. 使用 async/await 优化异步加载
// 2. 增加加载状态提示
// 3. 抽离公共配置，支持响应式和主题定制

// ------------- 样式（可放在单独CSS文件） -------------
// #map-container {
//   width: 100%;
//   height: 600px;
//   border: 1px solid #e0e0e0;
//   border-radius: 8px;
//   overflow: hidden;
//   position: relative;
// }
// .map-loading {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   font-size: 16px;
//   color: #999;
// }

// ------------- 公共图表配置 -------------
const baseOptions = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}'
  },
  series: [{
    type: 'map',
    roam: false,
    selectedMode: false,
    label: {
      show: false
    },
    itemStyle: {
      normal: {
        areaColor: '#ececec',
        borderColor: '#ffffff',
        borderWidth: 1
      },
      emphasis: {
        areaColor: '#b3b3b3',
        label: { show: true }
      }
    }
  }]
};

// ------------- 地图配置 -------------
const MAP_FILES = {
  china: {
    mapName: 'china',
    jsonPath: '/_javascripts/china.json',
    seriesName: '中国地图'
  },
  liaoning: { mapName: 'liaoning', jsonPath: '/_javascripts/21.json', seriesName: '辽宁省' },
  sichuan:  { mapName: 'sichuan',  jsonPath: '/_javascripts/51.json', seriesName: '四川省' },
  guangdong:{ mapName: 'guangdong',jsonPath: '/_javascripts/44.json', seriesName: '广东省' }
};

let currentKey = 'china';
let chart = null;

// 创建或更新图表
async function renderMap(key, data = []) {
  const container = document.getElementById('map-container');
  if (!container) return;

  // 显示加载提示
  showLoading(true);

  // 销毁旧实例
  if (chart) {
    chart.dispose();
  }
  chart = echarts.init(container);

  // 加载 geoJSON
  const { jsonPath, mapName, seriesName } = MAP_FILES[key];
  try {
    const resp = await fetch(jsonPath);
    const geo = await resp.json();
    echarts.registerMap(mapName, geo);

    const option = {
      ...baseOptions,
      series: [{
        ...baseOptions.series[0],
        name: seriesName,
        map: mapName,
        data
      }]
    };
    chart.setOption(option);

    // 注册点击事件
    chart.off('click');
    chart.on('click', params => {
      if (params.componentType === 'series') {
        toggleMap(params.name.toLowerCase());
      }
    });

  } catch (e) {
    console.error(`${seriesName} 加载失败`, e);
  } finally {
    showLoading(false);
  }
}

// 切换逻辑
function toggleMap(nameKey) {
  // 如果当前是中国地图且点击省份支持切换
  if (currentKey === 'china' && MAP_FILES[nameKey]) {
    currentKey = nameKey;
    renderMap(currentKey);
  } else {
    currentKey = 'china';
    // 高亮已选省份
    const highlightData = Object.keys(MAP_FILES)
      .filter(k => k !== 'china')
      .map(k => ({ name: MAP_FILES[k].seriesName, itemStyle: {
        normal: { areaColor: '#1890ff' },
        emphasis: { areaColor: '#40a9ff' }
      }}));
    renderMap('china', highlightData);
  }
}

// 加载指示器
function showLoading(flag) {
  let loader = document.querySelector('.map-loading');
  if (flag) {
    if (!loader) {
      loader = document.createElement('div');
      loader.className = 'map-loading';
      loader.textContent = '加载中...';
      document.getElementById('map-container').append(loader);
    }
  } else if (loader) {
    loader.remove();
  }
}

// 自适应
window.addEventListener('resize', () => { if (chart) chart.resize(); });

// 初次渲染
document.addEventListener('DOMContentLoaded', () => {
  renderMap('china', [
    { name: '辽宁省',    itemStyle: { normal: { areaColor: '#1890ff' }, emphasis: { areaColor: '#40a9ff' } } },
    { name: '四川省',    itemStyle: { normal: { areaColor: '#1890ff' }, emphasis: { areaColor: '#40a9ff' } } },
    { name: '广东省',    itemStyle: { normal: { areaColor: '#1890ff' }, emphasis: { areaColor: '#40a9ff' } } }
  ]);
});
