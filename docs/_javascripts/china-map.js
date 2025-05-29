document.addEventListener('DOMContentLoaded', function () {
  const dom = document.querySelector('[data-echarts-map="china"]');
  if (!dom) return;
  const chart = echarts.init(dom);

  fetch('/_javascripts/china.json')
    .then(res => res.json())
    .then(geoJson => {
      echarts.registerMap('china', geoJson);
      chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        series: [{
          name: '中国地图',
          type: 'map',
          map: 'china',
          roam: false,
          // 单选模式：点击自动切换选中状态
          selectedMode: false,
          label: {
            show: false
          },
          itemStyle: {
            normal: {
              areaColor: '#ccc',  // 未选中、未自定义的省份灰色
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              // 悬停时的加亮色：对所有省份都生效
              areaColor: '#999',
              label:{show:false}
            }
          },
          
          data: [
            {
              name: '辽宁',
              itemStyle: {
                normal: {
                  areaColor: '#1890ff'
                },
                emphasis: {
                  areaColor: '#40a9ff'
                }
              }
            },
            {
              name: '四川',
              itemStyle: {
                normal: {
                  areaColor: '#1890ff'
                },
                emphasis: {
                  areaColor: '#40a9ff'
                }
              }
            },
            {
              name: '广东',
              itemStyle: {
                normal: {
                  areaColor: '#1890ff'
                },
                emphasis: {
                  areaColor: '#40a9ff'
                }
              }
            }

          ]
        }]
      });
    })
    .catch(err => console.error('地图加载失败:', err));
});
