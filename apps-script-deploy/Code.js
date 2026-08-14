/**
 * 리프 파트너 신청 폼 → 구글 시트 수집기 + 이메일 알림 (Google Apps Script 웹앱)
 * 대상 시트: 리프 파트너 신청 (Partner Applications)
 */

var SHEET_ID = '1yUrTxyjgxXa4GzbdlXMMXqx0JaC4URtpxUjW5qLVFmo';
var NOTIFY_EMAIL = 'official@rife.im';   // 알림 받을 주소 (필요 시 변경)
var HEADERS = ['접수일시', '매장 이름', '대표자 성함', '연락처', '매장 지역', '인스타그램 계정', '네이버 플레이스 링크', '유입 경로', '남기실 말씀'];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

    // 헤더 행 항상 최신으로 보정 (열 구성 변경 대응)
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);

    sheet.appendRow([
      new Date(),
      data.store  || '',
      data.owner  || '',
      "'" + (data.phone || ''),
      data.region || '',
      data.instagram || '',
      data.naver  || '',
      data.source || '',
      data.memo   || ''
    ]);

    notify_(data);   // 이메일 알림 (실패해도 접수는 유지)

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function notify_(data) {
  try {
    var subject = '[리프 파트너] 새 신청 · ' + (data.store || '(매장명 미기재)');
    var rows = [
      ['매장 이름', data.store],
      ['대표자 성함', data.owner],
      ['연락처', data.phone],
      ['매장 지역', data.region],
      ['인스타그램 계정', data.instagram],
      ['네이버 플레이스', data.naver],
      ['유입 경로', data.source],
      ['남기실 말씀', data.memo]
    ];
    var text = '새 파트너 신청이 접수되었습니다.\n\n';
    var html = '<div style="font-family:Pretendard,Apple SD Gothic Neo,sans-serif;font-size:14px;color:#191712">'
             + '<p style="font-weight:700;font-size:16px;margin:0 0 12px">새 파트너 신청이 접수되었습니다.</p>'
             + '<table style="border-collapse:collapse">';
    rows.forEach(function (r) {
      var v = r[1] || '-';
      text += r[0] + ': ' + v + '\n';
      html += '<tr><td style="padding:4px 12px 4px 0;color:#85806f;white-space:nowrap;vertical-align:top">' + r[0]
            + '</td><td style="padding:4px 0;font-weight:600">' + escapeHtml_(v) + '</td></tr>';
    });
    var sheetUrl = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit';
    text += '\n접수 시각: ' + new Date() + '\n시트: ' + sheetUrl;
    html += '</table><p style="margin:16px 0 0"><a href="' + sheetUrl + '" style="color:#f14b00">시트에서 전체 보기 →</a></p></div>';

    MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: subject, body: text, htmlBody: html });
  } catch (mailErr) {
    // 알림 실패는 무시 (접수 데이터는 이미 저장됨)
  }
}

function escapeHtml_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function doGet() {
  return ContentService.createTextOutput('RIFE partner application endpoint is running.');
}

// 최초 1회 실행용: 편집기에서 Run → 시트 접근 + 메일 발송 권한 승인.
function authorize() {
  var name = SpreadsheetApp.openById(SHEET_ID).getSheets()[0].getName();
  MailApp.getRemainingDailyQuota();   // 메일 발송 스코프 승인 포함
  Logger.log('authorized. sheet: ' + name);
  return name;
}
