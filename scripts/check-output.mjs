import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import vm from 'node:vm'

const dist = resolve('dist')
const origin = 'https://xiiiing.github.io'
const routes = JSON.parse(await readFile('migration/legacy-routes.json', 'utf8'))
const assets = JSON.parse(await readFile('migration/legacy-assets.json', 'utf8'))
for (const route of routes) {
  const file = resolve(dist, `.${route.source}`, route.source.endsWith('/') ? 'index.html' : '')
  const html = await readFile(file, 'utf8')
  const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1]
  assert.ok(script, `Missing redirect script: ${route.source}`)
  let redirected
  vm.runInNewContext(script, { URL, location: {
    origin, search: '?from=bookmark&term=%E7%AC%94%E8%AE%B0', hash: '#2-accuracy',
    replace: value => { redirected = value },
  } }, { timeout: 100 })
  const expected = new URL(route.destination, origin)
  expected.search = '?from=bookmark&term=%E7%AC%94%E8%AE%B0'
  expected.hash = '#2-accuracy'
  assert.equal(redirected, expected.href, `Broken redirect: ${route.source}`)
  assert.ok(html.includes('http-equiv="refresh"'), 'No-JavaScript redirect is missing')
}
let checkedLinks = 0
for (const path of ['index.html','me/index.html','projects/index.html','404.html']) {
  const html = await readFile(resolve(dist,path), 'utf8')
  assert.ok(!/Lorem ipsum|cworld1\/gaussian|114514|dummyjson|youtube\.com/.test(html), `Template content leaked into ${path}`)
  assert.ok(html.includes('lang="zh-CN"'), `Missing language on ${path}`)
  if (path === 'me/index.html') assert.ok(html.includes('目前关注') && html.includes('journey-map'), 'The personal page was overwritten by a legacy redirect')
  for (const match of html.matchAll(/(?:href|src)=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    const value = (match[1] ?? match[2] ?? match[3]).replaceAll('&amp;', '&')
    if (!value || /^(?:data:|mailto:|javascript:|#)/.test(value)) continue
    const url = new URL(value, origin + '/' + path)
    if (url.origin !== origin || url.pathname.startsWith('/wiki/')) continue
    const target = decodeURIComponent(url.pathname)
    await access(resolve(dist, '.' + target, target.endsWith('/') ? 'index.html' : ''))
    checkedLinks++
  }
}
for (const path of assets) await access(resolve(dist, '.' + path))
for (const reserved of ['wiki','ui','lab']) {
  let exists = true
  try { await access(resolve(dist,reserved)) } catch { exists = false }
  assert.equal(exists, false, `Root site masks project path /${reserved}/`)
}
for (const name of ['china.json','21.json','44.json','51.json']) {
  const map = JSON.parse(await readFile(resolve(dist,'maps',name),'utf8'))
  assert.ok(map.features.length, `Empty map: ${name}`)
}
console.log(`Verified ${routes.length} redirects (query + fragment), ${assets.length} legacy media URLs, ${checkedLinks} local links and reserved project paths.`)
