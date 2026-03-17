# IBK 대시보드

IBK 계좌 관리 대시보드 — React + TypeScript로 구현한 CRUD 웹 애플리케이션입니다.

## 기능

- 로그인 / 로그아웃 (Zustand + localStorage 기반 상태 유지)
- 계좌 목록 조회 및 통계 (총 계좌 수, 활성 계좌, 총 잔액)
- 계좌 등록 / 상세 조회 / 수정 / 삭제
- 인증 기반 라우트 보호 (ProtectedRoute)

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | React 18, TypeScript |
| 빌드 도구 | Vite 6 |
| 라우팅 | React Router v7 |
| 상태 관리 | Zustand |
| HTTP 클라이언트 | Axios |
| 스타일링 | Tailwind CSS v4 |
| Mock API | json-server |

## 프로젝트 구조

```
src/
├── api/            # Axios API 클라이언트
├── components/     # 재사용 컴포넌트 (AccountCard, ProtectedRoute)
├── pages/          # 페이지 컴포넌트 (Login, AccountList, AccountCreate, AccountDetail)
├── routes/         # React Router 설정
├── stores/         # Zustand 스토어
└── types/          # TypeScript 인터페이스
```

## 시작하기

### 설치

```bash
npm install
```

### 실행

개발 서버와 Mock API 서버를 각각 실행합니다.

```bash
# Mock API 서버 (port 4000)
npm run server

# 개발 서버 (별도 터미널)
npm run dev
```

### 빌드

```bash
npm run build
```
