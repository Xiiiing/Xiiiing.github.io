// docs/_javascripts/china-map.js
document.addEventListener('DOMContentLoaded', function () {
  var dom = document.querySelector('[data-echarts-map="china"]');
  if (!dom) return;
  var chart = echarts.init(dom);

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
          name: '中国',
          type: 'map',
          map: 'china',
          roam: false,           // 禁止缩放漫游
          label: {               // 省份名称始终显示
            show: false,
          },
          itemStyle: {           // 默认样式：灰色地块 + 白色边界
            normal: {
              areaColor: '#ccc',
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {          // 悬停样式：变深灰
              areaColor: '#999'
            }
          },
          // data 数组里指定要高亮（蓝色）的省份
          data: [
            {
              name: '辽宁',
              value: 0,          // value 可随便填
              itemStyle: {       // 常态高亮蓝色
                normal: {
                  areaColor: '#1890ff'
                },
                emphasis: {      // 悬停时更亮
                  areaColor: '#40a9ff'
                }
              }
            }
            // 如果有其它省要高亮，继续往这里添加对象
          ]
        }]
      });
    })
    .catch(err => console.error(err));
});
