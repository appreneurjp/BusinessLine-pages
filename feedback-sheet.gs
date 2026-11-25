/** @OnlyCurrentDoc */

/**
 * Google Apps Script: receives the uninstall survey (goodbye.html) and appends
 * one row per answer to the sheet this script is attached to.
 *
 * Setup (once):
 *  1. Create a Google Sheet, e.g. "2nd Phone Number: Talk Plus — uninstall feedback".
 *  2. Extensions -> Apps Script. Replace the code with this file. Save.
 *  3. Deploy -> New deployment -> type "Web app".
 *       Execute as: Me      Who has access: Anyone
 *  4. Copy the web app URL (ends in /exec) into config.js -> feedbackEndpoint.
 *
 * The survey sends no email, phone number or account id — only the reason,
 * the optional comment, extension version, install date and a signed-in flag.
 */
const COLUMNS = [
  'submitted_at', 'reason', 'details', 'version', 'installed', 'days_installed', 'signed_in',
];

function doPost(e) {
  const p = (e && e.parameter) || {};
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS);
  // Cap every field so a junk POST cannot flood the sheet with megabytes.
  sheet.appendRow(COLUMNS.map((k) => String(p[k] || '').slice(0, 1000)));
  return ContentService.createTextOutput('ok');
}
