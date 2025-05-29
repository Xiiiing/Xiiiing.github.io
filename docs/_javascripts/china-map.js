// 公共图表配置（调整了交互性、标签和颜色）
const commonChartOptions = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}' // 显示地区名称
    },
    series: [{
        type: 'map',
        roam: false, // 启用缩放和平移
        selectedMode: false,
        label: {
            show: false,
        },
        itemStyle: {
           normal: {
                areaColor: '#ccc',
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                areaColor: '#999',
                label: {show: false}
            }
        }
    }]
};

// 地图状态管理（关键变量）
let currentMap = 'china'; // 当前显示的地图类型：'china' 或省份名称
let chartInstance = null; // 保存当前图表实例用于销毁

// 省份地图配置映射（根据你的实际路径调整）
const provinceMapConfig = {
    '辽宁': {
        mapName: 'liaoning',
        jsonPath: '/_javascripts/21.json',
        seriesName: '辽宁地图'
    },
    '四川': {
        mapName: 'sichuan',
        jsonPath: '/_javascripts/51.json',
        seriesName: '四川地图'
    },
    '广东': {
        mapName: 'guangdong',
        jsonPath: '/_javascripts/44.json',
        seriesName: '广东地图'
    }
};

// 地图初始化通用函数（增加了标题显示）
function initMap({ selector, mapName, jsonPath, seriesName, data, onClick }) {
    // 销毁旧实例，避免内存泄漏
    if (chartInstance) {
        chartInstance.dispose();
        chartInstance = null;
    }

    const chartDom = document.querySelector(selector);
    if (!chartDom) return;

    const chart = echarts.init(chartDom);
    chartInstance = chart; // 保存当前实例

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

            // 绑定点击事件
            if (onClick) {
                chart.on('click', params => {
                    if (params.componentType === 'series' && params.seriesType === 'map') {
                        onClick(params.name);
                    }
                });
            }
        })
        .catch(err => console.error(`${seriesName}地图加载失败:`, err));
}

// 地图切换主逻辑
function handleMapToggle(provinceName) {
    const mapContainer = document.getElementById('map-container');

    // 当前是全国地图 → 切换到省份地图
    if (currentMap === 'china') {
        const config = provinceMapConfig[provinceName];
        if (config) {
            currentMap = provinceName;
            initMap({
                selector: '#map-container',
                ...config,
                data: [
                {
                    name: '绵阳市',
                    itemStyle: {
                        normal: { areaColor: '#1890ff' },
                        emphasis: { areaColor: '#40a9ff' }
                    }
                },
                {
                    name: '宜宾市',
                    itemStyle: {
                        normal: { areaColor: '#1890ff' },
                        emphasis: { areaColor: '#40a9ff' }
                    }
                },
                {
                    name: '沈阳市',
                    itemStyle: {
                        normal: { areaColor: '#1890ff' },
                        emphasis: { areaColor: '#40a9ff' }
                    }
                },
                {
                    name: '深圳市',
                    itemStyle: {
                        normal: { areaColor: '#1890ff' },
                        emphasis: { areaColor: '#40a9ff' }
                    }
                }],
                onClick: handleMapToggle // 省份地图点击时触发返回逻辑
            });
        } else {
            alert(`笔者学习经历无${provinceName}`);
        }
    }

    // 当前是省份地图 → 返回全国地图
    else {
        currentMap = 'china';
        initMap({
            selector: '#map-container',
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
            onClick: handleMapToggle // 全国地图点击时触发切换
        });
    }
}

// 初始化全国地图（首次加载）
initMap({
    selector: '#map-container',
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
    onClick: handleMapToggle // 绑定点击切换逻辑
});