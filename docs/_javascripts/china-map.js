/**
 * ECharts地图切换管理模块
 * 包含状态管理、配置管理和核心操作方法
 */
const MapManager = (() => {
    // 私有状态
    const state = {
        currentMap: 'china', // 当前地图类型：'china'或省份名称
        chartInstance: null  // 当前图表实例
    };

    // 公共图表配置（提取为不可变对象）
    const COMMON_CHART_OPTIONS = Object.freeze({
        tooltip: {
            trigger: 'item',
            formatter: '{b}' // 显示地区名称
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
    });

    // 省份地图配置（增加类型标注）
    const PROVINCE_MAP_CONFIG = {
        '辽宁': {
            mapName: 'liaoning',
            jsonPath: '/_javascripts/21.json',
            seriesName: '辽宁地图',
            cities: ['沈阳市'] // 可扩展的城市列表
        },
        '四川': {
            mapName: 'sichuan',
            jsonPath: '/_javascripts/51.json',
            seriesName: '四川地图',
            cities: ['绵阳市', '宜宾市']
        },
        '广东': {
            mapName: 'guangdong',
            jsonPath: '/_javascripts/44.json',
            seriesName: '广东地图',
            cities: ['深圳市']
        }
    };

    // 公共样式配置（提取复用）
    const HIGHLIGHT_STYLE = Object.freeze({
        normal: { areaColor: '#1890ff' },
        emphasis: { areaColor: '#40a9ff' }
    });

    /**
     * 私有方法：销毁旧图表实例
     */
    function _disposeOldInstance() {
        if (state.chartInstance) {
            state.chartInstance.dispose();
            state.chartInstance = null;
        }
    }

    /**
     * 私有方法：生成地图数据项
     * @param {string[]} regions 地区名称数组
     * @returns {object[]} 地图数据项数组
     */
    function _generateMapData(regions) {
        return regions.map(name => ({ name, itemStyle: HIGHLIGHT_STYLE }));
    }

    /**
     * 核心初始化方法（改为私有方法）
     * @param {object} options 初始化配置
     */
    function _initMap(options) {
        const { selector, mapName, jsonPath, seriesName, data, onClick } = options;
        _disposeOldInstance();

        const chartDom = document.querySelector(selector);
        if (!chartDom) {
            console.error('地图容器元素未找到');
            return;
        }

        const chart = echarts.init(chartDom);
        state.chartInstance = chart;

        fetch(jsonPath)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP错误：${res.status}`);
                return res.json();
            })
            .then(geoJson => {
                echarts.registerMap(mapName, geoJson);
                const option = {
                    ...COMMON_CHART_OPTIONS,
                    series: [{
                        ...COMMON_CHART_OPTIONS.series[0],
                        name: seriesName,
                        map: mapName,
                        data: data || []
                    }]
                };
                chart.setOption(option);

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

    return {
        /**
         * 切换地图主方法
         * @param {string} target 目标地图（'china'或省份名称）
         */
        toggleMap(target) {
            const mapContainer = document.getElementById('map-container');
            if (!mapContainer) {
                console.error('未找到地图容器元素#map-container');
                return;
            }

            // 切换到省份地图
            if (state.currentMap === 'china' && PROVINCE_MAP_CONFIG[target]) {
                const config = PROVINCE_MAP_CONFIG[target];
                state.currentMap = target;

                _initMap({
                    selector: '#map-container',
                    ...config,
                    data: _generateMapData(config.cities),
                    onClick: this.toggleMap.bind(this)
                });
            }

            // 切换回全国地图
            else if (state.currentMap !== 'china' && target === 'china') {
                state.currentMap = 'china';

                _initMap({
                    selector: '#map-container',
                    mapName: 'china',
                    jsonPath: '/_javascripts/china.json',
                    seriesName: '中国地图',
                    data: _generateMapData(Object.keys(PROVINCE_MAP_CONFIG)),
                    onClick: this.toggleMap.bind(this)
                });
            }

            else {
                alert(`未配置${target}地图数据`);
            }
        },

        /**
         * 初始化全国地图
         */
        init() {
            this.toggleMap('china');
        }
    };
})();

// 初始化调用
MapManager.init();
