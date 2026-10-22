import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname, sep } from 'node:path'

const dist = resolve('dist')
const routes = JSON.parse(await readFile('migration/legacy-routes.json', 'utf8'))
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

for (const { source, destination } of routes) {
  if (['/', '/me/', '/projects/', '/404.html'].includes(source.toLowerCase()) || !destination.startsWith('/wiki/') && destination !== '/me/') throw new Error(`Invalid legacy route: ${source}`)
  const path = resolve(dist, `.${source}`, source.endsWith('/') ? 'index.html' : '')
  if (!path.startsWith(dist + sep)) throw new Error('Legacy output escaped dist')
  const canonical = new URL(destination, 'https://xiiiing.github.io').href
  const script = `const target = new URL(${JSON.stringify(destination)}, location.origin); target.search = location.search; target.hash = location.hash; location.replace(target.href);`
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${escape(canonical)}"><title>页面已迁移 · Xiiiing</title><script>${script}</script><meta http-equiv="refresh" content="0;url=${escape(canonical)}"></head><body><h1>这篇内容已迁移</h1><p><a href="${escape(canonical)}">继续访问新地址</a></p><p><a href="/">个人主页</a> · <a href="/wiki/">Wiki</a></p></body></html>\n`)
}

// Static hosting cannot send an HTTP redirect for RSS clients. Keep a valid
// migration notice at old feed URLs and advertise the new subscription address.
for (const kind of ['created', 'updated']) {
  const newFeed = `https://xiiiing.github.io/wiki/feed_rss_${kind}.xml`
  const description = `Wiki 已迁移，请将订阅地址更新为 ${newFeed}。`
  await writeFile(resolve(dist, `feed_rss_${kind}.xml`), `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"><channel><title>Xiiiing 的 Wiki 订阅已迁移</title><link>https://xiiiing.github.io/wiki/</link><description>${description}</description><itunes:new-feed-url>${newFeed}</itunes:new-feed-url><item><title>请更新 Wiki 订阅地址</title><link>${newFeed}</link><guid isPermaLink="false">xiiiing-wiki-feed-migration-${kind}-20261022</guid><description>${description}</description></item></channel></rss>\n`)
  await writeFile(resolve(dist, `feed_json_${kind}.json`), JSON.stringify({
    version: 'https://jsonfeed.org/version/1.1', title: 'Xiiiing 的 Wiki 订阅已迁移',
    home_page_url: 'https://xiiiing.github.io/wiki/',
    feed_url: `https://xiiiing.github.io/wiki/feed_json_${kind}.json`,
    description,
    items: [{ id: `wiki-migration-${kind}-20261022`, url: newFeed, title: '请更新 Wiki 订阅地址', content_text: description }],
  }, null, 2) + '\n')
}
console.log(`Generated ${routes.length} legacy redirects and feed migration notices.`)
