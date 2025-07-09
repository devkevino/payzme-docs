
# 💸 Payzme 프로젝트

Payzme는 **Web3Auth 기반 로그인**, **웹 마이닝**, **레퍼럴 보상**, 그리고 **크립토카드 발급 및 사용**을 제공하는 Web3 기반 사용자 참여형 리워드 플랫폼입니다. 사용자는 활동을 통해 포인트를 적립하고, 이를 Payme 토큰으로 교환하거나 카드에서 직접 사용할 수 있습니다.

---

## 🚀 주요 기능

| 기능                 | 설명                                                                          |
|----------------------|-------------------------------------------------------------------------------|
| ✅ Web3 로그인         | Web3Auth를 통한 지갑 기반 로그인                                              |
| ✅ 웹 마이닝           | 사용 시간에 따라 포인트 적립                                                   |
| ✅ 마이닝 부스터       | 로그인 보상, KYC 인증, 소셜 연동 등 조건별 보너스 부여                         |
| ✅ 친구 추천(레퍼럴)   | 추천코드를 통한 가입 시 추천자와 가입자 모두에게 보상                          |
| ✅ 카드 신청 및 조회    | Rain API 연동을 통해 가상카드 신청 및 사용 내역 조회                            |
| ✅ 관리자 페이지       | 사용자, 세션, 카드 신청 현황 및 리워드 데이터를 확인하고 관리할 수 있는 관리자 UI |

---

## 🧱 시스템 구성

- **프론트엔드**: React + Vite + TailwindCSS (Vercel 배포)
- **백엔드**: Supabase Edge Functions (Node.js), Supabase DB (PostgreSQL), NodeJS
- **인증**: Web3Auth + Supabase Auth
- **외부 연동**: Rain API, Moralis, Infura
- **배포 및 도메인**: Vercel + GoDaddy

---

## 📦 기술 스택

| 항목        | 사용 기술                                 |
|-------------|--------------------------------------------|
| Frontend    | React, Vite, TailwindCSS                  |
| Backend     | Supabase Edge Functions, PostgreSQL, NodeJS       |
| Auth        | Web3Auth, Supabase Auth                   |
| API 연동    | Rain (카드), Moralis/Infura (Web3)        |
| Infra       | Vercel 배포, GoDaddy 도메인               |

---

## 🧭 프로젝트 로드맵

| 버전   | 주요 기능                             | 일정              |
|--------|----------------------------------------|-------------------|
| v1.0   | 로그인 + 마이닝                        | 2025년 9월 초     |
| v1.1   | 레퍼럴 기능                            | 2025년 9월 말     |
| v1.2   | 관리자 페이지                          | 2025년 11월 중    |
| v2.0   | 카드 연동 기능                         | 2025년 11월 말    |
| v3.0   | 포인트 → Payme 토큰 스왑 기능          | 2025년 12월 ~ Q1  |

---

## 📂 디렉토리 구조 (예시)

```
/payzme
├── /frontend         # React + Vite + Tailwind
├── /supabase         # Supabase DB 및 Edge Functions
├── /docs             # 프로젝트 문서
├── .env              # 환경변수
└── README.md
```

---

## 👨‍💻 참여자

- 기획 및 총괄
- 프론트엔드 개발
- 백엔드/블록체인 연동
- 블록체인 개발
- UI/UX 디자인

---

## 📬 문의

kevin@xxx.xxx

---

