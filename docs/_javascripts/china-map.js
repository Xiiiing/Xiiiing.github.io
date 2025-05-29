// 公共图表配置（关键适配参数）
const commonChartOptions = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}' // 显示地区名称
    },
    series: [{
        type: 'map',
        roam: false, // 禁止缩放平移
        selectedMode: false, // 禁用选中模式
        label: { show: false }, // 隐藏地图标签
        itemStyle: {
            normal: {
                areaColor: '#e0e0e0', // 基础颜色（未高亮省份）
                borderColor: '#ffffff', // 省份边界颜色
                borderWidth: 0.8 // 边界宽度
            },
            emphasis: {
                areaColor: '#40a9ff', // 点击/悬停高亮颜色
                label: { show: false }
            }
        },
        // 地图比例适配关键参数
        aspectScale: 0.9, // 地图宽高比（可根据实际调整，0.9为常见省份比例）
        mapLocation: {
            x: 'center', // 水平居中
            y: 'center'  // 垂直居中
        },
        boundingCoords: [
            [0, 0],   // 左上角相对坐标（0,0）
            [1, 1]    // 右下角相对坐标（1,1）→ 填满容器
        ]
    }]
};

// 地图状态管理
let currentMap = 'china'; // 当前显示的地图类型：'china' 或省份名称
let chartInstance = null; // 保存当前图表实例（用于销毁旧实例）

// 省份地图配置映射（根据你的实际路径调整）
const provinceMapConfig = {
    '辽宁': {
        mapName: 'liaoning',
        jsonPath: '/_javascripts/21.json', // 替换为你的辽宁地图JSON路径
        seriesName: '辽宁地图'
    },
    '四川': {
        mapName: 'sichuan',
        jsonPath: '/_javascripts/51.json', // 替换为你的四川地图JSON路径
        seriesName: '四川地图'
    },
    '广东': {
        mapName: 'guangdong',
        jsonPath: '/_javascripts/44.json', // 替换为你的广东地图JSON路径
        seriesName: '广东地图'
    }
};

// 地图初始化函数（含适配逻辑）
function initMap(options) {
    // 销毁旧实例（避免内存泄漏）
    if (chartInstance) {
        chartInstance.dispose();
        chartInstance = null;
    }

    const chartDom = document.getElementById('map-container');
    if (!chartDom) return;

    // 初始化ECharts实例
    const chart = echarts.init(chartDom);
    chartInstance = chart;

    // 加载地图JSON数据
    fetch(options.jsonPath)
        .then(res => res.json())
        .then(geoJson => {
            // 注册地图
            echarts.registerMap(options.mapName, geoJson);

            // 合并配置（全国地图需要数据高亮，省份地图可选）
            const option = {
                ...commonChartOptions,
                series: [{
                    ...commonChartOptions.series[0],
                    name: options.seriesName,
                    map: options.mapName,
                    data: options.data || [] // 全国地图需要data高亮，省份地图可不传
                }]
            };

            // 设置图表配置
            chart.setOption(option);

            // 关键：动态调整地图大小（适配容器）
            chart.resize();

            // 绑定点击事件（仅全国地图需要）
            if (options.onClick) {
                chart.on('click', params => {
                    if (params.componentType === 'series' && params.seriesType === 'map') {
                        options.onClick(params.name);
                        chart.resize(); // 点击后再次调整大小（确保切换后适配）
                    }
                });
            }
        })
        .catch(err => {
            console.error(`${options.seriesName}地图加载失败:`, err);
            chartDom.innerHTML = `<div style="color: #ff4d4f; padding: 20px;">${options.seriesName}地图加载失败，请检查JSON路径</div>`;
        });
}

// 地图切换逻辑（核心函数）
function handleMapToggle(provinceName) {
    // 当前是全国地图 → 切换到省份地图
    if (currentMap === 'china') {
        const config = provinceMapConfig[provinceName];
        if (config) {
            currentMap = provinceName;
            initMap({
                selector: '#map-container',
                ...config,
                onClick: handleMapToggle // 省份地图点击时触发返回逻辑
            });
        } else {
            alert(`暂未支持${provinceName}地图`);
        }
    }
    // 当前是省份地图 → 返回全国地图
    else {
        currentMap = 'china';
        initMap({
            selector: '#map-container',
            mapName: 'china',
            jsonPath: '/_javascripts/china.json', // 替换为你的全国地图JSON路径
            seriesName: '中国地图',
            data: [
                { name: '辽宁', itemStyle: { normal: { areaColor: '#1890ff' } } },
                { name: '四川', itemStyle: { normal: { areaColor: '#1890ff' } } },
                { name: '广东', itemStyle: { normal: { areaColor: '#1890ff' } } }
            ],
            onClick: handleMapToggle // 全国地图点击时触发切换
        });
    }
}

// 初始化加载全国地图（页面首次加载）
initMap({
    selector: '#map-container',
    mapName: 'china',
    jsonPath: '/_javascripts/china.json', // 替换为你的全国地图JSON路径
    seriesName: '中国地图',
    data: [
        { name: '辽宁', itemStyle: { normal: { areaColor: '#1890ff' } } },
        { name: '四川', itemStyle: { normal: { areaColor: '#1890ff' } } },
        { name: '广东', itemStyle: { normal: { areaColor: '#1890ff' } } }
    ],
    onClick: handleMapToggle // 绑定点击切换逻辑
});
    