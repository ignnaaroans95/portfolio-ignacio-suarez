/**
 * Sidebar component — injected via JS to eliminate duplication across pages.
 * Usage: <aside data-sidebar data-active="home"></aside>
 * Valid data-active values: home, about, curriculum, portfolio, contact
 */
(function () {
  const NAV_ITEMS = [
    { id: 'home',       href: 'index.html',      icon: 'fa-house',          label: 'Home' },
    { id: 'about',      href: 'sobre-mi.html',   icon: 'fa-user',           label: 'Sobre m\u00ed' },
    { id: 'curriculum', href: 'curriculum.html',  icon: 'fa-graduation-cap', label: 'Curriculum' },
    { id: 'portfolio',  href: 'portafolio.html',  icon: 'fa-briefcase',      label: 'Portafolio' },
    { id: 'contact',    href: 'contacto.html',    icon: 'fa-envelope',       label: 'Contacto' }
  ];

  const SOCIAL_LINKS = [
    { href: 'https://www.linkedin.com/in/ignacio-su%C3%A1rez-ruiz-94105630a/', icon: 'fa-brands fa-linkedin' },
    { href: 'https://github.com/ignnaaroans95/ignnaaroans95', icon: 'fa-brands fa-github' }
  ];

  function buildSidebar(activePage) {
    const navItems = NAV_ITEMS.map(item => {
      const active = item.id === activePage ? ' menu__link--active' : '';
      return `<li class="menu__option">
        <a href="${item.href}" class="menu__link${active}">
          <i class="fa-solid ${item.icon} menu__icon"></i>
          <span class="menu__overlay">${item.label}</span>
        </a>
      </li>`;
    }).join('\n');

    const socialItems = SOCIAL_LINKS.map(link =>
      `<li class="social__option">
        <a href="${link.href}" class="social__link" target="_blank" rel="noopener">
          <i class="social__icon ${link.icon}"></i>
        </a>
      </li>`
    ).join('\n');

    return `<section class="aside__user-info">
  <div class="user-info__general aside-stagger">
    <div class="user-info__container-image">
      <img src="assets/img/fotoigna.jpg"
           alt="Ignacio Su\u00e1rez, Desarrollador Full Stack"
           class="user-info__image" width="200" height="200"
           loading="eager">
    </div>
    <h2 class="user-info__name">Ignacio Suarez</h2>
    <h4 class="user-info__job">Desarrollador Full Stack</h4>
  </div>

  <nav class="layout__menu aside-stagger">
    <ul class="menu__list">
      ${navItems}
    </ul>
  </nav>

  <div class="user-info__links aside-stagger">
    <ul class="links__social">
      ${socialItems}
    </ul>
  </div>

  <div class="user-info__buttons aside-stagger">
    <button class="user-info__btn" onclick="openCvPopup()">Descargar CV</button>
  </div>

  <footer class="user-info__footer aside-stagger">
    &copy; ${new Date().getFullYear()} Ignacio Suarez Ruiz
  </footer>
</section>`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const aside = document.querySelector('[data-sidebar]');
    if (!aside) return;
    aside.classList.add('layout__aside');
    aside.innerHTML = buildSidebar(aside.dataset.active || 'home');
  });
})();
