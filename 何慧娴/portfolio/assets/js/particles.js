/* ============================================================
   Particles.js — Canvas粒子背景
   深色背景上缓慢漂浮的粒子网络，模拟数据节点连接
   ============================================================ */

class ParticleBackground {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 100;
    this.connectionDistance = 150;
    this.mouseInteractionDistance = 180;
    this.mouse = { x: null, y: null };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const particleColor = isLight ? 'rgba(0, 150, 200, 0.4)' : 'rgba(0, 212, 255, 0.4)';
    const lineColor = isLight ? 'rgba(0, 150, 200, 0.08)' : 'rgba(0, 212, 255, 0.08)';

    // 更新和绘制粒子
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // 移动
      p.x += p.vx;
      p.y += p.vy;

      // 边界反弹
      if (p.x <= 0 || p.x >= this.canvas.width) p.vx *= -1;
      if (p.y <= 0 || p.y >= this.canvas.height) p.vy *= -1;

      // 鼠标交互 - 靠近鼠标的粒子被轻微吸引
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouseInteractionDistance) {
          const force = (1 - dist / this.mouseInteractionDistance) * 0.03;
          p.vx += dx * force;
          p.vy += dy * force;
          // 限制最大速度
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.5) {
            p.vx = (p.vx / speed) * 1.5;
            p.vy = (p.vy / speed) * 1.5;
          }
        }
      }

      // 绘制粒子
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particleColor.replace('0.4', String(p.opacity));
      this.ctx.fill();

      // 绘制连线
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          const alpha = (1 - dist / this.connectionDistance) * 0.08;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = lineColor.replace('0.08', String(alpha));
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  new ParticleBackground();
});
