// ========================================
// GOOGLE APPS SCRIPT — Survey Response Collector
// ========================================
// HOW TO DEPLOY:
// 1. Go to https://script.google.com
// 2. Create a new project
// 3. Paste this entire code
// 4. Click Deploy → New Deployment → Web App
// 5. Set "Execute as" = Me, "Who has access" = Anyone
// 6. Copy the deployment URL
// 7. Paste it into survey-app/app.js as SHEETS_ENDPOINT
// ========================================

const SHEET_ID = '1LnOszU4Lt3b4hhiymCvTItYUPDYOX7cI1gg3Ji6Lc48';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // Create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        'timestamp', 'uid', 'mobile', 'country', 'flow',
        'planning_sequence', 'visa_position',
        'first_move',
        'agent_id', 'agent_play', 'agent_name', 'agent_card_positions',
        'why_text', 'never_agent', 'never_name', 'why_not_text',
        'moment_response',
        'trust_signal',
        'crisis_response',
        'one_thing',
        'contact_info',
        'total_time_seconds', 'screen_times'
      ];
      sheet.appendRow(headers);
    }

    // Append response row
    const row = [
      data._timestamp || new Date().toISOString(),
      data._uid || 'unknown',
      data.mobile || '',
      data._country || '',
      data._flow || '',
      JSON.stringify(data.planning_sequence || []),
      data.visa_position || '',
      data.first_move || '',
      data.agent_id || '',
      data.agent_play || '',
      data.agent_name || '',
      JSON.stringify(data.agent_card_positions || []),
      data.why_text || '',
      data.never_agent || '',
      data.never_name || '',
      data.why_not_text || '',
      data.moment_response || '',
      data.trust_signal || '',
      data.crisis_response || '',
      data.one_thing || '',
      data.contact_info || '',
      data._totalTime || '',
      JSON.stringify(data._screenTimes || {})
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Survey backend is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
