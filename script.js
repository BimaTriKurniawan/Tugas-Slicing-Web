/* =====================================================
    DARK MODE
   ===================================================== */
(() => {
    const STORAGE_KEY = "theme";
    const root = document.documentElement;
    const toggle = document.getElementById("theme-toggle");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // localStorage bisa gagal (mode privat, dll.), jadi dibungkus try/catch
    function getSavedTheme() {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        return value === "dark" || value === "light" ? value : null;
    } catch {
        return null;
    }
    }

    function saveTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
    }
    }

    function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    if (toggle) {
        const label =
        theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap";
        toggle.setAttribute("aria-label", label);
        toggle.setAttribute("title", label);
    }
    }

  // Tema awal: pilihan tersimpan, kalau belum ada -> terang
    applyTheme(root.getAttribute("data-theme") || getSavedTheme() || "light");

  // Klik tombol -> ganti tema
    if (toggle) {
    toggle.addEventListener("click", () => {
        const nextTheme =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";

      // transisi warna halus, dilewati kalau pengguna minta animasi dikurangi
        if (!reduceMotion.matches) {
        root.classList.add("theme-transition");
        setTimeout(() => root.classList.remove("theme-transition"), 350);
        }

        applyTheme(nextTheme);
        saveTheme(nextTheme);
    });
    }
})();

