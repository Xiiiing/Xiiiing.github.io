---
hide:
  - navigation
  - toc
---
<style>
.flex-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 600px; /* 容器最小高度 */
  margin-top: 30px; /* 内容间距 */
}

.text-section {
  flex: 0 0 60%; /* 文字区域占比 60% */
  padding: 20px;
}

.map-section {
  flex: 0 0 40%; /* 地图区域占比 40% */
  padding: 20px;
  border-left: 1px solid #e0e0e0; /* 分隔线 */
}

#map-container {
  width: 100%;
  height: 100%; /* 地图撑满容器 */
  min-height: 500px;
}
</style>

<div class="flex-container">
  <div class="text-section">
   <h1>Xiiiing</h1>
   <p>计算机硕士 | ISTJ -> ESFJ</p>
   <h3>关于我</h3>
   <p>目前致力于通过GitHub搭建个人知识库，实现学习过程的可视化与系统化。<br>
      坚信「知识需要流动，成长需要记录」，希望通过博客分享经验，连接更多同频者。</p>
   <h3>兴趣爱好</h3>
            <ul>
                <li>🌍 地图收集与地理探索</li>
                <li>📚 技术博客写作与知识整理</li>
                <li>🎨 极简主义设计与UI/UX研究</li>
                <li>🏓 室内运动</li>
            </ul>
  </div>


  <div class="map-section">
    <!-- 地图主容器（关键容器，用于切换显示） -->
    <div id="map-container"></div>
  </div>
</div>