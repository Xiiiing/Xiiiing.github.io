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
        },
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

// 初始化全国地图（修改为容器跳转逻辑）
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
    ],
    onClick: async (provinceName) => {
        const contentContainer = document.getElementById('province-content');
        const provincePaths = {
            '辽宁': '/liaoning.html',
            '四川': '/sichuan.html',
            '广东': '/guangdong.html'
        };
        const path = provincePaths[provinceName];

        if (path) {
            try {
                // 显示加载状态
                contentContainer.innerHTML = '<div class="loading">加载中...</div>';

                // 加载省份内容
                const response = await fetch(path);
                const html = await response.text();

                // 插入到内容容器
                contentContainer.innerHTML = html;
            } catch (err) {
                contentContainer.innerHTML = `<div class="error">加载${provinceName}内容失败: ${err.message}</div>`;
            }
        } else {
            contentContainer.innerHTML = `<div class="tip">暂未开放${provinceName}地图页面</div>`;
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
    