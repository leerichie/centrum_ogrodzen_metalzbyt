(function () {
  const MIN_ZOOM = 80;   // in perc. %
  const MAX_ZOOM = 160;
  const STEP = 10;
  const STORAGE_KEY_ZOOM = 'site_zoom_percent';
  const STORAGE_KEY_INVERT = 'site_color_invert';

  const htmlEl = document.documentElement;
  const widget = document.querySelector('.accessibility-widget');

  if (!widget) return;

  const toggleBtn = widget.querySelector('.acc-toggle');
  const panel = widget.querySelector('#acc-panel');
  const zoomLabel = widget.querySelector('#acc-zoom-label');
  const btnBigger = widget.querySelector('.acc-btn--bigger');
  const btnSmaller = widget.querySelector('.acc-btn--smaller');
  const btnReset = widget.querySelector('.acc-btn--reset');
  const btnInvert = widget.querySelector('.acc-btn--invert');

  if (!toggleBtn || !panel || !zoomLabel || !btnBigger || !btnSmaller || !btnReset || !btnInvert) {
    return;
  }

  let zoom = parseInt(localStorage.getItem(STORAGE_KEY_ZOOM), 10);
  if (isNaN(zoom)) zoom = 100;
  applyZoom(zoom);

  const isInvertedStored = localStorage.getItem(STORAGE_KEY_INVERT) === '1';
  if (isInvertedStored) {
    htmlEl.classList.add('color-invert');
  }

  // tap toggle
  function setPanelOpen(open) {
    widget.classList.toggle('accessibility-widget--open', open);
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggleBtn.setAttribute(
      'aria-label',
      open ? 'Zamknij ustawienia dostępności' : 'Otwórz ustawienia dostępności'
    );
  }

  toggleBtn.addEventListener('click', function () {
    const isOpen = widget.classList.contains('accessibility-widget--open');
    setPanelOpen(!isOpen);
  });

  panel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setPanelOpen(false);
      toggleBtn.focus();
    }
  });

  function applyZoom(value) {
    zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
    htmlEl.style.fontSize = zoom + '%';
    zoomLabel.textContent = zoom + '%';
    localStorage.setItem(STORAGE_KEY_ZOOM, String(zoom));
  }

  btnBigger.addEventListener('click', function () {
    applyZoom(zoom + STEP);
  });

  btnSmaller.addEventListener('click', function () {
    applyZoom(zoom - STEP);
  });

  btnReset.addEventListener('click', function () {
    applyZoom(100);
  });

  btnInvert.addEventListener('click', function () {
    const nowInverted = !htmlEl.classList.contains('color-invert');
    htmlEl.classList.toggle('color-invert', nowInverted);
    localStorage.setItem(STORAGE_KEY_INVERT, nowInverted ? '1' : '0');
  });
})();
