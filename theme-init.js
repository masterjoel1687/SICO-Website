/* ============================================================
   EC & CCAC — PRE-PAINT THEME INITIALIZER
   Load this BEFORE styles.css in every page's <head>.
   Prevents the "dark → light" flash on page load.
   ============================================================ */

(function () {
    try {
        var theme = localStorage.getItem('sico_theme') ||
                    localStorage.getItem('sico_editorial_theme') ||
                    'dark';

        if (theme === 'light' || theme === 'champagne') {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.style.backgroundColor = '#fbf9f4';
        } else {
            document.documentElement.style.backgroundColor = '#0c0f17';
        }
    } catch (e) {
        /* storage blocked — default to dark */
    }
})();