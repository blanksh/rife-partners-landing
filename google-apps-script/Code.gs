/**
 * 리프 파트너 신청 폼 → 구글 시트 수집기 (Google Apps Script 웹앱)
 *
 * 연동 대상 시트:
 *   리프 파트너 신청 (Partner Applications)
 *   https://docs.google.com/spreadsheets/d/1yUrTxyjgxXa4GzbdlXMMXqx0JaC4URtpxUjW5qLVFmo/edit
 *
 * 배포 방법은 같은 폴더의 README.md 참고.
 */

var SHEET_ID = '1yUrTxyjgxXa4GzbdlXMMXqx0JaC4URtpxUjW5qLVFmo';
var HEADERS = ['접수일시', '매장 이름', '대표자 성함', '연락처', '매장 지역', '인스타/네이버 링크', '남기실 말씀'];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

    // 첫 실행 시 헤더 행 자동 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.store  || '',
      data.owner  || '',
      "'" + (data.phone || ''),   // 앞자리 0 보존을 위해 텍스트로 저장
      data.region || '',
      data.link   || '',
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

// 배포 URL이 살아있는지 브라우저에서 확인용 (선택)
function doGet() {
  return ContentService.createTextOutput('RIFE partner application endpoint is running.');
}
