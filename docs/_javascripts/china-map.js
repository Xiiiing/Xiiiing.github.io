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

// 省份名称到地图标识的映射（根据你的实际数据调整）
const provinceKeyMap = {
    '辽宁': 'liaoning',
    '四川': 'sichuan',
    '广东': 'guangdong'
};

// 地图初始化通用函数（新增点击事件支持）
function initEchartsMap({ selector, mapName, jsonPath, seriesName, data }) {
    document.addEventListener('DOMContentLoaded', () => {
        const chartDom = document.querySelector(selector);
        if (!chartDom) return;

        const chart = echarts.init(chartDom);
        fetch(jsonPath)
            .then(res => res.json())
            .then(geoJson => {
                echarts.registerMap(mapName, geoJson);
                const option = {
                    ...commonChartOptions,
                    series: [{
                        ...commonChartOptions.series[0],
                        name: seriesName,
                        map: mapName,
                        data: data || []
                    }]
                };
                chart.setOption(option);

                // 中国地图添加点击事件（仅主地图生效）
                if (mapName === 'china') {
                    chart.on('click', params => {
                        const provinceName = params.name;
                        const targetKey = provinceKeyMap[provinceName];
                        if (targetKey) {
                            // 隐藏中国地图，显示目标省份地图
                            document.querySelector('[data-echarts-map="china"]').style.display = 'none';
                            document.querySelector(`[data-echarts-map="${targetKey}"]`).style.display = 'block';
                        }
                    });
                }

                // 返回按钮点击事件（所有地图生效）
                const backButtons = chartDom.querySelectorAll('.back-button');
                backButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const targetMap = btn.dataset.target;
                        // 隐藏当前省份地图，显示中国地图
                        chartDom.style.display = 'none';
                        document.querySelector(`[data-echarts-map="${targetMap}"]`).style.display = 'block';
                    });
                });
            })
            .catch(err => console.error(`${seriesName}地图加载失败:`, err));
    });
}

// 初始化全国地图（带高亮省份）
initEchartsMap({
    selector: '[data-echarts-map="china"]',
    mapName: 'china',
    jsonPath: '/_javascripts/china.json',
    seriesName: '中国地图',
    data: [
        {
            name: '辽宁',
            itemStyle: {
                normal: { areaColor: '#1890ff' },
                emphasis: { areaColor: '#40a9ff' }
            }
        },
        {
            name: '四川',
            itemStyle: {
                normal: { areaColor: '#1890ff' },
                emphasis: { areaColor: '#40a9ff' }
            }
        },
        {
            name: '广东',
            itemStyle: {
                normal: { areaColor: '#1890ff' },
                emphasis: { areaColor: '#40a9ff' }
            }
        }
    ]
});

// 初始化四川地图
initEchartsMap({
    selector: '[data-echarts-map="sichuan"]',
    mapName: 'sichuan',
    jsonPath: '/_javascripts/51.json',
    seriesName: '四川地图'
});

// 初始化广东地图
initEchartsMap({
    selector: '[data-echarts-map="guangdong"]',
    mapName: 'guangdong',
    jsonPath: '/_javascripts/44.json',
    seriesName: '广东地图'
});

// 初始化辽宁地图
initEchartsMap({
    selector: '[data-echarts-map="liaoning"]',
    mapName: 'liaoning',
    jsonPath: '/_javascripts/21.json',
    seriesName: '辽宁地图'
});