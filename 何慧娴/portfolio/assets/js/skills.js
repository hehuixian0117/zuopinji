/* ============================================================
   Skills.js — 技能进度条动画 + 技术生态图
   ============================================================ */

class SkillsPage {
  constructor() {
    this.init();
  }

  init() {
    this.observeSkillBars();
    this.initEcoSystem();
  }

  observeSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.getAttribute('data-width') + '%';
          entry.target.style.width = targetWidth;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
  }

  initEcoSystem() {
    const canvas = document.getElementById('ecosystem-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 450;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // 中心节点
    const center = { x: cx, y: cy, label: '大数据管理\n与应用', radius: 45 };

    // 外围节点
    const nodes = [
      { angle: -90, dist: 160, label: '数据分析', icon: '📊', skills: ['Python','SQL','Pandas'] },
      { angle: -18, dist: 170, label: 'AI/深度学习', icon: '🧠', skills: ['YOLO','PyTorch','Qwen'] },
      { angle: 54, dist: 165, label: '大数据工程', icon: '⚙️', skills: ['Spark','Kafka','Redis'] },
      { angle: 126, dist: 170, label: '可视化', icon: '📈', skills: ['Streamlit','ECharts'] },
      { angle: 198, dist: 160, label: 'Web开发', icon: '💻', skills: ['Django','Flask'] }
    ];

    // 绘制连线
    nodes.forEach(node => {
      const nx = cx + node.dist * Math.cos(node.angle * Math.PI / 180);
      const ny = cy + node.dist * Math.sin(node.angle * Math.PI / 180);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = isLight ? 'rgba(0, 180, 220, 0.2)' : 'rgba(0, 212, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 虚线流动效果
      ctx.setLineDash([5, 10]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = isLight ? 'rgba(0, 180, 220, 0.1)' : 'rgba(0, 212, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 绘制中心节点
    ctx.beginPath();
    ctx.arc(cx, cy, center.radius, 0, Math.PI * 2);
    const centerGrad = ctx.createLinearGradient(cx - 45, cy, cx + 45, cy);
    centerGrad.addColorStop(0, '#00d4ff');
    centerGrad.addColorStop(1, '#7c3aed');
    ctx.fillStyle = centerGrad;
    ctx.fill();
    ctx.strokeStyle = isLight ? '#fff' : '#0a0e1a';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    const centerLines = center.label.split('\n');
    ctx.fillText(centerLines[0], cx, cy - 3);
    ctx.fillText(centerLines[1], cx, cy + 15);

    // 绘制外围节点
    nodes.forEach(node => {
      const nx = cx + node.dist * Math.cos(node.angle * Math.PI / 180);
      const ny = cy + node.dist * Math.sin(node.angle * Math.PI / 180);

      ctx.beginPath();
      ctx.arc(nx, ny, 38, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? '#ffffff' : '#111827';
      ctx.fill();
      ctx.strokeStyle = isLight ? 'rgba(0, 180, 220, 0.5)' : 'rgba(0, 212, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.icon, nx, ny - 3);

      ctx.font = 'bold 11px "Noto Sans SC", "Microsoft YaHei", sans-serif';
      ctx.fillStyle = isLight ? '#1e293b' : '#e2e8f0';
      ctx.fillText(node.label, nx, ny + 18);

      // 技能小字
      ctx.font = '10px "Noto Sans SC", "Microsoft YaHei", sans-serif';
      ctx.fillStyle = isLight ? '#64748b' : '#94a3b8';
      ctx.fillText(node.skills.join(' · '), nx, ny + 34);
    });

    // 存储点击区域
    canvas._nodes = nodes.map(n => ({
      ...n,
      x: cx + n.dist * Math.cos(n.angle * Math.PI / 180),
      y: cy + n.dist * Math.sin(n.angle * Math.PI / 180)
    }));
  }
}

// SkillsPage now exported for manual initialization after DOM is rendered
// Usage: setTimeout(() => new SkillsPage(), 50);

