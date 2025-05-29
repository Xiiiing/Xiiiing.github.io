/*
 * ECharts Map Toggle Module
 * 功能：在全国与省份地图之间切换，配置和数据分离，结构清晰。
 */

const MapToggle = (() => {
  // 默认配置与常量
  const DEFAULT_OPTIONS = {
    selector: '#map-container',
    chinaConfig: {
      mapName: 'china',
      jsonPath: '/_javascripts/china.json',
      seriesName: '中国地图',
      highlighted: ['辽宁', '四川', '广东']
    },
    provinces: {
      '辽宁': { mapName: 'liaoning', jsonPath: '/_javascripts/21.json', seriesName: '辽宁地图', highlighted: ['沈阳市'] },
      '四川': { mapName: 'sichuan', jsonPath: '/_javascripts/51.json', seriesName: '四川地图', highlighted: ['绵阳市','宜宾市'] },
      '广东': { mapName: 'guangdong', jsonPath: '/_javascripts/44.json', seriesName: '广东地图', highlighted: ['深圳市'] }
    },
    colors: {
      normal: '#1890ff',
      emphasis: '#40a9ff',
      defaultArea: '#ccc',
      defaultBorder: '#fff'
    }
  };

  let _currentLevel = 'china';  // 'china' 或省份名称
  let _chart = null;

  /**
   * 初始化地图
   * @param {Object} config 配置对象
   */
  async function _init(config) {
    // 销毁旧实例
    if (_chart) {
      _chart.dispose();
      _chart = null;
    }

    const container = document.querySelector(config.selector);
    if (!container) {
      console.error('地图容器未找到：', config.selector);
      return;
    }

    _chart = echarts.init(container);
    try {
      const response = await fetch(config.jsonPath);
      const geoJson = await response.json();
      echarts.registerMap(config.mapName, geoJson);

      const option = _buildOption(config);
      _chart.setOption(option);
      _chart.off('click');
      _chart.on('click', ({ componentType, seriesType, name }) => {
        if (componentType === 'series' && seriesType === 'map') {
          _toggle(name);
        }
      });
    } catch (err) {
      console.error(`${config.seriesName} 加载失败:`, err);
    }
  }

  /**
   * 构建 ECharts 配置
   * @param {Object} config
   * @returns {Object} ECharts option
   */
  function _buildOption(config) {
    const { defaultArea, defaultBorder, normal, emphasis } = DEFAULT_OPTIONS.colors;
    const seriesData = (config.highlighted || []).map(name => ({
      name,
      itemStyle: {
        normal: { areaColor: normal },
        emphasis: { areaColor: emphasis }
      }
    }));

    return {
      tooltip: { trigger: 'item', formatter: '{b}' },
      series: [{
        ...DEFAULT_OPTIONS.seriesTemplate,
        name: config.seriesName,
        map: config.mapName,
        data: seriesData
      }]
    };
  }

  /**
   * 切换逻辑
   * @param {string} name 点击区域名称
   */
  function _toggle(name) {
    if (_currentLevel === 'china' && DEFAULT_OPTIONS.provinces[name]) {
      _currentLevel = name;
      const cfg = DEFAULT_OPTIONS.provinces[name];
      _init({ selector: DEFAULT_OPTIONS.selector, ...cfg });
    } else if (_currentLevel !== 'china') {
      _currentLevel = 'china';
      const cfg = DEFAULT_OPTIONS.chinaConfig;
      _init({ selector: DEFAULT_OPTIONS.selector, ...cfg });
    }
  }

  // 初始执行
  function init() {
    const cfg = DEFAULT_OPTIONS.chinaConfig;
    _init({ selector: DEFAULT_OPTIONS.selector, ...cfg });
  }

  return { init };
})();

// 统一的系列模版，放在模块外部避免重复定义
MapToggle.DEFAULT_OPTIONS = MapToggle.DEFAULT_OPTIONS || {};
MapToggle.DEFAULT_OPTIONS.seriesTemplate = {
  type: 'map', roam: false, selectedMode: false,
  label: { show: false },
  itemStyle: {
    normal: { areaColor: '#ccc', borderColor: '#fff', borderWidth: 1 },
    emphasis: { areaColor: '#999', label: { show: false } }
  }
};

// 页面加载完成后调用初始化
document.addEventListener('DOMContentLoaded', () => {
  MapToggle.init();
});
