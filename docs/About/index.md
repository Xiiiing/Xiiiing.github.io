---
title: "About"
hide:
  - navigation
  - toc

---

# About

成功部署Github Pages
经过摸索配置一些插件

- [x] **awesome-nav**

  作用：用于导航相关功能，自动生成nav,丰富自定义导航。

- [x] **search**
  
  作用：为网站添加搜索功能，支持内容检索。
  
- [x] **tags**
  
  作用：处理标签相关功能，如文章标签分类、生成标签云或标签列表，便于按标签浏览内容。
  
- [x] **blog**
  
  作用：增强博客功能，具体包括：
  
  - 开启文章目录（`blog_toc: true`），自动生成内容目录方便阅读；
  - 设置存档日期格式（`archive_date_format: MMMM yyyy`），以 “月份全称 + 年份” 形式展示博客存档日期（如 “May 2025”）。

- [x] **minify**
  
  作用：压缩静态资源以优化网站性能，具体配置：
  
  - 开启 HTML/JS/CSS 压缩（`minify_html/minify_js/minify_css: true`）；
  - 移除 HTML 注释（`remove_comments: true`）；
  - 启用缓存安全模式（`cache_safe: true`）；
  - 指定需压缩的 JS 文件（`_javascripts/mathjax.js` 等）和 CSS 文件（`_stylesheets/extra.css`）。
  
- [x] **rss**
  
  作用：生成 RSS 订阅源，具体配置：
  
  - 输出全文内容（`abstract_chars_count: -1`）；
  - 从元数据 “date” 字段获取文章创建日期，指定日期格式为 “% Y-% m-% d % H:% M”；
  - 启用 RSS 功能（`enabled: True`），设置订阅源缓存时间（`feed_ttl: 1440 分钟`）；
  - 配置订阅源图标、最大条目数（`length: 1000`）、XML 格式化（`pretty_print: True`）；