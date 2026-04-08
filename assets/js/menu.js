/**
 * Mobile menu toggle with stagger entrance animation.
 * Elements inside the sidebar animate in sequentially when opened.
 */
document.addEventListener('DOMContentLoaded', function () {
  var button = document.querySelector('.layout__menu-toggle');
  var iconBars = document.querySelector('.layout__menu-toggle .fa-bars');
  var iconXmark = document.querySelector('.layout__menu-toggle .fa-xmark');
  var aside = document.querySelector('.layout__aside');
  if (!button || !aside) return;

  var isOpen = false;

  function open() {
    isOpen = true;
    aside.classList.add('layout__aside--visible');
    aside.classList.remove('layout__aside--hidden');
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Cerrar menú');
    iconBars.style.opacity = '0';
    iconBars.style.transform = 'rotate(90deg)';
    iconXmark.style.opacity = '1';
    iconXmark.style.transform = 'rotate(0deg)';
    staggerIn();
  }

  function close() {
    isOpen = false;
    aside.classList.remove('layout__aside--visible');
    aside.classList.add('layout__aside--hidden');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menú');
    iconBars.style.opacity = '1';
    iconBars.style.transform = 'rotate(0deg)';
    iconXmark.style.opacity = '0';
    iconXmark.style.transform = 'rotate(-90deg)';
    resetStagger();
  }

  function staggerIn() {
    var targets = aside.querySelectorAll('.aside-stagger');
    targets.forEach(function (el, i) {
      el.classList.remove('is-in');
      setTimeout(function () {
        el.classList.add('is-in');
      }, 80 + i * 50);
    });
  }

  function resetStagger() {
    aside.querySelectorAll('.aside-stagger').forEach(function (el) {
      el.classList.remove('is-in');
    });
  }

  button.addEventListener('click', function () {
    if (isOpen) close(); else open();
  });

  window.addEventListener('resize', function () {
    if (document.body.clientWidth > 1060 && isOpen) close();
  });
});
