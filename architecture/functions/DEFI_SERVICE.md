# 📘 Payzme DeFi 서비스 (Yearn Vaults 연동) 설계

## 🎯 목적

사용자가 Payzme 플랫폼을 통해 Yearn Vaults에 예치(Deposit) 및 인출(Withdraw)하고, Vault 수익을 실시간으로 확인할 수 있는 DeFi 서비스 제공.

---

## 🧱 기본 구성요소

| 요소                | 설명                                                        |
|---------------------|-------------------------------------------------------------|
| Vault               | Yearn에서 제공하는 이자형 자산 풀                           |
| 예치(Deposit)       | 사용자가 Vault에 자산을 예치하는 트랜잭션                   |
| 인출(Withdraw)      | 사용자가 Vault에서 자산을 인출하는 트랜잭션                 |
| 수익(Profit)        | Vault 예치 기간 동안 발생한 이자 수익                        |
| Vault 정보          | 연동된 Yearn Vault의 상태, APY, 예치 가능 자산 등            |
| 트랜잭션 기록       | 예치/인출/수익 내역을 기록하는 DB 테이블                     |

---

## ⚙️ 서비스 흐름

1. 사용자가 Payzme에서 Yearn Vault 목록 조회
2. 원하는 Vault 선택 후 예치(Deposit) 또는 인출(Withdraw) 요청
3. Web3 지갑(예: Web3Auth)으로 트랜잭션 서명 및 실행
4. 트랜잭션 결과 및 수익 정보 실시간 조회
5. 모든 내역은 `yearn_vaults`, `yearn_transactions` 테이블에 기록

---

## 📐 수익 계산 공식 (Yearn 기준)

```
수익 = (현재 Vault 잔액 - 예치 원금) × (1 - 수수료)
```

| 항목         | 설명                                 |
|--------------|--------------------------------------|
| Vault 잔액   | 사용자가 해당 Vault에 보유한 총 자산   |
| 예치 원금    | 최초 예치 시점의 자산                 |
| 수수료       | Yearn 및 Payzme 플랫폼 수수료 (정책)  |

---

## 🛡️ 제약 및 정책

- 예치/인출 최소 단위 및 최대 한도는 정책으로 제한 가능
- 지원 Vault는 Payzme에서 사전 선정
- 트랜잭션 수수료(가스비)는 사용자 부담
- Vault별 APY, 위험도 등 정보는 실시간 연동

---

## 🛠️ 백엔드 처리 예시 (의사코드)

```python
def deposit_to_vault(user, vault_id, amount):
    # Web3 연동으로 Yearn Vault에 예치 트랜잭션 실행
    tx_hash = yearn_api.deposit(vault_id, user.wallet, amount)
    save_transaction(user.id, vault_id, amount, 'deposit', tx_hash)
    return tx_hash

def get_vault_profit(user, vault_id):
    principal = get_user_principal(user.id, vault_id)
    current_balance = yearn_api.get_balance(vault_id, user.wallet)
    fee = get_platform_fee(vault_id)
    profit = (current_balance - principal) * (1 - fee)
    return profit
```

---

## ✅ 저장 위치 및 흐름

- Vault 정보: `yearn_vaults` 테이블
- 예치/인출 내역: `yearn_transactions` 테이블
- 수익 정보: 실시간 계산 또는 별도 캐싱 정책 적용 가능

---

## 🧾 참고사항

- Yearn Vaults 연동은 공식 API 및 스마트컨트랙트 호출 기반
- Vault별 지원 자산, APY, 위험도 등은 주기적으로 동기화 필요

--- 