/* The original Wiki's ECharts map, adapted for lazy loading and responsive themes. */
(() => {
  const container = document.getElementById('journey-map');
  if (!container) return;
  const status = document.getElementById('map-status');
  const back = document.getElementById('map-back');
  const buttons = [...document.querySelectorAll('[data-province]')];
  const provinces = {
    '辽宁省': { file: '21.json', name: 'liaoning', places: ['沈阳市'] },
    '四川省': { file: '51.json', name: 'sichuan', places: ['绵阳市', '宜宾市'] },
    '广东省': { file: '44.json', name: 'guangdong', places: ['深圳市'] },
  };
  const cache = new Map();
  let chart;
  let current = 'china';
  let loading;
  let generation = 0;
  const color = token => getComputedStyle(document.documentElement).getPropertyValue(token).trim();

  async function render(name) {
    const request = ++generation;
    const province = provinces[name];
    const mapName = province?.name || 'china';
    const file = province?.file || 'china.json';
    if (!cache.has(file)) {
      const response = await fetch(`/maps/${file}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const geo = await response.json();
      window.echarts.registerMap(mapName, geo);
      cache.set(file, geo);
    }
    if (request !== generation) return;
    current = name;
    const selected = province?.places || Object.keys(provinces);
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item', formatter: '{b}' },
      series: [{
        type: 'map', map: mapName, roam: false, selectedMode: false,
        layoutCenter: ['50%', '50%'], layoutSize: '92%',
        label: { show: false },
        itemStyle: { areaColor: `hsl(${color('--border')})`, borderColor: `hsl(${color('--background')})`, borderWidth: 1 },
        emphasis: { label: { show: false }, itemStyle: { areaColor: `hsl(${color('--primary')} / .55)` } },
        data: selected.map(name => ({ name, itemStyle: { areaColor: `hsl(${color('--primary')})` } })),
      }],
    }, true);
    status.hidden = true;
    back.hidden = name === 'china';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.province === name)));
  }

  async function start() {
    if (loading) return loading;
    loading = (async () => {
      if (!window.echarts) await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/vendor/echarts.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      chart = window.echarts.init(container);
      new ResizeObserver(() => chart.resize()).observe(container);
      new MutationObserver(() => render(current).catch(showError)).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      chart.on('click', params => { if (provinces[params.name]) render(params.name).catch(showError); });
      await render('china');
    })();
    return loading;
  }
  function showError() {
    status.hidden = false;
    status.textContent = '地图暂时无法加载，右侧仍可查看地点。';
  }
  buttons.forEach(button => button.addEventListener('click', async () => {
    try { await start(); await render(button.dataset.province); } catch { showError(); }
  }));
  back.addEventListener('click', () => render('china').catch(showError));
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      start().catch(showError);
    }
  }, { rootMargin: '160px' });
  observer.observe(container);
})();
