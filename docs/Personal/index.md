---
hide:
  - navigation
  - toc
---
# Xiiiing 
计算机硕士 | esfj -> istj
<style>
  /* -------------------- 基础全局样式 -------------------- */
  /* 重置页面基础样式，设置全局字体、行高和文字颜色 */
  body {
    font-family: 'Segoe UI', sans-serif;  /* 无衬线字体，更适合屏幕阅读 */
    line-height: 1.8;                     /* 行高设置为字体大小的1.8倍，提升阅读舒适度 */
    color: #4b5563;                       /* 深灰色文字，比纯黑更柔和 */
    margin: 0;                            /* 清除浏览器默认外边距 */
    padding: 0;                           /* 清除浏览器默认内边距 */
  }

  /* -------------------- 标题样式（H1） -------------------- */
  /* 调整主标题（# Xiiiing）的样式，解决居中和对齐问题 */
  h1 {
    padding-left: 20px !important;        /* 左侧内边距20px，与下方板块标题（h3）对齐 */
    text-align: left !important;          /* 强制左对齐，避免默认居中 */
    margin: 0 0 25px !important;          /* 底部外边距25px，控制标题与内容的间距 */
  }

  /* -------------------- 页面容器 -------------------- */
  /* 限制内容最大宽度并水平居中，形成两侧留白的视觉效果 */
  .container {
    max-width: 1200px;                    /* 最大宽度1200px，适配主流屏幕 */
    margin: 0 auto;                       /* 左右外边距自动，实现水平居中 */
    padding: 40px 20px;                   /* 上下内边距40px，左右20px（防止内容贴边） */
  }

  /* -------------------- 弹性布局容器 -------------------- */
  /* 用于文字区和地图区的响应式排列 */
  .flex-container {
    display: flex;                        /* 启用弹性布局 */
    flex-wrap: wrap;                      /* 子元素换行，小屏幕自动堆叠 */
    gap: 30px;                            /* 子元素之间的间距30px */
    margin-top: 60px;                     /* 顶部外边距60px，与标题拉开距离 */
  }

  /* -------------------- 文字内容区 -------------------- */
  /* 文字区占比60%（弹性收缩），最小宽度300px（防止内容过窄） */
  .text-section {
    flex: 1 1 60%;                        /* 弹性增长/收缩系数，基础宽度60% */
    min-width: 300px;                     /* 最小宽度300px，适配小屏幕 */
  }

  /* -------------------- 地图区 -------------------- */
  /* 地图区占比35%（弹性收缩），最小宽度300px */
  .map-section {
    flex: 1 1 35%;                        /* 弹性增长/收缩系数，基础宽度35% */
    min-width: 300px;                     /* 最小宽度300px，适配小屏幕 */
    position: relative;                   /* 为子元素（地图覆盖层）提供定位基准 */
  }

  /* -------------------- 通用板块样式 -------------------- */
  /* 每个内容板块（如"关于我""兴趣爱好"）的基础样式 */
  .section {
    margin-bottom: 40px;                  /* 底部外边距40px，控制板块间距 */
    padding: 20px;                        /* 内边距20px，内容与边框的间距 */
    border-radius: 8px;                   /* 圆角8px，柔和边框 */
    transition: transform 0.3s ease, box-shadow 0.3s ease;  /* 悬停动画过渡效果 */
    box-shadow: 0 2px 15px rgba(0,0,0,0.05);  /* 轻微阴影，提升层次感 */
  }

  /* 板块悬停效果：向上偏移+阴影加深 */
  .section:hover {
    transform: translateY(-5px);           /* 向上偏移5px */
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);  /* 阴影更明显，增强交互感 */
  }

  /* 板块标题（h3）样式 */
  .section h3 {
    font-size: 1.8em;                     /* 标题字号（相对于父元素） */
    color: #334155;                       /* 深灰色标题，与正文区分 */
    margin: 0 0 25px;                     /* 底部外边距25px，控制标题与内容的间距 */
    position: relative;                   /* 为伪元素（左侧竖线）提供定位基准 */
    padding-left: 20px;                   /* 左侧内边距20px，与竖线拉开距离 */
  }

  /* 标题左侧竖线装饰（伪元素实现） */
  .section h3::before {
    content: '';                          /* 伪元素内容为空 */
    position: absolute;                   /* 绝对定位，相对于h3标题 */
    left: 0;                              /* 左侧对齐 */
    top: 50%;                             /* 垂直居中 */
    transform: translateY(-50%);          /* 精确垂直居中 */
    width: 8px;                           /* 竖线宽度8px */
    height: 80%;                          /* 竖线高度为标题高度的80% */
    background-color: #1e3a8a;            /* 主题色（深蓝） */
  }

  /* -------------------- 文字段落与列表样式 -------------------- */
  /* 段落和无序列表的通用样式 */
  .text-section p,
  .text-section ul {
    margin: 15px 0;                       /* 上下外边距15px，控制段落/列表间距 */
    padding-left: 0;                      /* 清除左侧内边距（原-20px可能导致布局问题，修正为0） */
    list-style: none;                     /* 清除列表默认项目符号（如圆点） */
  }

  /* 列表项样式 */
  .text-section ul li {
    padding-left: 30px;                   /* 左侧内边距30px，为自定义图标留出空间 */
    margin-bottom: 10px;                  /* 底部外边距10px，控制列表项间距 */
    position: relative;                   /* 为伪元素（自定义图标）提供定位基准 */
  }

  /* 自定义列表图标（通过data-icon属性插入） */
  .text-section ul li::before {
    content: attr(data-icon);             /* 读取li标签的data-icon属性内容（如🌍、📚） */
    display: inline-block;                /* 行内块级元素，允许设置宽高 */
    width: 1em;                           /* 宽度为1个文字单位（与文字对齐） */
    margin-left: -1.5em;                  /* 向左偏移1.5em，使图标贴近文字左侧 */
    color: #1e3a8a;                       /* 图标颜色与标题竖线一致（主题色） */
    font-weight: bold;                    /* 图标加粗（部分符号更清晰） */
  }

  /* -------------------- 地图模块样式 -------------------- */
  /* 地图容器外框样式 */
  .map-wrapper {
    position: relative;                   /* 为覆盖层（map-overlay）提供定位基准 */
    width: 100%;                          /* 宽度占满父容器 */
    height: 500px;                        /* 高度固定500px（可根据需求调整） */
    border-radius: 8px;                   /* 圆角8px，与板块样式统一 */
    overflow: hidden;                     /* 溢出内容隐藏（防止覆盖层超出） */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);  /* 轻微阴影，提升层次感 */
    transition: box-shadow 0.3s ease;     /* 悬停阴影过渡效果 */
  }

  /* 地图容器悬停效果：阴影加深 */
  .map-wrapper:hover {
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08);  /* 阴影更明显，增强交互感 */
  }

  /* 地图实际显示区域（需配合地图API填充内容） */
  #map-container {
    width: 100%;                          /* 宽度占满父容器 */
    height: 100%;                         /* 高度占满父容器 */
    z-index: 1;                           /* 层级1（覆盖层在z-index:2） */
  }

  /* 地图覆盖层（悬停时从底部滑出） */
  .map-overlay {
    position: absolute;                   /* 绝对定位，相对于map-wrapper */
    bottom: 0;                            /* 底部对齐 */
    left: 0;                              /* 左侧对齐 */
    right: 0;                             /* 右侧对齐（宽度占满） */
    background: rgba(30, 58, 138, 0.8);   /* 深蓝半透明背景（与主题色一致） */
    color: #fff;                          /* 白色文字 */
    padding: 15px 20px;                   /* 内边距15px（上下）20px（左右） */
    transform: translateY(100%);          /* 默认向下偏移100%（隐藏在底部） */
    transition: transform 0.3s ease;      /* 滑出动画过渡效果 */
    z-index: 2;                           /* 层级2（覆盖在地图上方） */
  }

  /* 悬停时显示覆盖层 */
  .map-wrapper:hover .map-overlay {
    transform: translateY(0);              /* 向上偏移0（完全显示） */
  }

  /* -------------------- 响应式设计（小屏幕适配） -------------------- */
  @media (max-width: 768px) {             /* 当屏幕宽度≤768px（手机/平板） */
    .flex-container {
      flex-direction: column;             /* 弹性布局方向改为垂直（文字区/地图区堆叠） */
    }
    
    .text-section, 
    .map-section {
      flex: 1 1 100%;                     /* 宽度占满父容器 */
    }
    
    #map-container {
      height: 400px;                      /* 地图高度调整为400px（适配小屏幕） */
    }
    
    .section h3 {
      font-size: 1.5em;                   /* 标题字号缩小（避免过宽） */
    }
  }

  /* -------------------- 辅助样式（保留原有） -------------------- */
  /* 高亮文字（如GitHub、分享经验） */
  .highlight {
    color: #3b82f6;                       /* 蓝色高亮（与主题色呼应） */
    font-weight: 600;                     /* 中粗字体 */
  }

  /* 强调文字（如理念部分） */
  .emphasis {
    font-style: italic;                   /* 斜体 */
    color: #1e3a8a;                       /* 主题色（深蓝） */
  }
