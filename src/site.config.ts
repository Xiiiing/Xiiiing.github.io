import type { Config } from 'astro-pure/types'

// Astro Theme Pure, adapted into a small personal portal.
const config: Config = {
  title: 'Xiiiing',
  author: 'Xiiiing',
  description: '计算机视觉与医学影像的学习记录，工程实践，以及把想法做出来的过程。',
  favicon: '/favicon.svg',
  socialCard: '/images/avatar.jpg',
  locale: { lang: 'zh-CN', attrs: 'zh_CN', dateLocale: 'zh-CN', dateOptions: { year: 'numeric', month: 'long', day: 'numeric' } },
  logo: { src: '/images/avatar.jpg', alt: 'Xiiiing 的猫咪头像' },
  titleDelimiter: '·',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',
  head: [], customCss: [],
  header: { menu: [
    { title: 'Wiki', link: '/wiki/' },
    { title: '项目', link: '/projects/' },
    { title: '关于我', link: '/me/' },
  ] },
  footer: {
    year: `© ${new Date().getFullYear()} `,
    links: [], credits: true,
    social: [
      { icon: 'github', label: 'GitHub', href: 'https://github.com/Xiiiing' },
      { icon: 'rss', label: 'Wiki RSS', href: '/wiki/feed_rss_created.xml' },
    ],
  },
  content: { externalLinks: { content: ' ↗', properties: { rel: 'noopener' } }, blogPageSize: 8, share: [], imageCaption: false },
  integ: {
    links: { logbook: [], applyTip: [], cacheAvatar: false },
    pagefind: false,
    quote: { server: '', target: '' },
    typography: { class: 'prose', blockquoteStyle: 'normal', inlineCodeBlockStyle: 'modern' },
    mediumZoom: { enable: false, selector: '.zoomable', options: {} },
    waline: { enable: false, server: '', showMeta: false, emoji: [], additionalConfigs: {} },
  },
}
export default config
