/**
 * Contact form — AJAX submission via Formspree.
 * Shows loading spinner on button, then success/error toast.
 */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.contact__form');
    var btn = document.querySelector('.form__button');
    var toast = document.getElementById('formToast');
    if (!form || !btn || !toast) return;

    var originalText = btn.textContent;

    function showToast(type, message) {
      toast.className = 'form__toast form__toast--' + type;
      toast.innerHTML =
        '<i class="form__toast__icon fa-solid ' +
        (type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark') +
        '" aria-hidden="true"></i>' +
        '<span>' + message + '</span>';
      // Force reflow before adding class
      void toast.offsetWidth;
      toast.classList.add('is-visible');

      setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 4500);
    }

    // Sync _replyto with the email field so replies go to the sender
    var emailInput = document.getElementById('contact-email');
    var replyTo = document.getElementById('hidden-replyto');
    if (emailInput && replyTo) {
      emailInput.addEventListener('input', function () {
        replyTo.value = emailInput.value;
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Sync one last time before sending
      if (emailInput && replyTo) replyTo.value = emailInput.value;

      // Loading state
      btn.disabled = true;
      btn.classList.add('form__button--loading');
      btn.innerHTML = '<span class="form__spinner"></span> Enviando…';

      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            showToast('success', 'Mensaje enviado correctamente');
            form.reset();
          } else {
            throw new Error('Error ' + res.status);
          }
        })
        .catch(function () {
          showToast('error', 'Error al enviar. Inténtalo de nuevo.');
        })
        .finally(function () {
          btn.disabled = false;
          btn.classList.remove('form__button--loading');
          btn.innerHTML = originalText;
        });
    });
  });
})();
