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

  /* ---------------------------------------------------------------------- *
   * RESEÑAS DE GOOGLE — configuración.
   * 1) Google Cloud Console → crea una API key, habilita "Places API (New)"
   *    y restríngela por referrer HTTP a tu dominio (evita que otros la usen).
   * 2) Busca tu Place ID: https://developers.google.com/maps/documentation/places/web-service/place-id
   * 3) Pega ambos valores aquí abajo.
   * Sin estos dos valores, la sección muestra el contenido de ejemplo que
   * ya trae el HTML. La propia API de Google solo devuelve como máximo las
   * 5 reseñas más relevantes (no las 592 completas): es un límite de la
   * API oficial, no de este código. Ver README, "Reseñas de Google automáticas".
   * ---------------------------------------------------------------------- */
  var GOOGLE_PLACES_API_KEY = ''; // p.ej. 'AIzaSy...'
  var GOOGLE_PLACE_ID = '';       // p.ej. 'ChIJ...'

  document.addEventListener('DOMContentLoaded', function () {
    setYear();
    initHeaderScroll();
    initMobileMenu();
    initHeroAnimation();
    initScrollReveals();
    initCounters();
    initTestimonialSlider();
    initGoogleReviews();
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
   * SLIDER GENÉRICO: carrusel simple por transform translateX, puntos de
   * navegación generados dinámicamente, autoplay con pausa al pasar el
   * ratón por encima y swipe táctil. Usado por el slider de testimonios y
   * el de reseñas de Google. `render()` se puede volver a llamar cuando el
   * contenido del track cambia (p. ej. al recibir las reseñas de Google).
   * ---------------------------------------------------------------------- */
  function createSlider(opts) {
    var track = document.getElementById(opts.trackId);
    var dotsWrap = document.getElementById(opts.dotsId);
    var prevBtn = document.getElementById(opts.prevId);
    var nextBtn = document.getElementById(opts.nextId);
    var slider = document.getElementById(opts.sliderId);
    if (!track || !dotsWrap) return null;

    var index = 0;
    var autoplayId = null;

    function slideCount() { return track.children.length; }

    function render() {
      dotsWrap.innerHTML = '';
      Array.prototype.forEach.call(track.children, function (_, i) {
        var dot = document.createElement('button');
        dot.setAttribute('aria-label', 'Ir al elemento ' + (i + 1));
        if (i === 0) dot.classList.add('is-active');
        dot.addEventListener('click', function () { goTo(i); resetAutoplay(); });
        dotsWrap.appendChild(dot);
      });
      index = 0;
      track.style.transform = 'translateX(0)';
      resetAutoplay();
    }

    function goTo(i) {
      var total = slideCount();
      if (!total) return;
      index = (i + total) % total;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      Array.prototype.forEach.call(dotsWrap.children, function (d, di) {
        d.classList.toggle('is-active', di === index);
      });
    }

    function startAutoplay() {
      if (slideCount() > 1) autoplayId = setInterval(function () { goTo(index + 1); }, opts.interval || 6000);
    }
    function resetAutoplay() {
      clearInterval(autoplayId);
      startAutoplay();
    }

    prevBtn && prevBtn.addEventListener('click', function () { goTo(index - 1); resetAutoplay(); });
    nextBtn && nextBtn.addEventListener('click', function () { goTo(index + 1); resetAutoplay(); });
    if (slider) {
      slider.addEventListener('mouseenter', function () { clearInterval(autoplayId); });
      slider.addEventListener('mouseleave', startAutoplay);
    }

    var startX = null;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) goTo(index + (diff < 0 ? 1 : -1));
      startX = null;
      resetAutoplay();
    });

    render();
    return { render: render, goTo: goTo };
  }

  function initTestimonialSlider() {
    createSlider({
      trackId: 'testimonialTrack', dotsId: 'testimonialDots',
      prevId: 'testimonialPrev', nextId: 'testimonialNext', sliderId: 'testimonialSlider'
    });
  }

  /* ---------------------------------------------------------------------- *
   * RESEÑAS DE GOOGLE: si hay API key + Place ID configurados arriba, carga
   * la librería "places" de Google Maps y sustituye la nota media, el nº de
   * reseñas y las tarjetas del carrusel por datos reales (máx. 5 reseñas,
   * límite de la propia API de Google). Sin configurar, se queda el
   * contenido de ejemplo ya presente en el HTML.
   * ---------------------------------------------------------------------- */
  var GOOGLE_QUOTE_ICON = '<svg class="google-review-card__quote" viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true"><path d="M10 8C5.6 8 2 11.6 2 16s3.6 8 8 8v-4c-2.2 0-4-1.8-4-4s1.8-4 4-4h2V8h-2zm14 0c-4.4 0-8 3.6-8 8s3.6 8 8 8v-4c-2.2 0-4-1.8-4-4s1.8-4 4-4h2V8h-2z"/></svg>';

  function initGoogleReviews() {
    var sliderApi = createSlider({
      trackId: 'googleReviewsTrack', dotsId: 'googleReviewsDots',
      prevId: 'googleReviewsPrev', nextId: 'googleReviewsNext', sliderId: 'googleReviewsSlider'
    });

    var linkEl = document.getElementById('googleReviewsLink');
    if (linkEl && GOOGLE_PLACE_ID) {
      linkEl.href = 'https://search.google.com/local/writereview?placeid=' + encodeURIComponent(GOOGLE_PLACE_ID);
    }

    if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) return;

    loadGoogleMapsScript(GOOGLE_PLACES_API_KEY)
      .then(function () { return google.maps.importLibrary('places'); })
      .then(function (placesLib) {
        var place = new placesLib.Place({ id: GOOGLE_PLACE_ID });
        return place.fetchFields({
          fields: ['rating', 'userRatingCount', 'reviews', 'googleMapsURI']
        }).then(function () { return place; });
      })
      .then(function (place) { renderGoogleReviews(place, sliderApi); })
      .catch(function (err) {
        console.warn('No se pudieron cargar las reseñas de Google:', err);
      });
  }

  function loadGoogleMapsScript(apiKey) {
    if (window.google && window.google.maps) return Promise.resolve();
    if (window.__fisioGoogleMapsPromise) return window.__fisioGoogleMapsPromise;

    window.__fisioGoogleMapsPromise = new Promise(function (resolve, reject) {
      window.__fisioGoogleMapsReady = resolve;
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(apiKey) +
        '&libraries=places&loading=async&callback=__fisioGoogleMapsReady';
      script.async = true;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    return window.__fisioGoogleMapsPromise;
  }

  function starString(n) {
    n = Math.max(0, Math.min(5, Math.round(n || 0)));
    return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  }

  function renderGoogleReviews(place, sliderApi) {
    var scoreEl = document.getElementById('googleReviewsScore');
    var starsEl = document.getElementById('googleReviewsStars');
    var countEl = document.getElementById('googleReviewsCount');
    var track = document.getElementById('googleReviewsTrack');
    var linkEl = document.getElementById('googleReviewsLink');

    if (scoreEl && place.rating) {
      scoreEl.textContent = place.rating.toFixed(1) + ' ';
      var small = document.createElement('small');
      small.textContent = '/ 5.0';
      scoreEl.appendChild(small);
    }
    if (starsEl && place.rating) starsEl.textContent = starString(place.rating);
    if (countEl && place.userRatingCount) countEl.textContent = place.userRatingCount + ' Reseñas en Google';
    if (linkEl && place.googleMapsURI) linkEl.href = place.googleMapsURI;

    if (!track || !place.reviews || !place.reviews.length) return;

    track.innerHTML = '';
    place.reviews.forEach(function (review) {
      var card = document.createElement('div');
      card.className = 'google-review-card';

      var stars = document.createElement('div');
      stars.className = 'google-review-card__stars';
      stars.textContent = starString(review.rating);
      card.appendChild(stars);

      var text = document.createElement('p');
      text.className = 'google-review-card__text';
      text.textContent = '"' + (review.text || '') + '"';
      card.appendChild(text);

      var footer = document.createElement('div');
      footer.className = 'google-review-card__footer';

      var author = document.createElement('div');
      author.className = 'google-review-card__author';
      var strong = document.createElement('strong');
      strong.textContent = (review.authorAttribution && review.authorAttribution.displayName) || 'Paciente de Google';
      author.appendChild(strong);
      footer.appendChild(author);

      var quoteWrap = document.createElement('div');
      quoteWrap.innerHTML = GOOGLE_QUOTE_ICON;
      footer.appendChild(quoteWrap.firstChild);

      card.appendChild(footer);
      track.appendChild(card);
    });

    if (sliderApi) sliderApi.render();
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