</style>

<!-- 页面主容器 -->
<div class="container">
  <!-- 弹性布局容器（文字区+地图区） -->
  <div class="flex-container">
    <!-- 文字内容区 -->
    <div class="text-section">
      <!-- "关于我"板块 -->
      <div class="section">
        <h3>关于我</h3>
         <li>专注于通过 <span class="highlight">GitHub</span> 构建个人知识体系，</li>
        <li>追求学习过程的 <strong>可视化</strong> 与 <strong>系统化</strong>。</li>
        <li>秉持「<span class="emphasis">知识流动促成长，记录沉淀筑认知</span>」理念，</li>
        <li>希望通过技术博客 <a href="#" class="highlight">分享经验</a>，</li>
        <li>连接更多 <span style="color: #22c55e; font-weight: 600;">同频创作者</span>。</li>
      </div>

      <!-- "兴趣爱好"板块 -->
      <div class="section">
        <h3>兴趣爱好</h3>
        <!-- 无序列表（自定义图标通过data-icon属性实现） -->
        <ul>
          <li data-icon="🌍"> 地图收集与地理探索</li>
          <li data-icon="📚"> 技术博客写作与知识整理</li>
          <li data-icon="🎨"> 极简主义设计</li>
          <li data-icon="🏓"> 室内运动</li>
        </ul>
      </div>

      <!-- "技术栈"板块 -->
      <div class="section">
        <h3>技术栈</h3>
        <!-- 无序列表（自定义图标通过data-icon属性实现） -->
        <ul>
          <li data-icon="💻"> 编程语言：Python、JavaScript、Java</li>
          <li data-icon="🛠️"> 工具链：Git、Nginx、GitHub Actions</li>
          <li data-icon="🌐"> 领域：计算机视觉、Web 开发、数据结构与算法</li>
        </ul>
      </div>
    </div>

    <!-- 地图区 -->
    <div class="map-section">
      <!-- 地图容器（需通过JavaScript初始化地图API，如高德/百度地图） -->
      <div class="map-wrapper">
        <div id="map-container"></div>
        <!-- 地图覆盖层（悬停时显示） -->
        <div class="map-overlay">
          <h4>求学轨迹地图</h4>
          <p>标记了我的教育旅程中重要的地理位置和经历</p>
        </div>
      </div>
    </div>
  </div>
</div>