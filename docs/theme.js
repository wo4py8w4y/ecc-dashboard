(function (root) {
  'use strict';
  const key = 'ecc-theme-preferences:' + root.location.pathname.replace(/[^/]*$/, '');
  function luminance(hex) {
    const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  }
  function background(theme, force) {
    if (!force) return theme.background;
    return Object.values(theme).filter(v => typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v))
      .reduce((a, b) => luminance(b) < luminance(a) ? b : a, theme.background);
  }
  function init(doc, storage, themes) {
    const select = doc.querySelector('#eccTheme');
    const checkbox = doc.querySelector('#forceDarkestBackground');
    const status = doc.querySelector('#themeStatus');
    const state = { theme: 'Original prototype', forceDarkestBackground: true };
    let extra = {};
    try {
      const saved = JSON.parse(storage.getItem(key));
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        extra = saved;
        if (themes.some(t => t.name === saved.theme)) state.theme = saved.theme;
        if (typeof saved.forceDarkestBackground === 'boolean') state.forceDarkestBackground = saved.forceDarkestBackground;
      }
    } catch (_) { /* Storage may be unavailable or contain invalid JSON. */ }
    themes.forEach(t => { const o = doc.createElement('option'); o.value = t.name; o.textContent = t.name; select.appendChild(o); });
    select.value = state.theme;
    checkbox.checked = state.forceDarkestBackground;
    function apply(persist, themeChange = true) {
      state.theme = select.value;
      state.forceDarkestBackground = checkbox.checked;
      const theme = themes.find(t => t.name === state.theme) || themes[0];
      const style = doc.documentElement.style;
      const bg = background(theme, checkbox.checked);
      const ratio = (Math.max(luminance(bg), luminance(theme.foreground)) + .05) /
        (Math.min(luminance(bg), luminance(theme.foreground)) + .05);
      const foreground = ratio >= 4.5 ? theme.foreground : (luminance(bg) > .179 ? '#111111' : '#ffffff');
      style.setProperty('--site-background', bg);
      style.setProperty('--site-secondary', theme.black);
      const secondaryRatio = (Math.max(luminance(theme.black), luminance(theme.foreground)) + .05) /
        (Math.min(luminance(theme.black), luminance(theme.foreground)) + .05);
      style.setProperty('--site-on-secondary', secondaryRatio >= 4.5 ? theme.foreground :
        (luminance(theme.black) > .179 ? '#111111' : '#ffffff'));
      style.setProperty('--site-on-background', foreground);
      if (themeChange) {
        style.setProperty('--site-primary', theme.blue);
        style.setProperty('--site-on-primary', luminance(theme.blue) > .45 ? '#111111' : '#ffffff');
        doc.querySelector('#primaryColor').value = theme.blue;
      }
      doc.documentElement.dataset.eccTheme = theme.name;
      doc.documentElement.style.colorScheme = luminance(background(theme, checkbox.checked)) > .45 ? 'light' : 'dark';
      status.textContent = 'Background: ' + background(theme, checkbox.checked);
      if (persist) {
        try { storage.setItem(key, JSON.stringify({ ...extra, ...state })); }
        catch (_) { status.textContent += ' · Browser storage unavailable; preference applies to this page only.'; }
      }
    }
    select.addEventListener('change', () => apply(true));
    checkbox.addEventListener('change', () => apply(true, false));
    // Synchronise controls if another tab changes the preference.
    if (root.addEventListener) root.addEventListener('storage', e => {
      if (e.key !== key || !e.newValue) return;
      try {
        const saved = JSON.parse(e.newValue);
        if (themes.some(t => t.name === saved.theme)) select.value = saved.theme;
        if (typeof saved.forceDarkestBackground === 'boolean') checkbox.checked = saved.forceDarkestBackground;
        extra = saved;
        apply(false);
      } catch (_) {}
    });
    apply(false);
  }
  const api = { luminance, background, init };
  if (typeof module !== 'undefined') module.exports = api;
  root.ECCTheme = api;
})(typeof window === 'undefined' ? globalThis : window);
