# 파트너 신청 폼 → 구글 시트 연동

랜딩페이지(`index.html`)의 신청 폼 데이터를 아래 시트로 수집합니다.

- **시트**: 리프 파트너 신청 (Partner Applications)
- **URL**: https://docs.google.com/spreadsheets/d/1yUrTxyjgxXa4GzbdlXMMXqx0JaC4URtpxUjW5qLVFmo/edit
- **위치**: Drive 폴더 `리프 2.0 리드`

방식은 **Google Apps Script 웹앱**입니다. 폼이 이 웹앱 URL로 POST하면 `doPost`가 시트에 한 행씩 추가합니다.

---

## 배포 (최초 1회, official.rife@gmail.com 계정에서)

1. 위 **시트를 엽니다** → 상단 메뉴 **확장 프로그램 → Apps Script**.
2. 기본으로 열린 `Code.gs` 내용을 지우고, 이 폴더의 [`Code.gs`](./Code.gs) 내용을 **그대로 붙여넣기** → 저장(💾).
3. 우측 상단 **배포 → 새 배포**.
4. 톱니바퀴(⚙️) → **웹 앱** 선택.
5. 설정:
   - **설명**: `리프 파트너 신청 수집기` (자유)
   - **실행 계정(Execute as)**: `나(official.rife@gmail.com)`
   - **액세스 권한(Who has access)**: **모든 사용자(Anyone)** ← 반드시 이걸로. 폼이 로그인 없이 보내야 하므로.
6. **배포** → 처음이면 권한 승인 팝업 → 계정 선택 → "고급 → 안전하지 않음(이동)" → 허용.
7. 발급된 **웹 앱 URL** 복사. 형태:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 랜딩페이지에 연결

`index.html` 상단 스크립트의 이 줄에 위 URL을 붙여넣습니다:

```js
var SHEET_ENDPOINT = "";   // ← 여기에 .../exec URL
```

예:
```js
var SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycb.../exec";
```

저장 후 폼을 제출하면 시트에 행이 추가됩니다.

## 동작 확인

- 웹 앱 URL을 브라우저에서 그냥 열면 `RIFE partner application endpoint is running.` 이 보이면 정상.
- 랜딩에서 실제 신청 제출 → 시트에 `접수일시 / 매장 이름 / 대표자 성함 / 연락처 / 매장 지역 / 인스타·네이버 링크 / 남기실 말씀` 한 줄 추가.

## 참고 / 주의

- 코드를 수정하면 **배포 → 배포 관리 → 기존 배포 편집 → 버전 "새 버전"** 으로 다시 배포해야 반영됩니다. (URL은 유지)
- 브라우저 폼은 `mode:"no-cors"`로 보냅니다. Apps Script 웹앱이 CORS 응답 헤더를 주지 않아 응답 본문은 읽지 못하지만, **행 추가는 정상 동작**합니다. 성공 화면은 전송 직후 낙관적으로 표시됩니다.
- 연락처는 앞자리 `0` 이 사라지지 않도록 시트에 텍스트로 저장됩니다.
- 새 필드를 추가하려면: 폼(HTML) → `data` 객체 → `HEADERS` → `appendRow` 순서로 같이 맞춰주세요.
