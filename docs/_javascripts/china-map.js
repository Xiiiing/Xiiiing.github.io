// 公共图表配置（调整了选中模式和标签显示）
const commonChartOptions = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}' // 显示地区名称
    },
    series: [{
        type: 'map',
        roam: false,
        selectedMode: false, // 启用单选模式
        label: {
            show: false,  // 显示地图标签
            color: '#333',
            fontSize: 12
        },
        itemStyle: {
            normal: {
                areaColor: '#f0f2f5',
                borderColor: '#fff',
                borderWidth: 0.5
            },
            emphasis: {
                areaColor: '#91caff', // 鼠标悬停颜色
                label: { show: false }
            },
            selected: {
                areaColor: '#1890ff' // 选中状态颜色
            }
        }
    }]
};

// 地图初始化通用函数（添加了点击回调参数）
function initEchartsMap({ selector, mapName, jsonPath, seriesName, data, onClick }) {
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

                // 添加点击事件监听
                if (onClick) {
                    chart.on('click', params => {
                        if (params.componentType === 'series' && params.seriesType === 'map') {
                            onClick(params.name); // 传递点击的省份名称
                        }
                    });
                }
            })
            .catch(err => console.error(`${seriesName}地图加载失败:`, err));
    });
}

// 初始化全国地图（添加点击跳转逻辑）
initEchartsMap({
    selector: '[data-echarts-map="china"]',
    mapName: 'china',
    jsonPath: '/_javascripts/china.json',
    seriesName: '中国地图',
    data: [
        { name: '辽宁', itemStyle: { normal: { areaColor: '#1890ff' } } },
        { name: '四川', itemStyle: { normal: { areaColor: '#1890ff' } } },
        { name: '广东', itemStyle: { normal: { areaColor: '#1890ff' } } }
    ],
    onClick: provinceName => {
        // 省份名称到路径的映射（根据你的实际页面结构调整）
        const provincePaths = {
            '辽宁': '/liaoning',
            '四川': '/sichuan',
            '广东': '/guangdong'
        };
        const path = provincePaths[provinceName];
        if (path) {
            window.location.href = path; // 跳转到对应省份页面
        } else {
            alert(`暂未开放${provinceName}地图页面`);
        }
    }
});

// 其他省份地图初始化（保持原有逻辑）
initEchartsMap({
    selector: '[data-echarts-map="sichuan"]',
    mapName: 'sichuan',
    jsonPath: '/_javascripts/51.json',
    seriesName: '四川地图'
});

initEchartsMap({
    selector: '[data-echarts-map="guangdong"]',
    mapName: 'guangdong',
    jsonPath: '/_javascripts/44.json',
    seriesName: '广东地图'
});

initEchartsMap({
    selector: '[data-echarts-map="liaoning"]',
    mapName: 'liaoning',
    jsonPath: '/_javascripts/21.json',
    seriesName: '辽宁地图'
});
