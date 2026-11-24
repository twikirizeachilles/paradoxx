(() => {
  const root = document.documentElement;
  const langButton = document.querySelector('[data-legal-language]');
  const menuButton = document.querySelector('[data-legal-menu]');
  const mobileNav = document.querySelector('.legal-mobile-nav');
  const setLanguage = (lang) => {
    const next = lang === 'de' ? 'de' : 'en';
    root.lang = next;
    document.querySelectorAll('[data-en][data-de]').forEach((el) => { el.innerHTML = el.dataset[next]; });
    if (langButton) {
      langButton.innerHTML = next === 'en' ? '<strong>EN</strong> / DE' : 'EN / <strong>DE</strong>';
      langButton.setAttribute('aria-label', next === 'en' ? 'Switch language to German' : 'Sprache auf Englisch umstellen');
      langButton.setAttribute('aria-pressed', String(next === 'de'));
    }
    try { localStorage.setItem('paradoxx-language', next); } catch (_) {}
  };
  let initial = 'en';
  try { initial = localStorage.getItem('paradoxx-language') || 'en'; } catch (_) {}
  setLanguage(initial);
  langButton?.addEventListener('click', () => setLanguage(root.lang === 'en' ? 'de' : 'en'));
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    mobileNav?.classList.toggle('open', open);
    if (mobileNav) mobileNav.hidden = !open;
  });
  document.querySelectorAll('[data-current-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
