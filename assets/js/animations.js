/**
 * Scroll-triggered animations using IntersectionObserver.
 * Elements with [data-animate] fade/slide in when they enter the viewport.
 * Supports data-delay="100" for stagger effects.
 * Respects prefers-reduced-motion.
 */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var delay = parseInt(el.dataset.delay, 10) || 0;
      setTimeout(function () {
        el.classList.add('is-visible');
      }, delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.15 });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      observer.observe(el);
    });
  });
})();
