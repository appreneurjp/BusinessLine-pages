/* Shared helpers for the lifecycle pages. No build step, no dependencies. */
(function () {
  const params = new URLSearchParams(location.search);
  const cfg = Object.assign({}, window.SITE);
  if (params.get('demo') === '1') Object.assign(cfg, window.SITE_DEMO_OFFERS);

  /** Fill every [data-href="key"] link from config. */
  document.querySelectorAll('[data-href]').forEach((a) => {
    const url = cfg[a.getAttribute('data-href')];
    if (url) a.href = url;
    else a.hidden = true;
  });

  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
  document.querySelectorAll('[data-version]').forEach((el) => {
    const v = params.get('v');
    if (v) el.textContent = 'v' + v;
    else el.hidden = true;
  });

  /** Render an offer object into an .offer block, or hide the block. */
  function renderOffer(el, offer) {
    if (!el) return;
    if (!offer) {
      el.hidden = true;
      return;
    }
    el.querySelector('[data-o="eyebrow"]').textContent = offer.eyebrow || 'Offer';
    el.querySelector('[data-o="title"]').textContent = offer.title;
    el.querySelector('[data-o="body"]').textContent = offer.body || '';
    const code = el.querySelector('[data-o="code"]');
    const box = el.querySelector('.code');
    if (offer.code) {
      code.textContent = offer.code;
      box.querySelector('button').addEventListener('click', async (e) => {
        try {
          await navigator.clipboard.writeText(offer.code);
          e.target.textContent = 'Copied';
          setTimeout(() => (e.target.textContent = 'Copy'), 1600);
        } catch {
          /* Clipboard blocked: the code is still visible to copy by hand. */
        }
      });
    } else {
      box.hidden = true;
    }
    const timer = el.querySelector('[data-o="timer"]');
    if (timer && offer.expiresHours) startTimer(timer, offer.expiresHours);
    else if (timer) timer.hidden = true;
    el.hidden = false;
  }

  /**
   * Countdown from first visit, remembered per browser so a reload does not
   * reset it. Honest urgency only — the checkout must enforce the same window.
   */
  function startTimer(el, hours) {
    const key = 'sl-offer-start';
    let start = Number(localStorage.getItem(key));
    if (!start) {
      start = Date.now();
      localStorage.setItem(key, String(start));
    }
    const end = start + hours * 3600e3;
    const tick = () => {
      const left = end - Date.now();
      if (left <= 0) {
        el.textContent = 'Offer expired';
        return;
      }
      const h = Math.floor(left / 3600e3);
      const m = Math.floor((left % 3600e3) / 60e3);
      el.textContent = `Ends in ${h}h ${String(m).padStart(2, '0')}m`;
      setTimeout(tick, 30e3);
    };
    tick();
  }

  window.SL = { cfg, params, renderOffer };
})();
