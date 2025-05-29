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
            show: true
          },
          itemStyle: {
            normal: {
              areaColor: '#ccc',  // 未选中、未自定义的省份灰色
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              // 悬停时的加亮色：对所有省份都生效
              areaColor: '#999'
            }
          },
          
          data: [
            {
              name: '辽宁',
              // 默认高亮（用蓝色），并作为“已选中”以便后续 click 切换逻辑
              selected: false,
              itemStyle: {
                normal: {
                  areaColor: '#1890ff'
                },
                emphasis: {
                  areaColor: '#40a9ff'
                }
              }
            }
            // 如需同时默认高亮多个省份，可在此处继续添加
          ]
        }]
      });

      // 可选：监听页面 click 事件，打印当前选中省份
      chart.on('click', params => {
        console.log('当前选中：', params.name);
      });
    })
    .catch(err => console.error('地图加载失败:', err));
});
