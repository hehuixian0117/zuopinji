/* ============================================================
   Portfolio Data — 所有可配置的文本数据集中管理
   ============================================================ */

var PORTFOLIO_DATA = {
  personal: {
    name: '何慧娴',
    nameEn: 'He Huixian',
    university: '重庆三峡科技大学',
    major: '大数据管理与应用',
    degree: '本科',
    graduation: '2027',
    email: '1162811518@qq.com',
    phone: '15159050272',
    tagline: '用数据驱动决策，用工程落地价值',
    bio: '我是何慧娴，重庆三峡科技大学大数据管理与应用专业2027届毕业生。热爱数据科学与大数据技术，专注于数据分析、大数据工程和AI应用开发。在校期间完成了6个完整的项目实战，从数据处理到模型部署均有涉及，具备从0到1构建数据系统的能力。期待加入一个优秀的团队，用数据创造真正的业务价值。'
  },

  stats: [
    { icon: '📚', number: 6, suffix: '+', label: '完整数据项目' },
    { icon: '🛠', number: 20, suffix: '+', label: '技术工具与框架' },
    { icon: '🎯', number: 4, suffix: '', label: '覆盖技术方向' },
    { icon: '🏫', number: null, text: '本科', label: '大数据管理与应用' },
    { icon: '📅', number: null, text: '2027', label: '应届毕业生' }
  ],

  radarSkills: [
    { name: '数据分析', level: 88, tags: ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn'] },
    { name: '大数据工程', level: 82, tags: ['Spark', 'Kafka', 'Hadoop', 'Redis', 'Flink'] },
    { name: 'AI/机器学习', level: 80, tags: ['YOLO', 'PyTorch', 'OpenCV', '通义千问'] },
    { name: '可视化', level: 90, tags: ['Streamlit', 'Altair', 'ECharts', 'Chart.js'] },
    { name: 'Web开发', level: 78, tags: ['Django', 'Flask', 'JavaScript', 'HTML/CSS'] }
  ],

  skillCategories: [
    {
      icon: '📊',
      title: '数据分析',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'SQL', level: 90 },
        { name: 'Pandas', level: 95 },
        { name: 'NumPy', level: 85 },
        { name: 'Scikit-learn', level: 80 }
      ]
    },
    {
      icon: '⚙️',
      title: '大数据工程',
      skills: [
        { name: 'Spark', level: 82 },
        { name: 'Kafka', level: 78 },
        { name: 'Hadoop', level: 75 },
        { name: 'Redis', level: 80 },
        { name: 'Flink', level: 60 }
      ]
    },
    {
      icon: '🧠',
      title: 'AI/深度学习',
      skills: [
        { name: 'YOLO', level: 88 },
        { name: 'PyTorch', level: 78 },
        { name: '通义千问', level: 82 },
        { name: 'OpenCV', level: 80 }
      ]
    },
    {
      icon: '📈',
      title: '可视化',
      skills: [
        { name: 'Streamlit', level: 92 },
        { name: 'Altair', level: 82 },
        { name: 'ECharts', level: 85 },
        { name: 'Chart.js', level: 75 }
      ]
    },
    {
      icon: '💻',
      title: 'Web开发',
      skills: [
        { name: 'Django', level: 82 },
        { name: 'Flask', level: 85 },
        { name: 'JavaScript', level: 78 },
        { name: 'HTML/CSS', level: 88 }
      ]
    }
  ],

  projects: [
    {
      id: 'ecommerce',
      icon: '📊',
      title: '电商实时数据分析系统',
      category: 'bigdata',
      shortDesc: '千万级数据实时处理与秒级仪表盘可视化',
      tags: ['Spark', 'Kafka', 'Redis', 'Streamlit'],
      imageEmoji: '📊',
      background: '传统电商数据分析存在T+1延迟问题，无法实时监控业务指标和用户行为变化。',
      goal: '构建端到端的实时数据处理Pipeline，实现PV/UV/转化率等核心指标的秒级计算与可视化展示。',
      tech: 'Kafka(数据采集) → Spark Structured Streaming(流计算) → Redis(缓存层) → Streamlit(Web仪表盘)',
      highlights: [
        'Watermark机制处理迟到数据，确保窗口统计准确性',
        'Redis ZSet实现TopN商品实时排行，支持千万级QPS',
        'Spark Join优化解决Update模式限制，实现PV+转化率联合计算',
        'Streamlit Web仪表盘2秒自动刷新，支持4个Tab多维分析'
      ]
    },
    {
      id: 'yolo',
      icon: '🤖',
      title: '基于YOLO的车牌检测与猫狗识别',
      category: 'ai',
      shortDesc: '深度学习目标检测双模型Web部署应用',
      tags: ['YOLO', 'Django', 'OpenCV', 'PyTorch'],
      imageEmoji: '🤖',
      background: '目标检测技术在安防和智慧城市领域广泛应用，车牌识别和宠物识别是典型的落地场景。',
      goal: '训练YOLO模型实现车牌定位识别和猫狗分类，并部署为可交互的Web应用。',
      tech: 'Ultralytics YOLO + Django REST API + OpenCV图像处理 + HTML/CSS/JS前端',
      highlights: [
        'CCPD数据集训练车牌检测模型，mAP达到78.0%',
        'Kaggle猫狗数据集60 epochs训练，320×320输入分辨率',
        'Base64编码实现前后端图像传输，降低网络开销',
        'B/S架构设计，支持拖拽上传和实时检测结果展示'
      ]
    },
    {
      id: 'chatbot',
      icon: '💬',
      title: '基于通义千问的智能对话机器人',
      category: 'ai',
      shortDesc: '大语言模型API流式对话与Prompt工程实践',
      tags: ['Qwen', 'Django', 'SSE', 'LLM'],
      imageEmoji: '💬',
      background: '大语言模型（LLM）正重塑人机交互方式，探索其在智能客服、教育辅导等场景的应用价值。',
      goal: '基于Qwen-Max构建支持流式/阻塞双模式的智能对话系统，优化用户体验。',
      tech: 'Django + DashScope API + Server-Sent Events(SSE) + System Prompt Engineering',
      highlights: [
        'SSE实现流式输出，首Token延迟<0.5s，接近ChatGPT体验',
        '双模式对比（Stream vs Block），灵活适配不同场景需求',
        'System Prompt精心设计，控制对话风格和回答质量',
        'Python Generator + yield实现高效的流式数据推送'
      ]
    },
    {
      id: 'traffic',
      icon: '🚗',
      title: '城市交通流量管控及优化策略',
      category: 'analysis',
      shortDesc: '86万+条交通轨迹数据的时空分析与优化建模',
      tags: ['Python', 'Folium', '时序分析', '供需模型'],
      imageEmoji: '🚗',
      background: '城市交通拥堵日益严重，需要数据驱动的精细化管控方案来提升通行效率。',
      goal: '对863,192条交通轨迹数据进行深度分析，识别拥堵根因并提出可落地的优化策略。',
      tech: 'Python Pandas + Sliding Window算法 + Folium热力图 + Demand-Supply模型',
      highlights: [
        '识别出20%车辆造成主要交通拥堵，提出针对性管控策略',
        'Sliding Window算法检测巡游车辆，O(n)时间复杂度',
        '优化后通行时间减少25%-39%，巡游行为降低25%',
        'KL散度验证空间分布显著性(p<0.01)，热力图直观呈现'
      ]
    },
    {
      id: 'environment',
      icon: '📈',
      title: '环保标准对中小企业生存压力分析',
      category: 'analysis',
      shortDesc: '计量经济学建模：Logistic+Cox回归因果推断',
      tags: ['Logistic', 'Cox回归', '统计检验', '因果推断'],
      imageEmoji: '📈',
      background: '环保政策趋严背景下，中小企业面临成本上升和生存压力增大的双重挑战。',
      goal: '运用计量经济学方法，量化评估环保标准提高对中小企业生存的具体影响。',
      tech: 'Logistic回归 + Cox比例风险模型 + Pearson相关性分析 + T检验 + 时间序列',
      highlights: [
        '环保标准提高导致企业成本显著上升112.3%(p<0.001)',
        '中小企业退出风险增加87%(OR=2.79)，置信区间稳健',
        'Pearson相关性揭示成本-生存的多维关系(r=-0.92~0.99)',
        'Cox模型验证生存曲线，为政策制定提供数据支撑'
      ]
    },
    {
      id: 'shopping',
      icon: '🛒',
      title: '购物分析网站',
      category: 'web',
      shortDesc: '电商用户行为分析与机器学习预测Web平台',
      tags: ['Flask', 'Plotly', 'RandomForest', 'KMeans'],
      imageEmoji: '🛒',
      background: '电商平台积累了海量用户行为数据，需要系统化的分析工具来挖掘商业价值。',
      goal: '构建一个完整的电商数据分析Web应用，支持文件上传、自动预处理、多维度分析和机器学习预测。',
      tech: 'Flask + Plotly可视化 + Scikit-learn(RF分类/KMeans聚类/PCA降维) + Pandas',
      highlights: [
        'RandomForest实现购物行为预测，自动特征工程Pipeline',
        'KMeans用户聚类分析，识别高价值客户群体',
        'PCA降维可视化，直观展示用户分群效果',
        '24小时智能缓存机制，减少重复计算提升响应速度'
      ]
    }
  ],

  chainData: [
    { icon: '📡', title: '数据采集', tools: 'Kafka\nFlume' },
    { icon: '💾', title: '数据存储', tools: 'Hadoop\nHDFS' },
    { icon: '⚡', title: '数据处理', tools: 'Spark\nFlink' },
    { icon: '🔍', title: '数据分析', tools: 'Python\nPandas\nSQL' },
    { icon: '🤖', title: 'AI建模', tools: 'YOLO\nQwen\nPyTorch' },
    { icon: '📊', title: '可视化', tools: 'Streamlit\nECharts\nAltair' },
    { icon: '💡', title: '决策', tools: '数据驱动\n业务价值' }
  ]
};
