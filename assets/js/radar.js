/* ============================================================
   Radar.js — Canvas 技能雷达图
   首页核心能力五边形雷达图 + 技能标签联动
   ============================================================ */

class RadarChart {
  constructor() {
    this.canvas = document.getElementById('radar-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.data = PORTFOLIO_DATA.radarSkills;
    this.levels = [0.2, 0.4, 0.6, 0.8, 1.0];
    this.animationProgress = 0;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    const container = this.canvas.parentElement;
    const size = Math.min(container.clientWidth, 400);
    this.canvas.width = size;
    this.canvas.height = size;
    this.centerX = size / 2;
    this.centerY = size / 2;
    this.radius = size * 0.35;
    this.draw();
  }

  getPoint(index, value, radius) {
    const angle = (Math.PI * 2 / this.data.length) * index - Math.PI / 2;
    const r = radius * value;
    return {
      x: this.centerX + r * Math.cos(angle),
      y: this.centerY + r * Math.sin(angle),
      angle: angle
    };
  }

  animate() {
    this.animationProgress += 0.02;
    if (this.animationProgress > 1) this.animationProgress = 1;

    this.draw();

    if (this.animationProgress < 1) {
      requestAnimationFrame(() => this.animate());
    }
  }

  draw() {
    const ctx = this.ctx;
    const { centerX, centerY, radius } = this;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const gridColor = isLight ? 'rgba(100, 116, 139, 0.2)' : 'rgba(255, 255, 255, 0.1)';
    const labelColor = isLight ? '#475569' : '#94a3b8';
    const fillColor = isLight ? 'rgba(0, 180, 220, 0.15)' : 'rgba(0, 212, 255, 0.15)';
    const strokeColor = isLight ? 'rgba(0, 180, 220, 0.8)' : 'rgba(0, 212, 255, 0.8)';
    const dotColor = isLight ? '#00b4dc' : '#00d4ff';

    // 绘制网格
    for (let level of this.levels) {
      ctx.beginPath();
      for (let i = 0; i < this.data.length; i++) {
        const point = this.getPoint(i, level, radius);
        if (i === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      }
      ctx.closePath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 绘制轴线
    for (let i = 0; i < this.data.length; i++) {
      const point = this.getPoint(i, 1, radius);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(point.x, point.y);
      ctx.strokeStyle = gridColor;
      ctx.stroke();
    }

    // 绘制数据区域
    const animatedData = this.data.map(d => d.level / 100 * this.animationProgress);
    ctx.beginPath();
    for (let i = 0; i < animatedData.length; i++) {
      const point = this.getPoint(i, animatedData[i], radius);
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 绘制数据点
    for (let i = 0; i < animatedData.length; i++) {
      const point = this.getPoint(i, animatedData[i], radius);
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = dotColor.replace(')', ', 0.3)');
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 绘制标签
    ctx.font = '13px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = labelColor;

    for (let i = 0; i < this.data.length; i++) {
      const point = this.getPoint(i, 1.2, radius);
      ctx.fillText(this.data[i].name, point.x, point.y + 5);
    }

    // 中心百分比
    const avgLevel = Math.round(this.data.reduce((s, d) => s + d.level, 0) / this.data.length);
    ctx.font = 'bold 28px "JetBrains Mono", monospace';
    ctx.fillStyle = strokeColor;
    ctx.fillText(`${avgLevel}%`, centerX, centerY - 4);
    ctx.font = '12px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('综合能力', centerX, centerY + 16);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RadarChart();
});
