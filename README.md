# Handoff: 리프(Rife) 카페 파트너 모집 랜딩페이지 — 모바일 + 웹

## Overview
개인 카페 사장님 대상 B2B 파트너(입점) 모집 랜딩페이지. 목표는 "파트너 신청하기" 클릭 → 신청 폼(https://rife.imweb.me/empartners) 이동. 모바일/웹(데스크톱) 두 버전을 개발·배포한다.

## About the Design Files
이 번들의 파일은 **HTML로 제작된 디자인 레퍼런스**이며 프로덕션 코드가 아니다.
과제는 이 디자인을 **대상 코드베이스의 기존 환경(React/Next 등)과 패턴으로 재구현**하는 것. 환경이 없다면 정적 랜딩에 적합한 프레임워크(예: Next.js 정적 페이지)를 선택해 구현한다.

- `mobile/rife-partners-mobile.dc.html` — 모바일 버전의 완성 디자인 소스. 커스텀 런타임(`<x-dc>`, `{{ }}` 홀, `sc-for`/`sc-if`, `x-import`)을 쓰므로 그대로 열리지 않는다. **마크업과 inline style을 스펙으로 읽어라** — 모든 색·크기·간격·카피가 이 파일에 그대로 들어 있다. `x-import ...Button`은 아래 "Buttons" 스펙의 버튼 컴포넌트로 치환.
- `web/rife-partners-web.png` — 웹(데스크톱) 버전의 확정 디자인 (1080×5430). **픽셀 기준 레퍼런스**로 사용.
- `tokens/*.css` — 디자인 시스템 토큰 원본 (colors / typography / spacing).
- `assets/` — 아이콘 SVG 2종(방문·매출), 인증 배지 일러스트 PNG.

## Fidelity
**High-fidelity.** 두 버전 모두 최종 카피·색·타이포·간격 확정본. 픽셀 수준으로 재현할 것. 카피는 절대 수정 금지 (오탈자처럼 보여도 원문 유지).

## Two versions
- **모바일** (≤480px): `mobile/rife-partners-mobile.dc.html` 기준. 라이트 테마(페이퍼 `#fcfbf8`), 콘텐츠 max-width 480px 중앙 정렬, 하단 고정 CTA 바 포함.
- **웹** (데스크톱, ~1080px+): `web/rife-partners-web.png` 기준. 다크 브라운 테마. 섹션 구성은 모바일과 동일한 순서/카피.
- 라우팅: 하나의 반응형 페이지로 구현하되, 두 브레이크포인트에서 각 레퍼런스와 일치해야 한다. (모바일 ≤480px = 모바일 디자인, ≥1024px = 웹 PNG 디자인)

## Screens / Sections (공통 순서)
1. **상단 바** — "RIFE" 로고(15px/700/tracking 0.18em) + 우측 마이크로 라벨 "Partners · 입점 안내"
2. **히어로** — 오렌지 도트+eyebrow, H1 30px(모바일) "골목에서 장사하는 개인 카페가 직장인 테이크아웃 고객을 만드는 방법." (오렌지 강조), 서브카피, primary CTA, 통계 3열: 250+ 함께하는 로컬 카페 / 6,000+ 누적 구독자 / 6억원+ 누적 거래액
3. **왜 리프인가** — 번호 리스트 4개(이런 사장님을 위해) + 잉크 박스(재방문율 27%→93%, "매달 150만원의 추가 매출")
4. **리프가 하는 일** — 선불 결제 설명, 아이콘 카드 2개(월 추가 방문 690회 / 월 추가 매출 1,672,000원), "RIFE — 월 정산서" 카드(자동결제 30명 / 1,497,000원 / 175,000원+ / 고정 매출 1,672,000원), 도입 전후 라인 차트 SVG
5. **리프 시작 후** — 혜택 카드 4개 (01 고정 단골 / 02 잠들어도 고정 매출 / 03 전용 마케팅 채널 / 04 재방문 데이터)
6. **어떻게 시작하나요** — 3단계 (01 신청 / 02 상담 / 03 오픈), 번호 26px 오렌지
7. **성공사례** — 결제 금액 랭킹 테이블 6행(누****** 29,391,100원 … 몬***** 12,874,500원, 오렌지 게이지 바 100%→44%) + 인용 카드 2개(연희동/서교동, 좌측 2px 오렌지 보더)
8. **지금 시작해야 하는 이유** — → 화살표 리스트 4개 (416잔 / 메가커피 2,000원 / 커피 루틴 / 선착순)
9. **선별/인증** — 오렌지 인증 배지 카드(서교동, 단골 방문 10,000회+, img-04 일러스트) + 선별 정책 본문
10. **최종 CTA** — 중앙 정렬, accent(오렌지) 버튼 + "심사 후 개별 연락 · 선착순 입점 · 입점비 없음"
11. **푸터** — "개인 카페 매출 성장 시스템, 리프(rife)" / "(주)메이크세렌디 · 동네 카페 구독 파트너십"
12. **(모바일만) 하단 고정 CTA** — fixed bottom bar, paper 배경 + 헤어라인 top, safe-area-inset 대응

정확한 카피/수치/스타일은 전부 dc.html 파일 안에 있다. 웹 버전 레이아웃(다열 그리드 등)은 PNG를 따른다.

## Interactions & Behavior
- 모든 "파트너 신청하기" 버튼 → `window.open("https://rife.imweb.me/empartners", "_blank", "noopener")` (URL은 env/설정으로 분리 권장)
- 모바일 하단 고정 CTA는 항상 노출 (히어로 통과 후에만 노출하는 변형도 무방하나 기본은 항상)
- 호버: 색 전환 0.16s ease만. ripple/scale/glow 금지
- 그 외 상태(로딩/에러/폼)는 없음 — 정적 랜딩

## Design Tokens (모바일 = Rife App DS 2.0 "화이트 에디토리얼")
Colors: bg `#fcfbf8` · surface `#ffffff` · surface-2 `#f6f4ee` · ink `#191712` · ink-2 `#4a463d` · ink-3 `#85806f` · ink-4 `#b5b0a0` · hairline `#e7e4da` · soft divider `#f0eee6` · accent `#f14b00` (pressed `#d64300`) · on-ink `#fcfbf8`
Typography: **Pretendard Variable** 전용 (숫자 포함 — 이 페이지는 세리프 숫자 미사용). H1 30px/1.28/-0.02em/700 · H2 24px/1.3/700 · 본문 14–15px/1.6 · micro label 10px/600/uppercase/0.22em tracking
Spacing: 4px 그리드 · 좌우 패딩 20px · 섹션 간격 56px(섹션은 1px ink top rule + 14px로 시작)
Radius: 2px (카드/버튼/배지) · 그림자 금지, 구분은 1px 헤어라인
웹(다크) 버전 색은 PNG에서 샘플링: 다크 브라운 배경 계열 + 동일 오렌지 `#f14b00` 계열.

## Buttons
- **primary**: ink `#191712` 채움, 텍스트 `#fcfbf8`, 높이 48px, radius 2px, 15px/600
- **accent**: 오렌지 `#f14b00` 채움 (화면당 1개 원칙 — 최종 CTA에 사용), pressed `#d64300`
- hover는 0.16s 색 전환만

## Assets
- `assets/icon-visit.svg` / `assets/icon-revenue.svg` — 혜택 지표 카드용 20×20 라인 아이콘 (dc.html에는 동일 SVG가 인라인으로도 포함)
- `assets/img-04-badge-illust.png` — 서교동 인증 배지 안 일러스트
- 폰트: Pretendard Variable (CDN: cdn.jsdelivr.net/gh/orioncactus/pretendard) — tokens/typography.css 참고

## Files
- `mobile/rife-partners-mobile.dc.html` — 모바일 hi-fi 디자인 소스 (마크업+inline style = 스펙)
- `web/rife-partners-web.png` — 웹 hi-fi 디자인 (1080×5430)
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css`
- `assets/*`
