/**
 * Engineering Stories — interactive post-mortem modals.
 * Milestone cards with [data-story] open a modal/drawer showing
 * Challenge → Solution → Result for each technical bottleneck.
 */
(function () {
  var STORIES = {
    seo: {
      icon: 'fa-solid fa-chart-line',
      title: 'SEO en una SPA vanilla',
      challenge: 'Las Single Page Applications no indexan contenido din\u00e1mico. Los buscadores ve\u00edan una p\u00e1gina vac\u00eda \u2014 cero tr\u00e1fico org\u00e1nico, cero descubrimiento.',
      solution: 'Pre-renderizado est\u00e1tico de +200 listas y +50 rutas literarias como HTML puro servido desde Vercel. Sitemap din\u00e1mico actualizado por Cloud Scheduler. URLs estables tratadas como activos de negocio \u2014 ninguna se modifica sin an\u00e1lisis de impacto.',
      result: '+10.000 p\u00e1ginas indexadas en Google. +3.000 visitas/mes org\u00e1nicas. Canal principal de adquisici\u00f3n sin inversi\u00f3n en ads.'
    },
    billing: {
      icon: 'fa-solid fa-credit-card',
      title: 'Billing multiplataforma',
      challenge: 'Stripe en web y Google Play Billing en Android tienen APIs, ciclos de vida y modelos de verificaci\u00f3n completamente distintos. Mantener l\u00f3gica premium con condicionales por plataforma era insostenible.',
      solution: 'Capa de abstracci\u00f3n unificada con verificaci\u00f3n server-side agn\u00f3stica del proveedor. Cloud Functions validan el token (Stripe o Play) y propagan el estado premium v\u00eda custom events a todos los m\u00f3dulos suscritos. Sin polling, sin Redux.',
      result: 'Una \u00fanica l\u00f3gica freemium. Cero condicionales en la capa de features. Propagaci\u00f3n de estado en milisegundos.'
    },
    ia: {
      icon: 'fa-solid fa-robot',
      title: 'IA en producci\u00f3n real',
      challenge: 'Integrar un LLM en un producto real va m\u00e1s all\u00e1 de llamar a la API. Latencia percibida, alucinaciones literarias, costes por token y UX conversacional eran cuellos de botella reales.',
      solution: 'GPT-4o-mini con streaming SSE para respuesta instant\u00e1nea. Prompt engineering con personalidad literaria (evocador, sin buzzwords). Memoria de conversaci\u00f3n. Disciplina expl\u00edcita: solo fuentes primarias para citas (Wikisource, Cervantes Virtual, BNE).',
      result: 'Chatbot LibrAI en producci\u00f3n. Motor de recomendaciones sem\u00e1ntico por estado de \u00e1nimo cruzado con 55+ g\u00e9neros. Coste optimizado por usuario.'
    },
    mobile: {
      icon: 'fa-brands fa-google-play',
      title: 'De web a app nativa',
      challenge: 'Publicar una SPA vanilla como app nativa en Google Play sin reescribir el c\u00f3digo. Los mismos assets deb\u00edan correr en web y en WebView con billing nativo de Android.',
      solution: 'Capacitor 7 envuelve los assets HTML/CSS/JS en un WebView nativo. Bridge JS-to-native para Google Play Billing v3. Un \u00fanico repo despliega en 3 superficies: Vercel, Firebase Hosting y Android.',
      result: 'App publicada en Google Play Store. Misma base de c\u00f3digo, tres superficies de deploy. Sin overhead de framework m\u00f3vil.'
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementById('storyOverlay');
    if (!overlay) return;

    var iconEl    = document.getElementById('storyIcon');
    var titleEl   = document.getElementById('storyTitle');
    var challEl   = document.getElementById('storyChallenge');
    var solEl     = document.getElementById('storySolution');
    var resultEl  = document.getElementById('storyResult');
    var closeBtn  = overlay.querySelector('.story-modal__close');

    function open(key) {
      var s = STORIES[key];
      if (!s) return;
      iconEl.innerHTML = '<i class="' + s.icon + '" aria-hidden="true"></i>';
      titleEl.textContent = s.title;
      challEl.textContent = s.challenge;
      solEl.textContent = s.solution;
      resultEl.textContent = s.result;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
    }

    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
    }

    document.querySelectorAll('[data-story]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        open(btn.dataset.story);
      });
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });
  });
})();
