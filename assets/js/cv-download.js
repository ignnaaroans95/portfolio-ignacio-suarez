(function () {
  'use strict';

  const BASE = (function () {
    // Detect path depth so asset URLs are always correct
    const depth = location.pathname.split('/').filter(Boolean).length;
    return depth > 1 ? '../'.repeat(depth - 1) : '';
  })();

  const POPUP_HTML = `
<div id="cv-popup-overlay" class="cv-popup-overlay" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Descargar CV">
  <div class="cv-popup">
    <button class="cv-popup__close" aria-label="Cerrar">✕</button>
    <div class="cv-popup__header">
      <div class="cv-popup__icon"><i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i></div>
      <h3 class="cv-popup__title">Descargar CV</h3>
      <p class="cv-popup__subtitle">Elige el idioma del currículum</p>
    </div>
    <div class="cv-popup__options">
      <a href="assets/cv/CV_Ignacio_ES_v2%20(2).pdf"
         download="CV_Ignacio_Suarez_ES.pdf"
         class="cv-popup__option">
        <span class="cv-popup__flag" aria-hidden="true">🇪🇸</span>
        <div class="cv-popup__option-info">
          <strong>Español</strong>
          <span>CV · Desarrollador Full Stack</span>
        </div>
        <i class="fa-solid fa-arrow-down cv-popup__dl-icon" aria-hidden="true"></i>
      </a>
      <a href="assets/cv/CV_Ignacio_FullStack_v2%20(1).pdf"
         download="CV_Ignacio_Suarez_EN.pdf"
         class="cv-popup__option">
        <span class="cv-popup__flag" aria-hidden="true">🇬🇧</span>
        <div class="cv-popup__option-info">
          <strong>English</strong>
          <span>CV · Full Stack Developer</span>
        </div>
        <i class="fa-solid fa-arrow-down cv-popup__dl-icon" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</div>`;

  function getOverlay() { return document.getElementById('cv-popup-overlay'); }

  function openCvPopup() {
    const overlay = getOverlay();
    if (!overlay) return;
    overlay.classList.add('cv-popup-overlay--visible');
    overlay.setAttribute('aria-hidden', 'false');
    overlay.querySelector('.cv-popup__close').focus();
  }

  function closeCvPopup() {
    const overlay = getOverlay();
    if (!overlay) return;
    overlay.classList.remove('cv-popup-overlay--visible');
    overlay.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('beforeend', POPUP_HTML);
    const overlay = getOverlay();

    overlay.querySelector('.cv-popup__close').addEventListener('click', closeCvPopup);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeCvPopup();
    });
    overlay.querySelectorAll('.cv-popup__option').forEach(function (a) {
      a.addEventListener('click', function () { setTimeout(closeCvPopup, 300); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCvPopup();
    });
  });

  // Expose globally so onclick="openCvPopup()" works
  window.openCvPopup = openCvPopup;
  window.closeCvPopup = closeCvPopup;
})();
