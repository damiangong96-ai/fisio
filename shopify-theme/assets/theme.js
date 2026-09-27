(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------------------------------------------------------------
     Money formatting
     --------------------------------------------------------------------- */
  function formatMoney(cents, format = window.theme.moneyFormat) {
    if (typeof cents === 'string') cents = cents.replace('.', '');
    const placeholder = /\{\{\s*(\w+)\s*\}\}/;
    const withDelimiters = (number, precision, thousands = ',', decimal = '.') => {
      if (isNaN(number) || number == null) return '0';
      number = (number / 100.0).toFixed(precision);
      const parts = number.split('.');
      const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousands}`);
      const centsPart = parts[1] ? decimal + parts[1] : '';
      return dollars + centsPart;
    };
    const match = format.match(placeholder);
    if (!match) return format;
    let value;
    switch (match[1]) {
      case 'amount': value = withDelimiters(cents, 2); break;
      case 'amount_no_decimals': value = withDelimiters(cents, 0); break;
      case 'amount_with_comma_separator': value = withDelimiters(cents, 2, '.', ','); break;
      case 'amount_no_decimals_with_comma_separator': value = withDelimiters(cents, 0, '.', ','); break;
      case 'amount_with_apostrophe_separator': value = withDelimiters(cents, 2, "'", '.'); break;
      case 'amount_with_space_separator': value = withDelimiters(cents, 2, ' ', ','); break;
      default: value = withDelimiters(cents, 2);
    }
    return format.replace(placeholder, value);
  }

  /* ---------------------------------------------------------------------
     Overlay & drawers
     --------------------------------------------------------------------- */
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  let openDrawer = null;
  function open(el) {
    if (!el) return;
    close();
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-visible');
    document.documentElement.style.overflow = 'hidden';
    openDrawer = el;
    const focusable = el.querySelector('input, button, a');
    if (focusable) setTimeout(() => focusable.focus(), 50);
  }
  function close() {
    if (!openDrawer) return;
    openDrawer.classList.remove('is-open');
    openDrawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-visible');
    document.documentElement.style.overflow = '';
    openDrawer = null;
  }
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open]');
    if (opener) {
      const target = document.getElementById(opener.dataset.open);
      if (target) {
        e.preventDefault();
        open(target);
      }
      return;
    }
    if (e.target.closest('[data-close]')) {
      e.preventDefault();
      close();
    }
  });

  /* ---------------------------------------------------------------------
     Sticky header state
     --------------------------------------------------------------------- */
  const header = $('.header-wrapper');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------------- */
  function initReveal(ctx = document) {
    const items = $$('.reveal:not(.is-visible)', ctx);
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  }
  initReveal();
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', (e) => initReveal(e.target));
  }

  /* ---------------------------------------------------------------------
     Quantity inputs
     --------------------------------------------------------------------- */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-qty]');
    if (!btn) return;
    const wrapper = btn.closest('.quantity');
    const input = wrapper && wrapper.querySelector('input');
    if (!input) return;
    const min = parseInt(input.min || '0', 10);
    const next = Math.max(min, (parseInt(input.value, 10) || 0) + (btn.dataset.qty === 'plus' ? 1 : -1));
    input.value = next;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ---------------------------------------------------------------------
     Cart
     --------------------------------------------------------------------- */
  const cartSectionId = 'cart-drawer';

  function updateCount(count) {
    $$('[data-cart-count]').forEach((el) => {
      el.textContent = count;
      el.hidden = count === 0;
    });
  }

  async function refreshDrawer() {
    const res = await fetch(`${window.theme.routes.root_url.replace(/\/$/, '')}/?sections=${cartSectionId}`);
    const data = await res.json();
    const html = new DOMParser().parseFromString(data[cartSectionId], 'text/html');
    const fresh = html.querySelector('[data-cart-drawer-inner]');
    const current = $('[data-cart-drawer-inner]');
    if (fresh && current) current.replaceWith(fresh);
  }

  async function refreshCount() {
    const res = await fetch(`${window.theme.routes.cart_url}.js`);
    const cart = await res.json();
    updateCount(cart.item_count);
    return cart;
  }

  async function changeLine(line, quantity) {
    const res = await fetch(`${window.theme.routes.cart_change_url}.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ line, quantity })
    });
    const cart = await res.json();
    updateCount(cart.item_count);
    if ($('#CartDrawer')) await refreshDrawer();
    if (document.body.classList.contains('template-cart')) window.location.reload();
  }

  document.addEventListener('change', (e) => {
    const input = e.target.closest('[data-line-qty]');
    if (input) changeLine(parseInt(input.dataset.lineQty, 10), parseInt(input.value, 10) || 0);
  });
  document.addEventListener('click', (e) => {
    const remove = e.target.closest('[data-line-remove]');
    if (remove) {
      e.preventDefault();
      changeLine(parseInt(remove.dataset.lineRemove, 10), 0);
    }
  });

  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('form[data-product-form]');
    if (!form || window.theme.cartType !== 'drawer' || !$('#CartDrawer')) return;
    e.preventDefault();
    const button = form.querySelector('[type="submit"]');
    const error = form.querySelector('[data-form-error]');
    if (button) button.classList.add('is-loading');
    if (error) error.textContent = '';
    try {
      const res = await fetch(`${window.theme.routes.cart_add_url}.js`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });
      const data = await res.json();
      if (data.status) {
        if (error) error.textContent = data.description || data.message;
        return;
      }
      await Promise.all([refreshDrawer(), refreshCount()]);
      open($('#CartDrawer'));
    } catch (err) {
      form.submit();
    } finally {
      if (button) button.classList.remove('is-loading');
    }
  });

  /* ---------------------------------------------------------------------
     Variant picker
     --------------------------------------------------------------------- */
  function initProduct(root) {
    const json = root.querySelector('[data-variants-json]');
    if (!json) return;
    const variants = JSON.parse(json.textContent);
    const form = root.querySelector('form[data-product-form]');
    const idInput = form && form.querySelector('input[name="id"]');
    const priceEl = root.querySelector('[data-price]');
    const button = root.querySelector('[data-add-button]');
    const selectedLabels = $$('[data-selected-value]', root);

    const getSelected = () => $$('[data-option-index]', root).map((fs) => {
      const checked = fs.querySelector('input:checked');
      return checked ? checked.value : null;
    });

    function markAvailability(selected) {
      $$('[data-option-index]', root).forEach((fs) => {
        const idx = parseInt(fs.dataset.optionIndex, 10);
        $$('input', fs).forEach((input) => {
          // Available if some in-stock variant matches the options chosen before this one.
          const available = variants.some((v) => v.available
            && v.options[idx] === input.value
            && v.options.slice(0, idx).every((opt, i) => opt === selected[i]));
          input.classList.toggle('is-unavailable', !available);
        });
      });
    }

    function update() {
      const selected = getSelected();
      const variant = variants.find((v) => v.options.every((opt, i) => opt === selected[i]));
      selectedLabels.forEach((el) => {
        const i = parseInt(el.dataset.selectedValue, 10);
        el.textContent = selected[i] || '';
      });
      markAvailability(selected);

      if (!variant) {
        if (button) {
          button.disabled = true;
          button.querySelector('span').textContent = window.theme.strings.unavailable;
        }
        return;
      }
      if (idInput) idInput.value = variant.id;
      if (button) {
        button.disabled = !variant.available;
        button.querySelector('span').textContent = variant.available ? window.theme.strings.addToCart : window.theme.strings.soldOut;
      }
      if (priceEl) {
        const onSale = variant.compare_at_price && variant.compare_at_price > variant.price;
        priceEl.classList.toggle('price--sale', !!onSale);
        priceEl.innerHTML = `<span class="price__current">${formatMoney(variant.price)}</span>${onSale ? `<s class="price__compare">${formatMoney(variant.compare_at_price)}</s>` : ''}`;
      }
      if (variant.featured_media) {
        const media = root.querySelector(`[data-media-id="${variant.featured_media.id}"]`);
        const gallery = root.querySelector('.product-gallery');
        if (media && gallery && gallery.firstElementChild !== media) {
          gallery.prepend(media);
        }
      }
      if (root.dataset.updateUrl !== 'false') {
        const url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        window.history.replaceState({}, '', url.toString());
      }
    }

    root.addEventListener('change', (e) => {
      if (e.target.closest('[data-option-index]')) update();
    });
    markAvailability(getSelected());
  }
  $$('[data-product]').forEach(initProduct);
  document.addEventListener('shopify:section:load', (e) => $$('[data-product]', e.target).forEach(initProduct));

  /* ---------------------------------------------------------------------
     Collection: auto-submit sort & filters
     --------------------------------------------------------------------- */
  document.addEventListener('change', (e) => {
    const auto = e.target.closest('[data-auto-submit]');
    if (auto) auto.form ? auto.form.submit() : auto.closest('form').submit();
  });

  /* ---------------------------------------------------------------------
     Product recommendations
     --------------------------------------------------------------------- */
  $$('[data-recommendations]').forEach(async (el) => {
    try {
      const res = await fetch(el.dataset.url);
      const text = await res.text();
      const html = new DOMParser().parseFromString(text, 'text/html');
      const inner = html.querySelector('[data-recommendations]');
      if (inner && inner.innerHTML.trim().length) {
        el.innerHTML = inner.innerHTML;
        initReveal(el);
      } else {
        el.closest('.shopify-section').hidden = true;
      }
    } catch (err) {
      /* ignore */
    }
  });
})();
