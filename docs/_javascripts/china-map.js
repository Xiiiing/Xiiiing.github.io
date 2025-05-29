// china-map.js

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
        areaColor: '#e0f3f8',  /* 更美观的默认颜色 */
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        areaColor: '#66c2a5',  /* 强调颜色调整 */
        label: { show: false }
      }
    }
  }]
};

const provinceCodeMap = {
  '四川': '51',
  '广东': '44',
  '辽宁': '21',
  '浙江': '33',  /* 示例补充更多省份 */
  '江苏': '32'
};

function initEchartsMap({ selector, mapName, jsonPath, seriesName, data = [], onClick }) {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(selector);
    if (!container) return;

    // 显示加载状态
    container.innerHTML = '<div style="text-align:center;padding:20px;">地图加载中...</div>';

    if (container._echartsInstance) {
      echarts.dispose(container._echartsInstance);
    }

    const chart = echarts.init(container);
    container._echartsInstance = chart;

    fetch(jsonPath)
      .then(res => {
        if (!res.ok) throw new Error('地图文件不存在');
        return res.json();
      })
      .then(geoJson => {
        container.innerHTML = '';  /* 清空加载提示 */
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

        if (typeof onClick === 'function') {
          chart.off('click');
          chart.on('click', params => onClick(params, container));
        }
      })
      .catch(err => {
        console.error(`${seriesName} 地图加载失败:`, err);
        container.innerHTML = `<div style="color:red;padding:20px;">地图加载失败：${err.message}</div>`;
      });
  });
}

function bindChinaDrill() {
  initEchartsMap({
    selector: '[data-echarts-map="china"]',
    mapName: 'china',
    jsonPath: '/_javascripts/china.json',
    seriesName: '中国地图',
    data: [  /* 可选：添加示例数据（如人口） */
      { name: '四川', value: 8367 },
      { name: '广东', value: 12684 },
      { name: '辽宁', value: 4230 }
    ],
    onClick: (params, container) => {
      const provinceName = params.name;
      const code = provinceCodeMap[provinceName];
      if (!code) {
        container.innerHTML = `<div style="color:orange;padding:20px;">暂不支持查看 ${provinceName} 地图</div>`;
        return;
      }

      // 钻取到省级地图（添加返回按钮提示）
      initEchartsMap({
        selector: '[data-echarts-map="china"]',
        mapName: provinceName,
        jsonPath: `/_javascripts/${code}.json`,
        seriesName: `${provinceName} 地图`,
        onClick: () => {
          container.innerHTML = '<div style="text-align:center;padding:10px;">点击任意区域返回全国地图</div>';
          bindChinaDrill();  /* 递归调用实现返回 */
        }
      });
    }
  });
}

// 页面加载后初始化
bindChinaDrill();