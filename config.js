/**
 * Everything on these pages that changes without a redesign lives here.
 *
 * Offers are OFF (null) until there is a real coupon behind them — a code on
 * this page that the checkout rejects is worse than no offer at all.
 * Open any page with ?demo=1 to preview the offer blocks with sample copy.
 */
window.SITE = {
  name: '2nd Phone Number: Talk Plus',

  /** Chrome Web Store listing. ID is derived from the manifest key, so it is final. */
  storeUrl: 'https://chromewebstore.google.com/detail/mggmfkbobbjficamblneljkabfmomfjd',
  reviewUrl: 'https://chromewebstore.google.com/detail/mggmfkbobbjficamblneljkabfmomfjd/reviews',

  privacyUrl: 'https://2ndline.biz/privacy-policy.html',
  termsUrl: 'https://2ndline.biz/terms-of-use.html',
  supportUrl: 'https://2ndline.biz/support.html',

  /**
   * Where the uninstall survey is sent (POST, application/x-www-form-urlencoded).
   * Works with a backend endpoint, Formspree, or a Google Apps Script web app.
   * Empty = the survey still shows, but answers are not stored anywhere.
   */
  feedbackEndpoint: '',

  /** Shown on the welcome page. null = hidden. */
  welcomeOffer: null,
  // welcomeOffer: {
  //   eyebrow: 'New-user offer',
  //   title: '20% off your first month',
  //   body: 'Pick your number in the next 48 hours and the discount is applied at checkout.',
  //   code: 'WELCOME20',
  //   expiresHours: 48,
  // },

  /** Shown on the uninstall page after the survey. null = hidden. */
  winbackOffer: null,
  // winbackOffer: {
  //   eyebrow: 'Before you go',
  //   title: 'Come back for 20% off a month',
  //   body: 'Reinstall, sign in, and use this code when you renew. Valid for 7 days.',
  //   code: 'COMEBACK20',
  // },
};

/** Sample offers for ?demo=1 previews only. */
window.SITE_DEMO_OFFERS = {
  welcomeOffer: {
    eyebrow: 'New-user offer',
    title: '20% off your first month',
    body: 'Pick your number in the next 48 hours and the discount is applied at checkout.',
    code: 'WELCOME20',
    expiresHours: 48,
  },
  winbackOffer: {
    eyebrow: 'Before you go',
    title: 'Come back for 20% off a month',
    body: 'Reinstall, sign in, and use this code when you renew. Valid for 7 days.',
    code: 'COMEBACK20',
  },
};
