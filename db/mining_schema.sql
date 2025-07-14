
-- 유저 마이닝 테이블
CREATE TABLE mining_users (
    user_id UUID PRIMARY KEY,
    hash_power DECIMAL DEFAULT 1.0, -- 마이닝 시작 당시 해시파워
    total_reward DECIMAL DEFAULT 0,
    mining_duration DECIMAL DEFAULT 86400, -- 마이닝 시간 (초)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 마이닝 세션 테이블 : 해시파워 기록, 보상 누적, 마지막 정산 시각 포함
CREATE TABLE mining_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    pending_reward DECIMAL DEFAULT 0,
    last_hash_power DECIMAL DEFAULT 1.0, -- 마지막 해시파워 (hash_power + 미션 보상)
    last_reward DECIMAL DEFAULT 0, -- 마지막 보상 금액
    mining_start_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 마이닝 시작 시간
    mining_end_at TIMESTAMP NOT NULL, -- 마이닝 종료 시간 (mining_start_at + user_mining.mining_duration)
    mining_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 마지막으로 보상을 누적한 시점
    -- mining_end_at - mining_updated_at = 남은 마이닝 시간으로 현재 리워드 예상 계산 + pending_reward
    status TEXT DEFAULT 'active', -- active, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 미션 정의 테이블
CREATE TABLE mining_missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL, -- ex: login_bonus, referral, kyc_complete
    description TEXT,
    hash_power_bonus DECIMAL NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 유저 미션 세션 테이블 (미션 적용 상태)
CREATE TABLE mining_mission_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    mission_id UUID REFERENCES mission_definitions(id) ON DELETE CASCADE,
    is_applied BOOLEAN DEFAULT TRUE, -- 적용된 경우만 hash_power에 반영
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    removed_at TIMESTAMP, -- 비활성화 시각
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
