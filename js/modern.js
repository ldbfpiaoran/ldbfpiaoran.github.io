/*!
 * modern.js — 亮/暗主题切换(2026 美化)
 * 默认跟随系统;点击右下角按钮手动切换,选择存入 localStorage
 */
(function () {
    var html = document.documentElement;

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

    function mount() {
        document.body.appendChild(btn);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }

    btn.addEventListener('click', function () {
        var dark = !html.classList.contains('dark');
        html.classList.toggle('dark', dark);
        html.classList.toggle('light', !dark);
        try {
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        } catch (e) { /* 隐私模式下忽略 */ }
    });
})();
