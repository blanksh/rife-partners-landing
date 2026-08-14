/**
 * 리프 파트너 신청 폼 → 구글 시트 수집기 (Google Apps Script 웹앱)
 * 대상 시트: 리프 파트너 신청 (Partner Applications)
 */

var SHEET_ID = '1yUrTxyjgxXa4GzbdlXMMXqx0JaC4URtpxUjW5qLVFmo';
var HEADERS = ['접수일시', '매장 이름', '대표자 성함', '연락처', '매장 지역', '인스타그램 계정', '네이버 플레이스 링크', '남기실 말씀'];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.store  || '',
      data.owner  || '',
      "'" + (data.phone || ''),
      data.region || '',
      data.instagram || '',
      data.naver  || '',
      data.memo   || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('RIFE partner application endpoint is running.');
}

// 최초 1회 실행용: 이 함수를 편집기에서 Run 하면 시트 접근 권한(스코프) 승인 화면이 뜹니다.
// 승인만 완료되면 익명 폼 제출이 시트에 기록됩니다.
function authorize() {
  var name = SpreadsheetApp.openById(SHEET_ID).getSheets()[0].getName();
  Logger.log('authorized. sheet: ' + name);
  return name;
}
