# 파트너 신청 폼 → 구글 시트 연동 (배포 완료)

신청 폼 데이터가 아래 시트로 수집됩니다.

- **시트**: 리프 파트너 신청 (Partner Applications)
  https://docs.google.com/spreadsheets/d/1yUrTxyjgxXa4GzbdlXMMXqx0JaC4URtpxUjW5qLVFmo/edit
- **Apps Script 프로젝트**(official.rife@gmail.com 소유):
  https://script.google.com/d/1ztgnhCG7XeK0hNjrUXizDjVdLgKDMSCorQgwsLGulcvwH1K2FYAiFveJ/edit
- **웹앱 엔드포인트(/exec)** — `index.html`의 `SHEET_ENDPOINT`에 연결됨:
  https://script.google.com/macros/s/AKfycbxMR4y0zg0UHB9qqj8g4tKLNkxhyctbA0I9ZgmwvwY32epiI9swlEgw4qSxxEvt_KPq/exec

`clasp`로 코드 업로드 + 웹앱 배포(익명 접근 허용)까지 완료했습니다. 소스는 `apps-script-deploy/`에 있습니다.

## ⚠️ 마지막 1회: 스코프 승인 (official.rife@gmail.com 계정)

웹앱이 시트에 쓰려면 소유자 계정의 최초 권한 승인이 한 번 필요합니다. (구글 보안 정책 — 코드로 대신 못 함)

1. 편집기 열기 → https://script.google.com/d/1ztgnhCG7XeK0hNjrUXizDjVdLgKDMSCorQgwsLGulcvwH1K2FYAiFveJ/edit
2. 상단 함수 목록에서 **`authorize`** 선택 → **실행(Run)**.
3. 권한 요청 팝업 → 계정 선택 → "고급 → 안전하지 않음(이동)" → **허용**.

승인 후에는 폼 제출이 자동으로 시트에 기록됩니다. (재배포 불필요)

## 수집 항목 (열 순서)

`접수일시 · 매장 이름 · 대표자 성함 · 연락처 · 매장 지역 · 인스타그램 계정 · 네이버 플레이스 링크 · 남기실 말씀`

## 코드 수정 후 재배포

```
cd apps-script-deploy
clasp push -f
clasp deploy --deploymentId AKfycbxMR4y0zg0UHB9qqj8g4tKLNkxhyctbA0I9ZgmwvwY32epiI9swlEgw4qSxxEvt_KPq --description "vN"
```
(같은 deploymentId로 재배포하면 /exec URL이 유지됩니다.)
