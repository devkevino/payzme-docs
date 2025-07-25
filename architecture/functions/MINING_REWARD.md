
# 📘 Payzme 마이닝 보상 로직 설계

## 🎯 목적

사용자가 웹 기반 마이닝 활동을 통해 포인트를 획득하며, 이 포인트는 추후 Payme 토큰으로 스왑될 수 있는 보상 시스템입니다.

---

## 🧱 기본 구성요소

| 요소              | 설명                                                  |
|-------------------|-------------------------------------------------------|
| 마이닝 세션       | 사용자가 마이닝을 시작하고 종료할 때 기록됨           |
| 해시레이트         | 마이닝 중 계산된 사용자별 성능 지표                    |
| 부스터            | 마이닝 보상에 추가 보너스를 제공하는 조건부 기능       |
| 포인트             | DB에 누적되며, 추후 Payme 토큰과 교환 가능             |
| 일일 보상 제한     | 하루 적립 가능한 최대 리워드를 제한하는 룰 적용 가능   |

---

## ⚙️ 마이닝 세션 흐름

1. 사용자가 로그인 후 "마이닝 시작" 버튼 클릭
2. 마이닝 세션 시작 시간 기록 (`start_time`)
3. 일정 시간 후 "마이닝 종료" 또는 자동 종료
4. 마이닝 세션 종료 시간 기록 (`end_time`)
5. 다음 기준에 따라 보상 포인트 계산 및 적립
6. `mining_sessions` 테이블에 보상 내역 저장

---

## 📐 보상 포인트 계산 공식

```
보상 = 기본포인트 × 해시레이트 × 효율 × 부스터보너스
```

| 항목           | 설명                                             |
|----------------|--------------------------------------------------|
| 기본포인트     | 예: 0.1 point / 초                                |
| 해시레이트     | 1.0 ~ 3.0 (기본값 1.0)                             |
| 효율           | 활동 기여도 비율 (예: 0.8 ~ 1.0)                   |
| 부스터보너스   | 최대 +50%까지 (레퍼럴, KYC, 연속 로그인 등 적용)  |

---

## 🎁 부스터 보너스 조건 예시

| 부스터 조건     | 추가 보너스율 |
|----------------|----------------|
| KYC 완료        | +20%           |
| 소셜 연동       | +10%           |
| 연속 로그인 3일 | +5%            |
| 레퍼럴 활동     | +15%           |

> 💡 부스터는 boosters 테이블에 별도로 관리되며, 실시간 조합 가능

---

## 🔒 제약 조건

- 마이닝은 **1회 최대 30분**까지 지속 가능
- 하루 **최대 3회 세션**
- 하루 **최대 누적 포인트**는 `config_settings`에 저장된 정책으로 제한 가능

---

## 🛠️ 백엔드 처리 예시 (의사코드)

```python
def calculate_reward(session):
    base = 0.1  # 기본 포인트 per second
    duration = session.duration
    hash_rate = session.hash_rate or 1.0
    efficiency = session.efficiency or 1.0
    booster_bonus = get_total_booster_multiplier(session.user_id)  # 예: 1.3

    reward = base * duration * hash_rate * efficiency * booster_bonus
    return round(reward, 4)
```

---

## ✅ 저장 위치 및 흐름

- 포인트는 `mining_sessions.reward_point` 필드에 기록
- 사용자별 포인트 합계는 매번 계산하거나, `user_rewards` 테이블로 누적 저장 가능 (선택)

---

## 🧾 참고사항

- 토큰 스왑 기능은 별도 컨트랙트 또는 프론트 기능으로 분리
- 포인트 → Payme 전환 비율은 정책으로 결정 (예: 100 point = 1 Payme)
