/* ============================================================
   Nav.js — 导航栏交互
   - 滚动时背景模糊
   - 当前页面高亮
   - 移动端汉堡菜单
   - 主题切换
   ============================================================ */

class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.hamburger = document.querySelector('.hamburger');
    this.mobileNav = document.querySelector('.mobile-nav');
    this.themeToggle = document.querySelector('.theme-toggle');
    this.init();
  }

  init() {
    this.bindScroll();
    this.highlightCurrentPage();
    this.bindHamburger();
    this.bindThemeToggle();
    this.bindMobileNavLinks();
  }

  bindScroll() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
          } else {
            this.navbar.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  highlightCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    const links = document.querySelectorAll('.nav-links a, .mobile-nav a');

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const hrefPage = href.replace('.html', '');
        if ((page === 'index' && href === '#') || hrefPage === page) {
          link.classList.add('active');
        }
      }
    });
  }

  bindHamburger() {
    if (!this.hamburger || !this.mobileNav) return;

    const toggleMenu = () => {
      this.hamburger.classList.toggle('active');
      this.mobileNav.classList.toggle('active');
      document.body.style.overflow = this.mobileNav.classList.contains('active') ? 'hidden' : '';
    };

    this.hamburger.addEventListener('click', toggleMenu);
  }

  bindThemeToggle() {
    if (!this.themeToggle) return;

    // 读取保存的主题
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);

    this.themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      this.updateThemeIcon(next);
    });
  }

  updateThemeIcon(theme) {
    if (!this.themeToggle) return;
    this.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  bindMobileNavLinks() {
    if (!this.mobileNav) return;
    const links = this.mobileNav.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        this.mobileNav.classList.remove('active');
        if (this.hamburger) this.hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});
