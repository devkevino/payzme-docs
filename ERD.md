
# 🗂️ Payzme ERD 설계 문서

## 📌 개요
Payzme 프로젝트의 핵심 데이터베이스 테이블을 ERD(Entity Relationship Diagram) 기반으로 설계한 문서입니다. 마이닝, 부스터, 카드, 트랜잭션, 레퍼럴 등 주요 기능을 모두 반영합니다.

---

## 📄 테이블 정의

### 1. `users`

| 컬럼명         | 타입        | 설명                     |
|----------------|-------------|--------------------------|
| `id`           | UUID (PK)   | 사용자 고유 ID           |
| `wallet_address` | TEXT      | Web3Auth 기반 지갑주소   |
| `email`        | TEXT        | 이메일 주소 (선택사항)  |
| `created_at`   | TIMESTAMP   | 가입일시                 |
| `is_active`    | BOOLEAN     | 계정 활성 여부           |

---

### 2. `mining_sessions`

| 컬럼명         | 타입        | 설명                         |
|----------------|-------------|------------------------------|
| `id`           | UUID (PK)   | 마이닝 세션 ID               |
| `user_id`      | UUID (FK)   | 사용자 ID (`users.id`)       |
| `start_time`   | TIMESTAMP   | 마이닝 시작 시간             |
| `end_time`     | TIMESTAMP   | 마이닝 종료 시간             |
| `duration`     | INTEGER     | 지속 시간(초)                |
| `reward_point` | DECIMAL     | 획득한 포인트 (토큰 아님)    |
| `hash_rate`    | DECIMAL     | 해시레이트                   |
| `efficiency`   | DECIMAL     | 효율성                       |
| `status`       | TEXT        | 상태 (예: completed, failed) |

---

### 3. `referrals`

| 컬럼명         | 타입        | 설명                          |
|----------------|-------------|-------------------------------|
| `id`           | UUID (PK)   | 레퍼럴 ID                    |
| `referrer_id`  | UUID (FK)   | 초대한 사용자 ID (`users.id`) |
| `referred_id`  | UUID (FK)   | 초대된 사용자 ID (`users.id`) |
| `created_at`   | TIMESTAMP   | 초대일자                      |

---

### 4. `boosters`

| 컬럼명         | 타입        | 설명                            |
|----------------|-------------|---------------------------------|
| `id`           | UUID (PK)   | 부스터 상태 ID                  |
| `user_id`      | UUID (FK)   | 사용자 ID (`users.id`)          |
| `booster_type` | TEXT        | 부스터 종류 (예: kyc, social)   |
| `status`       | BOOLEAN     | 활성화 여부                     |
| `updated_at`   | TIMESTAMP   | 마지막 업데이트 시간             |

> 🔁 확장 가능: 부스터 항목은 동적으로 추가/삭제 가능하도록 설계

---

### 5. `cards`

| 컬럼명         | 타입        | 설명                          |
|----------------|-------------|-------------------------------|
| `id`           | UUID (PK)   | 카드 ID                       |
| `user_id`      | UUID (FK)   | 사용자 ID (`users.id`)        |
| `card_number`  | TEXT        | 카드 번호 (마스킹 저장 권장)  |
| `status`       | TEXT        | 상태 (예: 신청, 발급완료 등)  |
| `issued_at`    | TIMESTAMP   | 발급 일시                     |

---

### 6. `card_transactions`

| 컬럼명         | 타입        | 설명                             |
|----------------|-------------|----------------------------------|
| `id`           | UUID (PK)   | 거래 ID                          |
| `card_id`      | UUID (FK)   | 카드 ID (`cards.id`)             |
| `type`         | TEXT        | 거래 유형 (결제, 충전 등)       |
| `amount`       | DECIMAL     | 거래 금액                        |
| `currency`     | TEXT        | 통화 (예: USD)                   |
| `created_at`   | TIMESTAMP   | 거래 일시                        |

---

## 🔗 관계 요약

- `users` 1 : N `mining_sessions`
- `users` 1 : N `boosters`
- `users` 1 : N `referrals` (양방향)
- `users` 1 : N `cards`
- `cards` 1 : N `card_transactions`

---

## 📝 참고사항

- 마이닝 리워드는 실시간 토큰 지급이 아닌 **포인트 적립 방식**으로 구성되며, 추후 스왑 기능을 통해 전환 예정
- 카드 상태 및 잔액은 Rain API에서 관리하므로 DB에는 **기초 정보만 저장**
- 관리자 구분은 별도 테이블 없이 Web3Auth 로그인 후 **admin 여부로 권한 판단**
