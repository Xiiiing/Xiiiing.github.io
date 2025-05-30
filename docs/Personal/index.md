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
.highlight {
  color: #3b82f6;
  font-weight: 600;
}
.emphasis {
  font-style: italic;
  color: #1e3a8a;
}
 .map-overlay {
  transform: translateY(0);
}
</style>

<div class="flex-container">
  <div class="text-section">
  <h3>关于我</h3>
      <p>
          专注于通过 <span class="highlight">GitHub</span> 构建个人知识体系，
          追求学习过程的 <strong>可视化</strong> 与 <strong>系统化</strong>。<br>
          秉持「<span class="emphasis">知识流动促成长，记录沉淀筑认知</span>」理念，
          希望通过技术博客 <a href="#" class="highlight">分享经验</a>，
          连接更多 <span style="color: #22c55e; font-weight: 600;">同频创作者</span>。
      </p>
      <h3>兴趣爱好</h3>
      <ul>
          <li>🌍 地图收集与地理探索</li>
          <li>📚 技术博客写作与知识整理</li>
          <li>🎨 极简主义设计与UI/UX研究</li>
          <li>🏓 室内运动</li>
      </ul>
      <h3>技术栈</h3>
      <ul>
          <li>💻 编程语言：Python（数据科学）、JavaScript（Web 开发）、Java（后端）</li>
          <li>🛠️ 工具链：Git（版本控制）、Docker（容器化）、VS Code（全栈开发）</li>
          <li>🌐 领域：Web 开发（React/Vue）、数据结构与算法（LeetCode 刷题 200+）</li>
      </ul>
  </div>


  <div class="map-section">
    <div id="map-container"></div>
    <div class="map-overlay">
        <h4>求学轨迹地图</h4>
        <p>标记了我的教育旅程中重要的地理位置和经历</p>
    </div>
  </div>
</div>