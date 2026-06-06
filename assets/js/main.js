(function () {
  'use strict';

  /* Mobile navigation */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('nav--open');
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav--open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav--open');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* Active navigation highlighting */
  var pathParts = window.location.pathname.split('/');
  var currentPage = pathParts[pathParts.length - 1];
  if (!currentPage || currentPage === '') currentPage = 'index.html';

  document.querySelectorAll('.nav__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    var linkPage = href.split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('nav__link--active');
    }
  });

  /* Smooth scroll for same-page anchors */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (history.pushState) {
          history.pushState(null, '', targetId);
        }
      }
    });
  });

  /* Contact form validation */
  var form = document.getElementById('contact-form');
  if (form) {
    var successBanner = document.getElementById('form-success');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError(fieldId, message) {
      var group = document.getElementById('group-' + fieldId);
      var errorEl = document.getElementById('error-' + fieldId);
      if (group && errorEl) {
        group.classList.add('form-group--error');
        errorEl.textContent = message;
      }
    }

    function clearErrors() {
      form.querySelectorAll('.form-group').forEach(function (g) {
        g.classList.remove('form-group--error');
      });
      form.querySelectorAll('.form-error').forEach(function (e) {
        e.textContent = '';
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      var valid = true;
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var company = document.getElementById('company');
      var projectType = document.getElementById('project-type');
      var message = document.getElementById('message');

      if (!name.value.trim()) {
        showError('name', 'Please enter your name.');
        valid = false;
      }

      if (!email.value.trim()) {
        showError('email', 'Please enter your email address.');
        valid = false;
      } else if (!emailPattern.test(email.value.trim())) {
        showError('email', 'Please enter a valid email address.');
        valid = false;
      }

      if (!company.value.trim()) {
        showError('company', 'Please enter your company name.');
        valid = false;
      }

      if (!projectType.value) {
        showError('project-type', 'Please select a project type.');
        valid = false;
      }

      if (!message.value.trim()) {
        showError('message', 'Please enter a message.');
        valid = false;
      }

      if (!valid) {
        var firstError = form.querySelector('.form-group--error input, .form-group--error select, .form-group--error textarea');
        if (firstError) firstError.focus();
        return;
      }

      /*
       * Backend integration points:
       * - Formspree: remove e.preventDefault() above and set form action/method
       * - Netlify Forms: add data-netlify="true" and let Netlify handle submit
       * - Custom API: fetch('/api/contact', { method: 'POST', body: new FormData(form) })
       */

      if (successBanner) {
        successBanner.classList.add('form-success--visible');
        successBanner.setAttribute('role', 'alert');
      }

      form.reset();
      if (successBanner) successBanner.focus();
    });
  }
})();
