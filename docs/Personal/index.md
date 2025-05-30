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
  min-height: 600px;
  margin-top: 30px;
}

.text-section {
  flex: 0 0 60%;
  padding: 20px;
}

.map-section {
  flex: 0 0 40%;
  padding: 20px;
  border-left: 1px solid #e0e0e0;
  position: relative; /* 弹框定位容器 */
}

#map-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  background: #f0f0f0; /* 地图占位背景 */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.map-overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1;
  transition: transform 0.3s ease; /* 交互动画 */
}

/* 响应式布局（手机端） */
@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }
  .text-section, .map-section {
    flex: 0 0 100%;
  }
  .map-section {
    border-left: none;
    border-top: 1px solid #e0e0e0;
    margin-top: 20px;
  }
}

/* 文字区域样式优化 */
.text-section h3 {
  margin-bottom: 15px;
  color: #333;
  font-size: 1.2em;
}

.text-section ul {
  list-style: none;
  padding-left: 20px;
}

.text-section li {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.highlight {
  color: #3b82f6;
  font-weight: 600;
}

.emphasis {
  font-style: italic;
  color: #1e3a8a;
}

/* 地图弹框交互 */
.map-section:hover .map-overlay {
  transform: translateY(-5px); /* 悬停上移效果 */
}
</style>

<div class="flex-container">
  <div class="text-section">
    <h3>关于我</h3>
    <p>
      专注于通过 <span class="highlight">GitHub</span> 构建个人知识体系，<br>
      追求学习过程的 <strong>可视化</strong> 与 <strong>系统化</strong>。<br>
      秉持「<span class="emphasis">知识流动促成长，记录沉淀筑认知</span>」理念，<br>
      希望通过技术博客 <a href="#" class="highlight">分享经验</a>，<br>
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