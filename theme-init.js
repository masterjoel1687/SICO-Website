/* ============================================================
   SICO — PRE-PAINT THEME & FIRST-VISIT LOADER INITIALIZER
   Runs synchronously in <head> to prevent theme & loader flash
   ============================================================ */
(function () {
    try {
        // 1. Apply saved Light/Dark theme before first paint
        const storedTheme =
            localStorage.getItem('sico_theme') ||
            localStorage.getItem('sico_editorial_theme') ||
            localStorage.getItem('sico_cyber_theme') ||
            'dark';

        if (storedTheme === 'light' || storedTheme === 'champagne') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    } catch (e) {}

    try {
        // 2. Skip 5-second loader on subsequent page switches in this session
        if (sessionStorage.getItem('sico_loader_shown') === 'true') {
            document.documentElement.classList.add('skip-sico-loader');
        }
    } catch (e) {}
})();