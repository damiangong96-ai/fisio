/* ==========================================================================
   Fisioterapia Avanzada Sara Vivanco Hurtado — main.js
   GSAP + ScrollTrigger: entradas del hero, revelado en scroll, contadores,
   header sticky con hide/show, menú móvil off-canvas, slider de testimonios,
   formulario de contacto con validación, scroll suave y "volver arriba".
   Sin dependencias además de GSAP/ScrollTrigger (cargadas por CDN en index.html).
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setYear();
    initHeaderScroll();
    initMobileMenu();
    initHeroAnimation();
    initScrollReveals();
    initCounters();
    initTestimonialSlider();
    initContactForm();
    initSmoothAnchors();
    initBackToTop();
  });

  /* ---------------------------------------------------------------------- */
  function setYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------------- *
   * HEADER: sombra + reduce altura tras 40px; se oculta al bajar y
   * reaparece al subir (a partir de 220px de scroll), como en temas
   * premium de una sola página.
   * ---------------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    var lastY = window.scrollY;
    var ticking = false;

    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 40);

      if (y > 220 && y > lastY) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    onScroll();
  }

  /* ---------------------------------------------------------------------- *
   * MENÚ MÓVIL off-canvas
   * ---------------------------------------------------------------------- */
  function initMobileMenu() {
    var btn = document.getElementById('hamburgerBtn');
    var menu = document.getElementById('mobileMenu');
    var closeBtn = document.getElementById('mobileMenuClose');
    var backdrop = document.getElementById('mobileMenuBackdrop');
    if (!btn || !menu) return;

    function open() {
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    }
    function close() {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }

    btn.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    backdrop && backdrop.addEventListener('click', close);

    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------------------------------------------------------------------- *
   * HERO: timeline de entrada.
   * eyebrow -> líneas del título (clip + translateY, stagger) -> slogan ->
   * lead -> botones -> imagen (scale+fade) -> tarjeta flotante -> trust row.
   * ---------------------------------------------------------------------- */
  function initHeroAnimation() {
    if (!window.gsap) return;

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.js-hero-anim[data-anim="eyebrow"]', {
      y: 18, opacity: 0, duration: 0.6
    })
    .from('.js-hero-line', {
      yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.1
    }, '-=0.35')
    .from('.js-hero-anim[data-anim="slogan"]', {
      y: 16, opacity: 0, duration: 0.6
    }, '-=0.45')
    .from('.js-hero-anim[data-anim="lead"]', {
      y: 16, opacity: 0, duration: 0.6
    }, '-=0.4')
    .from('.js-hero-anim[data-anim="actions"] .btn', {
      y: 16, opacity: 0, duration: 0.55, stagger: 0.1
    }, '-=0.35')
    .from('.js-hero-anim[data-anim="trust"]', {
      y: 14, opacity: 0, duration: 0.5
    }, '-=0.3')
    .from('.js-hero-media', {
      scale: 1.08, opacity: 0, duration: 1.1, ease: 'power2.out'
    }, 0.25)
    .from('.js-hero-anim[data-anim="card"]', {
      x: 30, opacity: 0, duration: 0.7
    }, '-=0.5');

    /* Parallax sutil de la imagen del hero y de about al hacer scroll */
    if (window.ScrollTrigger && !reduceMotion) {
      gsap.utils.toArray('.js-parallax').forEach(function (el) {
        gsap.to(el, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6
          }
        });
      });
    }
  }

  /* ---------------------------------------------------------------------- *
   * SCROLL REVEALS: elementos .js-reveal entran individualmente;
   * .js-reveal-stagger entra en grupo (tarjetas de servicios / proceso).
   * ---------------------------------------------------------------------- */
  function initScrollReveals() {
    if (!window.gsap || !window.ScrollTrigger) {
      document.querySelectorAll('.js-reveal,.js-reveal-stagger').forEach(function (el) {
        el.style.opacity = 1;
      });
      return;
    }

    gsap.utils.toArray('.js-reveal').forEach(function (el) {
      gsap.fromTo(el,
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      );
    });

    var groups = new Map();
    gsap.utils.toArray('.js-reveal-stagger').forEach(function (el) {
      var parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });
    groups.forEach(function (items) {
      gsap.fromTo(items,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: items[0], start: 'top 88%' }
        }
      );
    });
  }

  /* ---------------------------------------------------------------------- *
   * CONTADORES ANIMADOS (stats de la sección "Sobre mí")
   * Lee data-count de cada .stat__number. Con 0 no anima (placeholder);
   * al rellenar el valor real, cuenta desde 0 hasta el target al entrar
   * en el viewport.
   * ---------------------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('.stat__number');
    if (!counters.length) return;

    counters.forEach(function (counter) {
      var target = parseFloat(counter.getAttribute('data-count')) || 0;
      if (target <= 0) return;

      var played = false;
      var run = function () {
        if (played) return;
        played = true;
        if (window.gsap) {
          var obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 1.6, ease: 'power2.out',
            onUpdate: function () { counter.textContent = Math.round(obj.val); }
          });
        } else {
          counter.textContent = target;
        }
      };

      if (window.ScrollTrigger) {
        ScrollTrigger.create({ trigger: counter, start: 'top 90%', onEnter: run });
      } else {
        run();
      }
    });
  }

  /* ---------------------------------------------------------------------- *
   * SLIDER DE TESTIMONIOS: carrusel simple por transform translateX,
   * puntos de navegación generados dinámicamente, autoplay con pausa
   * al pasar el ratón por encima.
   * ---------------------------------------------------------------------- */
  function initTestimonialSlider() {
    var track = document.getElementById('testimonialTrack');
    var dotsWrap = document.getElementById('testimonialDots');
    var prevBtn = document.getElementById('testimonialPrev');
    var nextBtn = document.getElementById('testimonialNext');
    var slider = document.getElementById('testimonialSlider');
    if (!track || !dotsWrap) return;

    var slides = Array.prototype.slice.call(track.children);
    var index = 0;
    var autoplayId = null;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Ir al testimonio ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function (d, di) { d.classList.toggle('is-active', di === index); });
    }

    prevBtn && prevBtn.addEventListener('click', function () { goTo(index - 1); resetAutoplay(); });
    nextBtn && nextBtn.addEventListener('click', function () { goTo(index + 1); resetAutoplay(); });

    function startAutoplay() {
      autoplayId = setInterval(function () { goTo(index + 1); }, 6000);
    }
    function resetAutoplay() {
      clearInterval(autoplayId);
      startAutoplay();
    }
    if (slider) {
      slider.addEventListener('mouseenter', function () { clearInterval(autoplayId); });
      slider.addEventListener('mouseleave', startAutoplay);
    }
    if (slides.length > 1) startAutoplay();

    /* Swipe táctil */
    var startX = null;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) goTo(index + (diff < 0 ? 1 : -1));
      startX = null;
      resetAutoplay();
    });
  }

  /* ---------------------------------------------------------------------- *
   * FORMULARIO DE CONTACTO: validación básica en cliente. Sin backend
   * propio: muestra confirmación visual. En WordPress, sustituir por
   * Elementor Pro Forms o conectar a un endpoint real (ver README).
   * ---------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    var success = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      form.querySelectorAll('[required]').forEach(function (field) {
        var wrapper = field.closest('.contact-form__field') || field.parentElement;
        var isEmail = field.type === 'email';
        var value = field.type === 'checkbox' ? field.checked : field.value.trim();
        var ok = field.type === 'checkbox' ? value === true : value.length > 0;
        if (ok && isEmail) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        if (wrapper && wrapper.classList.contains('contact-form__field')) {
          wrapper.classList.toggle('has-error', !ok);
        }
        if (!ok) valid = false;
      });

      if (!valid) {
        success.classList.remove('is-visible');
        return;
      }

      success.classList.add('is-visible');
      form.reset();
      setTimeout(function () { success.classList.remove('is-visible'); }, 7000);
    });

    form.querySelectorAll('input,textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        var wrapper = field.closest('.contact-form__field');
        if (wrapper) wrapper.classList.remove('has-error');
      });
    });
  }

  /* ---------------------------------------------------------------------- */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var headerH = document.getElementById('siteHeader').offsetHeight + 40;
        var top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });

        document.querySelectorAll('.main-nav__link').forEach(function (a) { a.classList.remove('is-active'); });
        if (link.classList.contains('main-nav__link')) link.classList.add('is-active');
      });
    });
  }

  /* ---------------------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }
})();
