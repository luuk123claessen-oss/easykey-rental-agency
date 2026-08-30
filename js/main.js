document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  initWizard();
});

// Each key routes a copy of the submission to one inbox.
var WEB3FORMS_ACCESS_KEYS = ['fe9f8c84-09c5-4b3f-8d23-d21589cfe188'];

function initWizard() {
  var wizard = document.getElementById('wizard');
  if (!wizard) return;

  var steps = Array.prototype.slice.call(wizard.querySelectorAll('.wizard-step'));
  var dots = Array.prototype.slice.call(wizard.querySelectorAll('.wizard-dot'));
  var backBtn = document.getElementById('wizard-back');
  var totalSteps = steps.filter(function (s) { return s.dataset.step !== 'done'; }).length;
  var current = 1;
  var answers = {};

  function showStep(step) {
    current = step;
    steps.forEach(function (s) {
      s.classList.toggle('is-active', s.dataset.step === String(step));
    });
    dots.forEach(function (dot) {
      var n = Number(dot.dataset.dot);
      dot.classList.toggle('is-active', n === step);
      dot.classList.toggle('is-done', n < step);
    });
    backBtn.classList.toggle('is-visible', step > 1 && step <= totalSteps);
  }

  backBtn.addEventListener('click', function () {
    if (current > 1) showStep(current - 1);
  });

  wizard.querySelectorAll('.wizard-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.closest('.wizard-options');
      group.querySelectorAll('.wizard-option').forEach(function (b) {
        b.classList.remove('is-selected');
      });
      btn.classList.add('is-selected');
      answers[btn.dataset.field] = btn.dataset.value;

      setTimeout(function () {
        if (current < totalSteps) showStep(current + 1);
      }, 220);
    });
  });

  var wizardForm = document.getElementById('wizard-form');
  var status = document.getElementById('form-status');

  wizardForm.addEventListener('submit', function (e) {
    e.preventDefault();
    answers.name = document.getElementById('wizard-name').value;
    answers.email = document.getElementById('wizard-email').value;

    var submitBtn = wizardForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    if (status) status.textContent = 'Even geduld...';

    var payload = {
      naam: answers.name,
      email: answers.email,
      op_zoek_naar: answers.type,
      budget: answers.budget,
      gewenste_periode: answers.timing,
      profiel: answers.profile,
      subject: 'Nieuwe zoekopdracht via EasyKey website'
    };

    var requests = WEB3FORMS_ACCESS_KEYS.map(function (key) {
      return fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.assign({ access_key: key }, payload))
      }).catch(function (err) { console.error('Web3Forms submit failed', err); });
    });

    Promise.allSettled(requests).finally(function () {
      submitBtn.disabled = false;
      if (status) status.textContent = '';
      showStep('done');
    });
  });
}
