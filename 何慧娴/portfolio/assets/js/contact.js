/* ============================================================
   Contact.js — 联系页交互
   - 邮箱/电话点击复制
   - 表单提交模拟
   ============================================================ */

class ContactPage {
  constructor() {
    this.init();
  }

  init() {
    this.bindCopyButtons();
    this.bindForm();
  }

  bindCopyButtons() {
    document.querySelectorAll('.copyable').forEach(el => {
      el.addEventListener('click', () => {
        const text = el.getAttribute('data-copy');
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
          const hint = el.querySelector('.copy-hint');
          if (hint) {
            const originalText = hint.textContent;
            hint.textContent = '✅ 已复制！';
            hint.style.opacity = '1';
            setTimeout(() => {
              hint.textContent = originalText;
              hint.style.opacity = '0';
            }, 2000);
          }
        }).catch(() => {
          // fallback
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        });
      });
    });
  }

  bindForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // 模拟提交
      const btn = form.querySelector('.btn-primary');
      const originalText = btn.textContent;
      btn.textContent = '⏳ 发送中...';
      btn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        const success = document.getElementById('form-success');
        if (success) {
          success.classList.add('active');
        }
      }, 1500);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ContactPage();
});
