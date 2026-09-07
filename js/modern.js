/*!
 * modern.js — 主题增强(2026 美化)
 * 亮/暗主题切换 · 滚动显现 · 代码复制 · 图片灯箱 · 回到顶部
 * 全部为渐进增强:JS 失败不影响阅读
 */
(function () {
    var html = document.documentElement;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 亮/暗主题切换 ---------- */
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.title = '切换亮色 / 暗色主题';
    btn.setAttribute('aria-label', '切换亮色 / 暗色主题');
    btn.innerHTML =
        '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
        '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>' +
        '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
        '<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>' +
        '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

    btn.addEventListener('click', function () {
        var dark = !html.classList.contains('dark');
        html.classList.toggle('dark', dark);
        html.classList.toggle('light', !dark);
        try {
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        } catch (e) { /* 隐私模式下忽略 */ }
    });

    /* ---------- 回到顶部 ---------- */
    var backtop = document.createElement('button');
    backtop.className = 'backtop';
    backtop.type = 'button';
    backtop.title = '回到顶部';
    backtop.setAttribute('aria-label', '回到顶部');
    backtop.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';

    var toggleShown = false;
    backtop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });

    window.addEventListener('scroll', function () {
        var show = window.scrollY > 480;
        if (show !== toggleShown) {
            toggleShown = show;
            backtop.classList.toggle('show', show);
        }
    }, { passive: true });

    /* ---------- 滚动显现 ---------- */
    function setupReveal() {
        if (reducedMotion || !('IntersectionObserver' in window)) return;
        var targets = document.querySelectorAll(
            '.post-preview, .sidebar-container section, .pager, footer .container'
        );
        if (!targets.length) return;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
        targets.forEach(function (el) {
            el.classList.add('reveal');
            io.observe(el);
        });
    }

    /* ---------- 代码块复制按钮 ---------- */
    function legacyCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        ta.remove();
        return ok;
    }

    function copyTextToClipboard(text, onDone) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(onDone).catch(function () {
                if (legacyCopy(text)) onDone();
            });
        } else if (legacyCopy(text)) {
            onDone();
        }
    }

    function setupCopyButtons() {
        var blocks = document.querySelectorAll('.highlight');
        if (!blocks.length) return;
        blocks.forEach(function (block) {
            var pre = block.querySelector('pre');
            if (!pre) return;
            var b = document.createElement('button');
            b.className = 'copy-btn';
            b.type = 'button';
            b.textContent = '复制';
            b.addEventListener('click', function () {
                copyTextToClipboard(pre.innerText, function () {
                    b.textContent = '已复制';
                    b.classList.add('copied');
                    setTimeout(function () {
                        b.textContent = '复制';
                        b.classList.remove('copied');
                    }, 1600);
                });
            });
            block.appendChild(b);
        });
    }

    /* ---------- 图片灯箱 ---------- */
    function setupLightbox() {
        var overlay = null;

        function close() {
            if (overlay) {
                overlay.remove();
                overlay = null;
                document.body.style.overflow = '';
            }
        }

        document.addEventListener('click', function (e) {
            var img = e.target;
            if (!img || img.tagName !== 'IMG') return;
            if (!img.closest || !img.closest('.post-container')) return;

            e.preventDefault();
            overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-label', '图片预览,点击关闭');
            var clone = document.createElement('img');
            clone.src = img.currentSrc || img.src;
            clone.alt = img.alt || '';
            overlay.appendChild(clone);
            overlay.addEventListener('click', close);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });
    }

    /* ---------- 挂载 ---------- */
    function mount() {
        document.body.appendChild(btn);
        document.body.appendChild(backtop);
        setupReveal();
        setupCopyButtons();
        setupLightbox();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();
