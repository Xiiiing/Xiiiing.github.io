<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xiiiing's Personal Page</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            display: flex;
            min-height: 100vh;
            background-color: #f5f7fa;
        }
    
        .left-section {
            flex: 0 0 60%;
            padding: 40px;
            background-color: white;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
    
        .right-section {
            flex: 0 0 40%;
            padding: 40px;
            background-color: #f9f9f9;
        }
    
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
    
        .header h1 {
            color: #2c3e50;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
    
        .header p {
            color: #7f8c8d;
            font-size: 1.1em;
        }
    
        .section {
            margin-bottom: 30px;
        }
    
        .section h3 {
            color: #3498db;
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
            margin-bottom: 15px;
            font-size: 1.3em;
        }
    
        .map-container {
            width: 100%;
            height: 600px;
            background: #ecf0f1;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2em;
            color: #7f8c8d;
        }
    
        /* 响应式调整 */
        @media (max-width: 992px) {
            body {
                flex-direction: column;
            }
            .left-section, .right-section {
                flex: 1;
                width: 100%;
                padding: 20px;
            }
            .map-container {
                height: 400px;
            }
        }
    </style>
</head>
<body>
    <div class="left-section">
        <div class="header">
            <h1>Xiiiing</h1>
            <p>计算机硕士 | ISTJ -> ESFJ|</p>
        </div>

        <div class="section">
            <h3>关于我</h3>
            <p>
                目前致力于通过GitHub搭建个人知识库，实现学习过程的可视化与系统化。<br>
                坚信「知识需要流动，成长需要记录」，希望通过博客分享经验，连接更多同频者。
            </p>
        </div>
    
        <div class="section">
            <h3>教育背景</h3>
            <ul>
                <li>✓ 本科 | 物联网工程</li>
                <li>✓ 硕士 | 软件工程</li>
            </ul>
        </div>
    
        <div class="section">
            <h3>兴趣爱好</h3>
            <ul>
                <li>🌍 地图收集与地理探索</li>
                <li>📚 技术博客写作与知识整理</li>
                <li>🎨 极简主义设计与UI/UX研究</li>
                <li>🏓 室内运动</li>
            </ul>
        </div>
    </div>
    
    <div class="right-section">
       <div id="map-container" style="width: 100%; height: 500px;"></div>
    </div>
</body>
</html>