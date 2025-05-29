(async function() {
  // 1. 初始化 ECharts 实例
  const chart = echarts.init(document.getElementById('map-container'));

  // 2. 一次性加载整份多层级 GeoJSON
  const rawGeo = await fetch('/_javascripts/china2.json').then(res => res.json());

  // 注册“全国”地图
  echarts.registerMap('china-all', rawGeo);

  // 3. 构建按 parentCode 索引的字典
  const byParent = {};      // e.g. byParent['100000'] = [省级 features…]
  const name2code = {};     // e.g. name2code['湖北'] = '420000'
  rawGeo.features.forEach(f => {
    const code = String(f.properties.adcode);
    const parent = String(f.properties.parentCode || '');
    name2code[f.properties.name] = code;
    if (!byParent[parent]) byParent[parent] = [];
    byParent[parent].push(f);
  });

  // 4. 渲染函数：根据 code 渲染全国或下一级
  const stack = [];  // 用于返回上一级
  function render(code, title) {
    // 如果是全国
    if (code === '100000') {
      chart.setOption({
        title: { text: title, left: 'center' },
        tooltip: { trigger: 'item' },
        series: [{
          type: 'map',
          map: 'china-all',
          roam: true,
          emphasis: { label: { show: true } },
          data: []
        }]
      });
    } else {
      // 构造子级 FeatureCollection
      const fc = {
        type: 'FeatureCollection',
        features: byParent[code] || []
      };
      const mapKey = 'drill_' + code;
      echarts.registerMap(mapKey, fc);
      chart.setOption({
        title: { text: title, left: 'center' },
        tooltip: { trigger: 'item' },
        series: [{
          type: 'map',
          map: mapKey,
          roam: true,
          emphasis: { label: { show: true } },
          data: []
        }]
      });
    }
  }

  // 5. 首次渲染全国
  stack.push({ code: '100000', name: '中国' });
  render('100000', '中国');

  // 6. 点击区域下钻
  chart.on('click', params => {
    const name = params.name;
    const code = name2code[name];
    // 如果没有下级，提示
    if (!code || !byParent[code] || byParent[code].length === 0) {
      alert(name + ' 已经到底层或未找到子集');
      return;
    }
    // 下钻
    stack.push({ code, name });
    render(code, name);
  });

  // 7. “返回上一级”按钮
  document.getElementById('btn-back').onclick = () => {
    if (stack.length <= 1) return;
    stack.pop();
    const prev = stack[stack.length - 1];
    render(prev.code, prev.name);
  };
})();
