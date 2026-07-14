/* ============================================================
   Projects.js — 项目筛选与模态框
   ============================================================ */

class ProjectManager {
  constructor() {
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card-detailed');
    this.modalOverlay = document.querySelector('.modal-overlay');
    this.currentProjectIndex = 0;
    this.init();
  }

  init() {
    this.bindFilters();
    this.bindCards();
    this.bindModalClose();
  }

  bindFilters() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        this.projectCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('filtered-out');
          } else {
            card.classList.add('filtered-out');
          }
        });
      });
    });
  }

  bindCards() {
    this.projectCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        this.currentProjectIndex = index;
        this.openModal(PORTFOLIO_DATA.projects[index]);
      });
    });
  }

  openModal(project) {
    if (!this.modalOverlay) return;

    const idx = PORTFOLIO_DATA.projects.indexOf(project);
    const total = PORTFOLIO_DATA.projects.length;

    this.modalOverlay.innerHTML = `
      <div class="modal">
        <button class="modal-close">✕</button>
        <div class="modal-body">
          <div class="modal-header">
            <h2>${project.icon} ${project.title}</h2>
            <div class="tags">
              ${project.tags.map(t => {
                const tagClass = ['Spark','Kafka','Redis','Hadoop'].includes(t) ? 'tag-purple' :
                                 ['YOLO','PyTorch','OpenCV','Qwen','LLM'].includes(t) ? 'tag-orange' :
                                 'tag';
                return `<span class="tag ${tagClass}">${t}</span>`;
              }).join('')}
            </div>
          </div>

          <div class="modal-grid">
            <div class="modal-info-card">
              <div class="icon">📋</div>
              <h4>项目背景</h4>
              <p>${project.background}</p>
            </div>
            <div class="modal-info-card">
              <div class="icon">🎯</div>
              <h4>目标</h4>
              <p>${project.goal}</p>
            </div>
            <div class="modal-info-card">
              <div class="icon">🛠</div>
              <h4>技术方案</h4>
              <p>${project.tech}</p>
            </div>
          </div>

          <div class="modal-highlights">
            <h3>📊 核心亮点</h3>
            <ul>
              ${project.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>

          <div class="modal-nav">
            <button class="prev-btn" ${idx === 0 ? 'style="visibility:hidden"' : ''}>
              ← 上一个项目
            </button>
            <button class="next-btn" ${idx === total - 1 ? 'style="visibility:hidden"' : ''}>
              下一个项目 →
            </button>
          </div>
        </div>
      </div>
    `;

    this.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 绑定导航按钮
    const prevBtn = this.modalOverlay.querySelector('.prev-btn');
    const nextBtn = this.modalOverlay.querySelector('.next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentProjectIndex > 0) {
          this.currentProjectIndex--;
          this.openModal(PORTFOLIO_DATA.projects[this.currentProjectIndex]);
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentProjectIndex < total - 1) {
          this.currentProjectIndex++;
          this.openModal(PORTFOLIO_DATA.projects[this.currentProjectIndex]);
        }
      });
    }

    this.bindModalClose();
  }

  bindModalClose() {
    if (!this.modalOverlay) return;

    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay || e.target.classList.contains('modal-close')) {
        this.closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOverlay.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    if (!this.modalOverlay) return;
    this.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 不再自动初始化，由 projects.html 中渲染完卡片后手动调用
// document.addEventListener('DOMContentLoaded', () => {
//   new ProjectManager();
// });
