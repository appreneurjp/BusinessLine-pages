# 2nd Phone Number — extension lifecycle pages

Static pages the Chrome extension opens on its own:

| Page | Opened when |
|---|---|
| `welcome.html` | First install. Pin-the-icon guide, first steps, optional welcome offer. |
| `whats-new.html` | Update that changes the major or minor version (not patch releases). |
| `goodbye.html` | Uninstall (`chrome.runtime.setUninstallURL`). Exit survey + optional win-back offer. |

The extension adds `?v=<version>&utm_source=extension`; the uninstall URL also
carries `i=<install date>` and `s=<1 if signed in>`. No personal data.

## Editing

- Links, offers and the survey endpoint: `config.js`.
- Offers stay `null` until a real coupon exists at checkout. Preview them with `?demo=1`.
- New release notes: add an `<article>` at the top of `whats-new.html`.
- Survey answers → Google Sheet: see `feedback-sheet.gs`.

Hosted on GitHub Pages from this repo. When 2ndline.biz is available, move the
pages there, ship an extension update with the new `VITE_SITE_URL`, and keep this
site up (or redirecting) — older installs keep the old uninstall URL until they update.
