# My Asset

여러 은행 계좌를 한곳에서 등록하고, 자산 현황과 입출금 내역을 차트와 표로 확인하는 통합 계좌 관리 웹입니다.

## 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 기간 | 2025.07.08 ~ 2025.07.21 (2주) |
| 성격 | 입사 온보딩 과제 |
| 인원 | 1명 (화면 설계, 프론트엔드, 백엔드 API, DB 구성) |

입사 후 온보딩 과제로 진행한 프로젝트입니다. 금융 데이터를 다루는 화면을 처음부터 끝까지 직접 만들어 보기 위해, 화면 설계부터 프론트엔드, Express 기반 API, MySQL 구성까지 혼자 진행했습니다. 처음에는 목데이터로 화면을 만들고, 이후 직접 만든 API로 바꿔 연동했습니다.

## 주요 기능

- **로그인:** Firebase를 이용한 Google 로그인, 로그인하지 않은 사용자는 접근할 수 없도록 라우트 보호
- **홈:** 전체 자산 요약, 이번 달 입출금 내역, 안내 카드
- **계좌 목록:** 등록한 계좌를 표로 조회하고, 계좌 유형별 자산 구성을 도넛 차트로, 월별 자산 변화를 막대 차트로 표시
- **계좌 등록, 수정, 삭제:** 계좌번호 형식 검사(13자리 숫자), 이미 등록된 계좌번호와 삭제된 계좌번호 등록 차단
- **계좌 상세:** 계좌별 거래 내역을 검색, 정렬, 페이지 단위로 조회

## 구현하며 신경 쓴 점

- **차트 데이터를 API 응답에서 계산:** 거래 내역을 월과 계좌 유형별로 묶고, 입금은 더하고 출금은 빼서 월별 자산 변화를 계산했습니다. 자산 구성 차트도 계좌 잔액을 기준으로 계산해, 목데이터가 아닌 실제 데이터와 맞도록 바꿨습니다.
- **삭제한 데이터 보존:** 계좌를 삭제하면 행을 지우지 않고 삭제 일시를 기록하며, 연결된 거래 내역도 함께 삭제 처리했습니다. 삭제된 계좌번호는 다시 등록할 수 없도록 막았습니다.
- **입력 검증과 오류 안내:** react-hook-form과 yup으로 폼을 검증하고, 서버에서도 계좌번호 중복(409)과 잘못된 요청(400)을 구분해 응답하도록 했습니다.
- **목록 상태를 URL에 저장:** 검색어, 정렬, 페이지를 쿼리 파라미터로 관리해 새로고침하거나 뒤로 가도 같은 화면이 유지되도록 했습니다.
- **역할별로 코드 분리:** API 호출은 TanStack Query 기반 커스텀 훅으로, 차트 데이터 계산은 별도 훅으로 나눴고, 자주 쓰는 공통 컴포넌트에는 메모이제이션을 적용했습니다.

## 기술 스택

| 구분 | 기술 |
|---|---|
| 프론트엔드 | React 18, TypeScript, Vite, Tailwind CSS, Ant Design |
| 상태와 데이터 | TanStack Query, Zustand, React Router |
| 차트와 표 | visx, TanStack Table |
| 폼 | react-hook-form, yup |
| 인증 | Firebase Authentication (Google) |
| 백엔드 | Node.js, Express |
| DB | MySQL 8.0 (Docker Compose) |

## 폴더 구조

```
my-asset
├── backend
│   ├── routes          # account, account-history API
│   ├── db.js           # MySQL 커넥션 풀
│   └── docker-compose.yml
└── frontend
    └── src
        ├── pages        # home, account, accountDetail, login
        ├── components   # 공통 컴포넌트, 레이아웃, 차트, 표
        ├── hooks        # API 훅, 차트 데이터 계산 훅
        ├── validators   # yup 스키마
        └── services     # Firebase
```

## API

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | /account | 계좌 목록 조회 |
| GET | /account/:id | 계좌 상세 조회 |
| POST | /account | 계좌 등록 |
| PATCH | /account | 계좌 수정 |
| DELETE | /account/:id | 계좌 삭제 (삭제 일시 기록) |
| GET | /account-history | 전체 거래 내역 조회 |
| GET | /account-history/:accountId | 계좌별 거래 내역 조회 (검색, 정렬, 페이지) |

## 실행 방법

### 1. DB 실행

```bash
cd backend
# MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD 환경변수 설정 후
docker compose up -d
```

### 2. 백엔드 실행

```bash
cd backend
npm install
npm start   # http://localhost:3000
```

### 3. 프론트엔드 실행

`frontend/.env`에 아래 값을 설정합니다.

```
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
```

```bash
cd frontend
npm install
npm run dev
```

## 앞으로 보완할 점

- 테이블 생성 스크립트와 샘플 데이터 추가
- 백엔드 DB 접속 정보를 환경변수로 분리
- 주요 화면 테스트 코드 작성
