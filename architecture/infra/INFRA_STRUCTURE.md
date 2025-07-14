
# 🛠️ Payzme 인프라 구성 설계

## 🎯 개요

Payzme 프로젝트는 React 기반의 프론트엔드, Supabase를 활용한 백엔드, 그리고 Web3Auth 및 Rain API 연동을 포함하는 구조로 구성됩니다. 이 문서는 실제 서비스 운영을 위한 인프라 구성요소 및 관계를 정리한 문서입니다.

---

## 🧱 주요 인프라 구성요소

| 구성 항목        | 기술 스택 및 설명                                     |
|------------------|------------------------------------------------------|
| 프론트엔드       | React + Vite + Tailwind (Vercel에 배포)             |
| 인증             | Supabase Auth + Web3Auth                            |
| 백엔드 API       | Supabase Edge Functions (Node.js 기반, 서버리스)    |
| 백엔드 Service    | Blockchain Event Webhook Server    |
| 데이터베이스     | Supabase PostgreSQL                                 |
| 카드 연동 API    | Rain (외부 카드 API 연동)                            |
| 블록체인 연동    | Moralis, Infura                                      |
| 도메인           | GoDaddy에서 관리                                     |
| 배포             | Vercel (정적 웹사이트 + EdgeFunction 자동 연동)     |
| 보안 및 인증     | JWT (Supabase) + Web3Auth 세션                       |
| CI/CD            | 없음 (Vercel 수동 배포 사용)                        |
| API Key 저장     | 별도 Vault 없음 (환경변수로 관리)                   |

---

## 🔗 시스템 간 관계 흐름

```
사용자 브라우저
    │
    ▼
React + Vite 프론트엔드 (Vercel 배포)
    │
    ▼
Web3Auth → Supabase Auth 로그인
    │
    ▼
Supabase Edge Function (API 처리)
    ├─▶ Supabase DB
    ├─▶ Rain API (카드 신청 등)
    └─▶ Infura / Moralis (Web3 트래킹)
```

---

## 🔒 인증 및 보안 흐름

- Web3Auth로 로그인 시 Supabase 인증 자동 연동
- 인증 토큰은 JWT 방식으로 발급
- 프론트엔드에서 Supabase API 호출 시 Bearer 토큰 사용
- 환경변수에 API Key/Secret을 설정해 Rain, Moralis 등 연동

---

## 🌍 도메인 및 배포

| 항목          | 내용                    |
|---------------|-------------------------|
| 도메인        | GoDaddy에서 등록 및 관리 |
| CDN 및 배포    | Vercel을 통한 글로벌 CDN |
| SSL 인증서     | Vercel에서 자동 제공     |

---

## 📦 서버 구성 요약

| 계층          | 구성                    |
|---------------|-------------------------|
| 클라이언트    | React SPA (Vercel)      |
| 백엔드        | Supabase Edge Functions |
| 데이터 저장소 | Supabase PostgreSQL     |
| 기타 서버     | Blockchain Webhook (Node) |

---

## 📝 참고사항

- API Key는 환경변수에 직접 설정
- 서버리스 구조로 인해 수직 확장이 용이
- 추가 모니터링은 Supabase Dashboard를 통해 가능
