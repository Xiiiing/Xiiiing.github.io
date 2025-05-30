---
hide:
  - navigation
  - toc
---
<style>
body {
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.8;
  color: #4b5563;
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 3.5em;
  color: #1e3a8a;
  margin-bottom: 10px;
  border-bottom: 4px solid #1e3a8a;
  display: inline-block;
  padding-bottom: 10px;
}

.header .subtitle {
  font-size: 1.2em;
  color: #64748b;
  font-weight: 400;
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 60px;
}

.left-section {
  flex: 1 1 60%;
  min-width: 300px;
}

.right-section {
  flex: 1 1 35%;
  min-width: 300px;
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.section:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}

.section h3 {
  font-size: 1.8em;
  color: #334155;
  margin-top: 0;
  margin-bottom: 25px;
  position: relative;
  padding-left: 20px;
}

.section h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 80%;
  background-color: #1e3a8a;
}

.section p {
  margin: 15px 0;
  padding-left: 20px;
}

.highlight {
  color: #3b82f6;
  font-weight: 600;
}

.emphasis {
  font-style: italic;
  color: #1e3a8a;
}

ul {
  list-style: none;
  padding: 0;
  margin-left: 20px;
}

ul li {
  padding-left: 35px;
  margin-bottom: 15px;
  position: relative;
}

ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
}

.hobbies li:nth-child(1)::before { 
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231e3a8a'%3E%3Cpath d='M15 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-9 9c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v6zM7 7H5v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2'/%3E%3C/svg%3E"); 
}
.hobbies li:nth-child(2)::before { 
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231e3a8a'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-4v-4h4v4zm0-6h-4V8h4v4zm6 6h-4v-4h4v4zm0-6h-4V8h4v4z'/%3E%3C/svg%3E"); 
}
.hobbies li:nth-child(3)::before { 
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231e3a8a'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-4v-4h4v4zm0-6h-4V8h4v4zm6 6h-4v-4h4v4zm0-6h-4V8h4v4z'/%3E%3C/svg%3E"); 
}
.hobbies li:nth-child(4)::before { 
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231e3a8a'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E"); 
}

.skills li:nth-child(1)::before { 
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231e3a8a'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-4v-4h4v4zm0-6h-4V8h4v4zm6 6h-4v-4h4v4zm0-6h-4V8h4v4z'/%3E%3C/svg%3E"); 
}
.skills li:nth-child(2)::before { 
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231e3a8a'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-4v-4h4v4zm0-6h-4V8h4v4zm6 6h-4v-4h4v4zm0-4h4v4zm0-6h-4V8h4v4zm6 6h-4v-4h4v4zm0-6h-4V8h4v4z'/%3E%3C/svg%3E"); 
}
.skills li:nth-child(3)::before { 
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231e3a8a'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-4v-4h4v4zm0-6h-4V8h4v4zm6 6h-4v-4h4v4zm0-6h-4V8h4v4z'/%3E%3C/svg%3E"); 
}

.map-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  position: relative;
}

.map-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.map-container:hover img {
  transform: scale(1.03);
}

.map-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(30, 58, 138, 0.8);
  color: white;
  padding: 15px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.map-container:hover .map-overlay {
  transform: translateY(0);
}

.social-links {
  text-align: center;
  margin-top: 60px;
  padding-top: 30px;
  border-top: 2px solid #e5e7eb;
}

.social-links a {
  margin: 0 15px;
  color: #1e3a8a;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s;
}

.social-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -3px;
  left: 0;
  background-color: #3b82f6;
  transition: width 0.3s;
}

.social-links a:hover {
  color: #3b82f6;
}

.social-links a:hover::after {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header h1 {
    font-size: 2.5em;
  }

  .section h3 {
    font-size: 1.5em;
  }

  .content-wrapper {
    flex-direction: column;
  }

  .map-container {
    min-height: 350px;
  }
}
</style>

<div class="container">
  <div class="header">
    <h1>Xiiiing</h1>
    <p class="subtitle">计算机硕士 · ISTJ → ESFJ</p>
  </div>

  <div class="content-wrapper">
    <div class="left-section">
      <div class="section">
        <h3>关于我</h3>
        <p>
          专注于通过 <span class="highlight">GitHub</span> 构建个人知识体系，
          追求学习过程的 <strong>可视化</strong> 与 <strong>系统化</strong>。<br>
          秉持「<span class="emphasis">知识流动促成长，记录沉淀筑认知</span>」理念，
          希望通过技术博客 <a href="#" class="highlight">分享经验</a>，
          连接更多 <span style="color: #22c55e; font-weight: 600;">同频创作者</span>。
        </p>
      </div>

      <div class="section">
        <h3>兴趣爱好</h3>
        <ul class="hobbies">
          <li>🌍 地图收集与地理探索（标记过 5 个省份的求学轨迹）</li>
          <li>📚 技术博客写作（累计输出 30+ 篇原创技术文章）</li>
          <li>🎨 极简主义设计（擅长 Figma 原型设计与 UI 动效）</li>
          <li>🏸 室内运动（每周保持 3 次羽毛球/乒乓球训练）</li>
        </ul>
      </div>
    
      <div class="section">
        <h3>技术栈</h3>
        <ul class="skills">
          <li>💻 编程语言：Python（数据科学）、JavaScript（Web 开发）、Java（后端）</li>
          <li>🛠️ 工具链：Git（版本控制）、Docker（容器化）、VS Code（全栈开发）</li>
          <li>🌐 领域：Web 开发（React/Vue）、数据结构与算法（LeetCode 刷题 200+）</li>
        </ul>
      </div>
    </div>
    
    <div class="right-section">
      <div id="map-container">
        <div class="map-overlay">
          <h4>求学轨迹地图</h4>
          <p>标记了我的教育旅程中重要的地理位置和经历</p>
        </div>
      </div>
    </div>
  </div>

  <div class="social-links">
    <a href="https://github.com/Xiiiing" target="_blank">GitHub</a>
    <a href="https://xiiiing.github.io/blog" target="_blank">技术博客</a>
    <a href="https://twitter.com/xiiiing_dev" target="_blank">Twitter</a>
    <a href="mailto:hi@xiiiing.com">联系我</a>
  </div>
</div>