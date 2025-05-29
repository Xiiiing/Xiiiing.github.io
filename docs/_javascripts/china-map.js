document.addEventListener('DOMContentLoaded', function () {
  const dom = document.querySelector('[data-echarts-map="china"]');
  if (!dom) return;
  const chart = echarts.init(dom);

  fetch('/_javascripts/china.json') // 确保 GeoJSON 路径正确
    .then(res => res.json())
    .then(geoJson => {
      echarts.registerMap('china', geoJson);
      chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}' // 显示省份名称
        },
        series: [{
          name: '中国地图',
          type: 'map',
          map: 'china',
          roam: false, // 禁止缩放
          label: { show: false }, // 隐藏省份名称（可根据需求显示）
          itemStyle: {
            normal: {
              areaColor: '#ccc', // 默认灰色（未指定省份）
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              areaColor: '#999' // 灰色省份悬停变亮灰（统一设置，覆盖默认悬停）
            }
          },
          // 高亮省份数据（可添加多个省份）
          data: [
            {
              name: '辽宁', // 替换为你需要高亮的省份名称
              itemStyle: {
                normal: {
                  areaColor: '#1890ff' // 常态蓝色（覆盖默认灰色）
                },
                emphasis: {
                  areaColor: '#40a9ff' // 悬停更亮蓝（覆盖系列的emphasis）
                }
              }
            }
            // 示例：添加第二个省份
            // {
            //   name: '山东',
            //   itemStyle: {
            //     normal: { areaColor: '#1890ff' },
            //     emphasis: { areaColor: '#40a9ff' }
            //   }
            // }
          ]
        }]
      });
    })
    .catch(err => console.error('地图加载失败:', err));
});