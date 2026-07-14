/* ============================================================
   Animations.js — Intersection Observer 滚动动画
   支持动态添加的元素重新观察
   ============================================================ */

let revealObserver = null;

function initScrollAnimations() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });
  }

  document.querySelectorAll('.reveal:not(.observed)').forEach(el => {
    el.classList.add('observed');
    revealObserver.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});
