/*!
 * Fisioterapia Avanzada · Sara Vivanco Hurtado
 * JS ligero sin dependencias externas: header sticky, menú móvil off-canvas,
 * revelados de scroll (IntersectionObserver), scroll suave, botón "volver
 * arriba" y validación de formulario de contacto en cliente.
 */
(function(){
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Año automático en el footer ---------------- */
  document.querySelectorAll('[data-year]').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  /* ---------------- Header: sombra/encogido al hacer scroll ---------------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var lastY = window.scrollY;
    var ticking = false;
    function onScrollHeader(){
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 30);
      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if (!ticking) {
        window.requestAnimationFrame(onScrollHeader);
        ticking = true;
      }
    }, { passive: true });
    onScrollHeader();
  }

  /* ---------------- Menú móvil off-canvas ---------------- */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var mobilePanel = document.querySelector('[data-mobile-panel]');
  var backdrop = document.querySelector('[data-backdrop]');

  function closeMenu(){
    if (!navToggle || !mobilePanel) return;
    navToggle.classList.remove('is-active');
    mobilePanel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }
  function openMenu(){
    navToggle.classList.add('is-active');
    mobilePanel.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }
  if (navToggle && mobilePanel) {
    navToggle.addEventListener('click', function(){
      var isOpen = mobilePanel.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
    backdrop.addEventListener('click', closeMenu);
    mobilePanel.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', closeMenu);
    });
    window.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------------- Enlace activo en la navegación ---------------- */
  var navLinks = document.querySelectorAll('.main-nav__link');
  var sections = Array.prototype.map.call(navLinks, function(link){
    var id = link.getAttribute('href');
    return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
  });
  if (navLinks.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        var idx = sections.indexOf(entry.target);
        if (idx === -1) return;
        navLinks.forEach(function(l){ l.classList.remove('is-active'); });
        navLinks[idx].classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function(s){ if (s) navObserver.observe(s); });
  }

  /* ---------------- Revelados de scroll ---------------- */
  var revealEls = document.querySelectorAll('.js-reveal, .js-reveal-stagger');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------------- Botón "volver arriba" ---------------- */
  var toTop = document.querySelector('[data-to-top]');
  if (toTop) {
    window.addEventListener('scroll', function(){
      toTop.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------------- Formulario de contacto (validación de cliente) ---------------- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(field, message){
      var wrap = field.closest('.field');
      wrap.classList.toggle('has-error', !!message);
      var errorEl = wrap.querySelector('.field__error');
      if (errorEl) errorEl.textContent = message || '';
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var valid = true;
      var name = form.querySelector('#name');
      var phone = form.querySelector('#phone');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');

      [name, phone, email, message].forEach(function(f){ setError(f, ''); });

      if (!name.value.trim()) { setError(name, 'Indica tu nombre'); valid = false; }
      if (!phone.value.trim()) { setError(phone, 'Indica un teléfono de contacto'); valid = false; }
      if (!email.value.trim() || !emailRe.test(email.value.trim())) { setError(email, 'Introduce un email válido'); valid = false; }
      if (!message.value.trim()) { setError(message, 'Cuéntanos brevemente qué necesitas'); valid = false; }

      if (!status) return;
      if (!valid) {
        status.textContent = 'Revisa los campos marcados antes de enviar el formulario.';
        status.className = 'form-status is-visible error';
        return;
      }

      /*
       * Este formulario es solo validación de cliente, sin backend propio.
       * En WordPress, sustituir por el widget Elementor Pro Form (u otro
       * gestor de formularios) manteniendo estas mismas clases CSS.
       */
      status.textContent = 'Gracias, ' + name.value.trim() + '. Hemos recibido tu mensaje y te contactaremos lo antes posible.';
      status.className = 'form-status is-visible success';
      form.reset();
    });
  }

})();
