import React, { useState } from 'react';
import { ChevronDown, Menu, X, Zap, Users, Gift, Wallet, Home, BarChart3, Settings, ExternalLink, Sun, Moon, CreditCard, Plus, ArrowUpRight, ArrowDownLeft, Copy, Eye, EyeOff } from 'lucide-react';

const PayzMeApp = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // 테마 관련 클래스 함수들
  const getThemeClasses = () => ({
    background: isDarkTheme 
      ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900' 
      : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50',
    
    cardBg: isDarkTheme 
      ? 'bg-slate-800/40 backdrop-blur-lg border-slate-700/50' 
      : 'bg-white/80 backdrop-blur-lg border-gray-200/50 shadow-lg',
    
    navBg: isDarkTheme 
      ? 'bg-slate-800/40 backdrop-blur-lg border-slate-700/50' 
      : 'bg-white/90 backdrop-blur-lg border-gray-200/50 shadow-lg',
    
    textPrimary: isDarkTheme ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkTheme ? 'text-slate-300' : 'text-gray-600',
    textMuted: isDarkTheme ? 'text-slate-400' : 'text-gray-500',
    
    accent: isDarkTheme ? 'text-cyan-400' : 'text-blue-600',
    accentBg: isDarkTheme ? 'bg-cyan-400' : 'bg-blue-600',
    gradientButton: isDarkTheme 
      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400' 
      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500',
    
    cardSecondary: isDarkTheme 
      ? 'bg-slate-700/30 border-slate-600/50' 
      : 'bg-gray-100/50 border-gray-300/50',
    
    progressBg: isDarkTheme ? 'bg-slate-700' : 'bg-gray-300',
    
    stars: isDarkTheme 
      ? ['bg-cyan-400', 'bg-purple-400', 'bg-blue-400', 'bg-cyan-300', 'bg-purple-300', 'bg-blue-300']
      : ['bg-blue-400', 'bg-purple-400', 'bg-indigo-400', 'bg-blue-300', 'bg-purple-300', 'bg-indigo-300']
  });

  const theme = getThemeClasses();

  // 테마 토글 버튼 컴포넌트
  const ThemeToggle = ({ className = "" }) => (
    <button
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${theme.textSecondary} hover:${theme.textPrimary} ${isDarkTheme ? 'hover:bg-slate-700/50' : 'hover:bg-gray-100/50'} ${className}`}
    >
      {isDarkTheme ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
      <span className="font-medium">{isDarkTheme ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );

  // 로그인 페이지
  // 로그인 페이지
  const LoginPage = () => (
    <div className={`min-h-screen relative overflow-hidden ${theme.background}`}>
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-10 w-2 h-2 ${theme.stars[0]} rounded-full animate-pulse`}></div>
        <div className={`absolute top-40 right-20 w-1 h-1 ${theme.stars[1]} rounded-full animate-pulse`}></div>
        <div className={`absolute bottom-32 left-20 w-1.5 h-1.5 ${theme.stars[2]} rounded-full animate-pulse`}></div>
        <div className={`absolute bottom-20 right-32 w-1 h-1 ${theme.stars[3]} rounded-full animate-pulse`}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className={`rounded-3xl p-8 border max-w-md w-full ${theme.cardBg}`}>
          {/* 로고 */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 ${theme.gradientButton} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${theme.textPrimary}`}>PayzMe</h1>
            <p className={theme.textSecondary}>Connect your wallet to start mining</p>
          </div>

          {/* 로그인 버튼 */}
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full ${theme.gradientButton} text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg`}
          >
            Connect with Web3Auth
          </button>

          <div className="mt-6 text-center">
            <p className={`${theme.textMuted} text-sm`}>
              By connecting, you agree to our Terms of Service
            </p>
          </div>

          {/* 로그인 페이지에서만 테마 토글 */}
          <div className="mt-6 flex justify-center">
            <ThemeToggle className="!w-auto px-6" />
          </div>
        </div>
      </div>
    </div>
  );

  // 네비게이션 메뉴
  const Navigation = () => {
    const navItems = [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'mining', icon: Zap, label: 'Mining' },
      { id: 'referral', icon: Users, label: 'Referral' },
      { id: 'card', icon: CreditCard, label: 'Card' },
    ];

    return (
      <>
        {/* 데스크톱 네비게이션 */}
        <nav className={`hidden lg:flex flex-col w-64 ${theme.navBg} border-r min-h-screen p-6`}>
          <div className="flex items-center mb-8">
            <div className={`w-10 h-10 ${theme.gradientButton} rounded-xl flex items-center justify-center mr-3`}>
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-xl font-bold ${theme.textPrimary}`}>PayzMe</h1>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  currentPage === item.id
                    ? isDarkTheme 
                      ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30'
                      : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 border border-blue-500/30'
                    : `${theme.textSecondary} hover:${theme.textPrimary} ${isDarkTheme ? 'hover:bg-slate-700/50' : 'hover:bg-gray-100/50'}`
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-3">
            <div className={`${theme.cardSecondary} rounded-xl p-4 border`}>
              <div className="flex items-center space-x-3 mb-2">
                <Wallet className={`w-5 h-5 ${theme.accent}`} />
                <span className={`${theme.textPrimary} font-medium`}>0.0 ETH</span>
              </div>
              <p className={`${theme.textMuted} text-sm`}>0x45E...59Da6</p>
            </div>
            
            <ThemeToggle />
          </div>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className={`lg:hidden fixed top-4 left-4 z-50 ${theme.cardBg} p-3 rounded-xl`}
        >
          <Menu className={`w-6 h-6 ${theme.textPrimary}`} />
        </button>

        {/* 모바일 네비게이션 */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden fixed inset-0 z-50 ${isDarkTheme ? 'bg-slate-900/90' : 'bg-gray-900/90'} backdrop-blur-lg`}>
            <div className={`${isDarkTheme ? 'bg-slate-800/95' : 'bg-white/95'} backdrop-blur-lg w-80 max-w-full h-full p-6`}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className={`w-10 h-10 ${theme.gradientButton} rounded-xl flex items-center justify-center mr-3`}>
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h1 className={`text-xl font-bold ${theme.textPrimary}`}>PayzMe</h1>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className={`w-6 h-6 ${theme.textPrimary}`} />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      currentPage === item.id
                        ? isDarkTheme 
                          ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30'
                          : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 border border-blue-500/30'
                        : `${theme.textSecondary} hover:${theme.textPrimary} ${isDarkTheme ? 'hover:bg-slate-700/50' : 'hover:bg-gray-100/50'}`
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-600/50">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // 레퍼럴 페이지

  // 대시보드 페이지
  const DashboardPage = () => (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${theme.textPrimary}`}>Dashboard</h1>
          <p className={theme.textSecondary}>Welcome back! Here's your mining overview.</p>
        </div>
        <div className={`mt-4 lg:mt-0 ${theme.cardBg} rounded-xl px-4 py-2 border`}>
          <span className={`${theme.accent} font-medium`}>🟢 Mining Active</span>
        </div>
      </div>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Rewards', value: '1,250.5 PZM', change: '+12.5%' },
          { label: 'Hash Power', value: '45.2 H/s', change: '+8.2%' },
          { label: 'Mining Time', value: '72h 45m', change: '+2.1%' },
          { label: 'Referrals', value: '23', change: '+4' },
        ].map((stat, index) => (
          <div key={index} className={`${theme.cardBg} rounded-2xl p-6 border hover:border-opacity-50 transition-all duration-300 ${isDarkTheme ? 'hover:border-cyan-400/30' : 'hover:border-blue-500/30'}`}>
            <p className={`${theme.textMuted} text-sm mb-2`}>{stat.label}</p>
            <p className={`text-2xl font-bold mb-1 ${theme.textPrimary}`}>{stat.value}</p>
            <p className="text-green-500 text-sm font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* 마이닝 현황 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${theme.cardBg} rounded-2xl p-6 border`}>
          <h3 className={`text-xl font-bold mb-4 ${theme.textPrimary}`}>Current Mining Session</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={theme.textSecondary}>Session Duration</span>
              <span className={`${theme.textPrimary} font-medium`}>8h 23m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={theme.textSecondary}>Pending Rewards</span>
              <span className={`${theme.accent} font-medium`}>45.8 PZM</span>
            </div>
            <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
              <div className={`${isDarkTheme ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'} h-2 rounded-full transition-all duration-300`} style={{width: '65%'}}></div>
            </div>
            <p className={`${theme.textMuted} text-sm`}>65% complete • 5h 37m remaining</p>
          </div>
        </div>

        <div className={`${theme.cardBg} rounded-2xl p-6 border`}>
          <h3 className={`text-xl font-bold mb-4 ${theme.textPrimary}`}>Active Missions</h3>
          <div className="space-y-3">
            {[
              { name: 'Daily Login', progress: 100, reward: '+2.0 H/s' },
              { name: 'Referral Bonus', progress: 60, reward: '+1.5 H/s' },
              { name: 'KYC Complete', progress: 100, reward: '+5.0 H/s' },
            ].map((mission, index) => (
              <div key={index} className={`${theme.cardSecondary} rounded-xl p-3 border`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${theme.textPrimary} font-medium`}>{mission.name}</span>
                  <span className={`${theme.accent} text-sm`}>{mission.reward}</span>
                </div>
                <div className={`w-full ${isDarkTheme ? 'bg-slate-600' : 'bg-gray-300'} rounded-full h-1.5`}>
                  <div 
                    className={`${isDarkTheme ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'} h-1.5 rounded-full transition-all duration-300`} 
                    style={{width: `${mission.progress}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 마이닝 페이지
  const MiningPage = () => (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${theme.textPrimary}`}>Mining</h1>
          <p className={theme.textSecondary}>Start mining PZM tokens with your hash power.</p>
        </div>
      </div>

      {/* 마이닝 메인 카드 */}
      <div className={`${theme.cardBg} rounded-2xl p-8 border`}>
        <div className="text-center mb-8">
          <div className={`w-24 h-24 ${theme.gradientButton} rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse`}>
            <Zap className="w-12 h-12 text-white" />
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${theme.textPrimary}`}>Mining Active</h2>
          <p className={theme.textSecondary}>Your mining session is currently running</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <p className={`${theme.textMuted} text-sm mb-1`}>Pending Reward</p>
            <p className={`text-2xl font-bold ${theme.accent}`}>18.85 PZM</p>
          </div>
          <div className="text-center">
            <p className={`${theme.textMuted} text-sm mb-1`}>Current Hash Power</p>
            <p className={`text-2xl font-bold ${theme.textPrimary}`}>18.5 H/s</p>
          </div>
          <div className="text-center">
            <p className={`${theme.textMuted} text-sm mb-1`}>Total Reward</p>
            <p className="text-2xl font-bold text-green-500">4885.48 PZM</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className={theme.textSecondary}>Session Progress</span>
            <span className={`${theme.textPrimary} font-medium`}>35% Complete</span>
          </div>
          <div className={`w-full ${theme.progressBg} rounded-full h-3`}>
            <div className={`${isDarkTheme ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'} h-3 rounded-full transition-all duration-500`} style={{width: '35%'}}></div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className={theme.textMuted}>Estimated reward: 45.8 PZM</span>
            <span className={theme.textMuted}>15h 37m remaining</span>
          </div>
        </div>

        <button 
          disabled 
          className="w-full bg-gray-400 text-gray-200 font-semibold py-4 px-6 rounded-2xl cursor-not-allowed mt-6 flex items-center justify-center space-x-2"
        >
          <span>⏱️</span>
          <span>Mining Active - 15h 37m remaining</span>
        </button>
      </div>

      {/* 해시파워 부스터 */}
      <div className={`${theme.cardBg} rounded-2xl p-6 border`}>
        <h3 className={`text-xl font-bold mb-6 ${theme.textPrimary}`}>Hash Power Boosters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Daily Login', boost: '+2.0 H/s', status: 'active', icon: '🎯' },
            { name: 'Referral Bonus', boost: '+1.5 H/s', status: 'pending', icon: '👥' },
            { name: 'KYC Verified', boost: '+5.0 H/s', status: 'active', icon: '🪪' },
            { name: 'Premium Member', boost: '+10.0 H/s', status: 'available', icon: '⭐' },
          ].map((booster, index) => (
            <div key={index} className={`${theme.cardSecondary} rounded-xl p-4 border`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{booster.icon}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  booster.status === 'active' ? 'bg-green-500/20 text-green-500' :
                  booster.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                  isDarkTheme ? 'bg-slate-500/20 text-slate-400' : 'bg-gray-500/20 text-gray-500'
                }`}>
                  {booster.status}
                </span>
              </div>
              <h4 className={`${theme.textPrimary} font-medium mb-1`}>{booster.name}</h4>
              <p className={`${theme.accent} font-semibold`}>{booster.boost}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 카드 페이지
  const CardPage = () => {
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [chargeAmount, setChargeAmount] = useState('');

    return (
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div>
            <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${theme.textPrimary}`}>PayzMe Card</h1>
            <p className={theme.textSecondary}>Manage your virtual card and transactions.</p>
          </div>
        </div>

        {/* PayzMe 카드 */}
        <div className={`${theme.cardBg} rounded-2xl p-6 border`}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 카드 디자인 */}
            <div className="lg:w-1/2">
              <div className={`relative w-full max-w-md h-56 rounded-2xl ${theme.gradientButton} p-6 text-white shadow-2xl`} style={{
                background: isDarkTheme 
                  ? 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%)'
                  : 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #9333ea 100%)'
              }}>
                {/* 카드 헤더 */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-8 h-8" />
                    <span className="text-xl font-bold">PayzMe</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-70">VIRTUAL CARD</p>
                    <p className="text-sm font-medium">PZM</p>
                  </div>
                </div>

                {/* 카드 번호 */}
                <div className="mb-6">
                  <p className="text-lg font-mono tracking-wider">
                    {showCardDetails ? '4532 1234 5678 9012' : '•••• •••• •••• 9012'}
                  </p>
                </div>

                {/* 카드 하단 정보 */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-70">CARD HOLDER</p>
                    <p className="text-sm font-medium">PayzMe User</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">EXPIRES</p>
                    <p className="text-sm font-medium">
                      {showCardDetails ? '12/28' : '••/••'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">CVV</p>
                    <p className="text-sm font-medium">
                      {showCardDetails ? '123' : '•••'}
                    </p>
                  </div>
                </div>

                {/* 배경 장식 */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/5 blur-lg"></div>
              </div>

              {/* 카드 정보 토글 */}
              <button
                onClick={() => setShowCardDetails(!showCardDetails)}
                className={`mt-4 flex items-center space-x-2 px-4 py-2 rounded-lg ${theme.cardSecondary} border hover:opacity-80 transition-opacity`}
              >
                {showCardDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className={`text-sm ${theme.textSecondary}`}>
                  {showCardDetails ? 'Hide Details' : 'Show Details'}
                </span>
              </button>
            </div>

            {/* 카드 정보 및 액션 */}
            <div className="lg:w-1/2 space-y-6">
              {/* 잔액 정보 */}
              <div className="space-y-4">
                <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Card Balance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`${theme.cardSecondary} rounded-xl p-4 border`}>
                    <p className={`${theme.textMuted} text-sm mb-1`}>Available</p>
                    <p className={`text-2xl font-bold ${theme.textPrimary}`}>$1,250.48</p>
                  </div>
                  <div className={`${theme.cardSecondary} rounded-xl p-4 border`}>
                    <p className={`${theme.textMuted} text-sm mb-1`}>PZM Balance</p>
                    <p className={`text-2xl font-bold ${theme.accent}`}>4,885.48</p>
                  </div>
                </div>
              </div>

              {/* 빠른 액션 */}
              <div className="space-y-3">
                <h4 className={`font-semibold ${theme.textPrimary}`}>Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className={`${theme.gradientButton} text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2`}>
                    <Plus className="w-4 h-4" />
                    <span>Top Up</span>
                  </button>
                  <button className={`${theme.cardSecondary} border py-3 px-4 rounded-xl font-medium ${theme.textPrimary} hover:opacity-80 transition-opacity flex items-center justify-center space-x-2`}>
                    <Copy className="w-4 h-4" />
                    <span>Copy Card</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 충전 섹션 */}
        <div className={`${theme.cardBg} rounded-2xl p-6 border`}>
          <h3 className={`text-xl font-bold mb-6 ${theme.textPrimary}`}>Top Up Card</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>
                  Amount (USD)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={chargeAmount}
                    onChange={(e) => setChargeAmount(e.target.value)}
                    placeholder="Enter amount"
                    className={`w-full px-4 py-3 rounded-xl border ${theme.cardSecondary} ${theme.textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${isDarkTheme ? 'focus:ring-cyan-400' : 'focus:ring-blue-500'}`}
                  />
                </div>
              </div>
              
              {/* 빠른 금액 선택 */}
              <div className="grid grid-cols-4 gap-2">
                {['$10', '$25', '$50', '$100'].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setChargeAmount(amount.slice(1))}
                    className={`py-2 px-3 rounded-lg border ${theme.cardSecondary} ${theme.textSecondary} hover:${theme.textPrimary} transition-colors text-sm`}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              <button className={`w-full ${theme.gradientButton} text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105`}>
                Top Up Card
              </button>
            </div>

            <div className={`${theme.cardSecondary} rounded-xl p-4 border`}>
              <h4 className={`font-medium mb-3 ${theme.textPrimary}`}>Payment Methods</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-300/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PZM</span>
                    </div>
                    <span className={`${theme.textPrimary}`}>PZM Tokens</span>
                  </div>
                  <span className={`text-sm ${theme.accent}`}>4,885.48 PZM</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-300/20">
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-6 h-6 text-green-500" />
                    <span className={`${theme.textPrimary}`}>Connected Wallet</span>
                  </div>
                  <span className={`text-sm ${theme.accent}`}>0.024 ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 거래내역 */}
        <div className={`${theme.cardBg} rounded-2xl p-6 border`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Transaction History</h3>
            <button className={`text-sm ${theme.accent} hover:opacity-80 transition-opacity`}>
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              { type: 'topup', amount: '+$50.00', desc: 'Card Top Up', time: '2 hours ago', icon: ArrowDownLeft, color: 'text-green-500' },
              { type: 'purchase', amount: '-$12.99', desc: '99 Dan', time: '1 day ago', icon: ArrowUpRight, color: 'text-red-500' },
              { type: 'mining', amount: '+$25.30', desc: 'Mining Rewards', time: '2 days ago', icon: Zap, color: 'text-green-500' },
              { type: 'purchase', amount: '-$28.50', desc: 'Anma Shop', time: '3 days ago', icon: ArrowUpRight, color: 'text-red-500' },
              { type: 'topup', amount: '+$100.00', desc: 'Card Top Up', time: '5 days ago', icon: ArrowDownLeft, color: 'text-green-500' },
            ].map((transaction, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${theme.cardSecondary} border hover:opacity-80 transition-opacity`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full ${isDarkTheme ? 'bg-slate-600' : 'bg-gray-200'} flex items-center justify-center`}>
                    <transaction.icon className={`w-5 h-5 ${transaction.color}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${theme.textPrimary}`}>{transaction.desc}</p>
                    <p className={`text-sm ${theme.textMuted}`}>{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.color}`}>{transaction.amount}</p>
                  <p className={`text-xs ${theme.textMuted}`}>
                    {transaction.type === 'mining' ? 'PZM→USD' : 'USD'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  const ReferralPage = () => (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${theme.textPrimary}`}>Referral Program</h1>
          <p className={theme.textSecondary}>Invite friends and earn mining bonuses together.</p>
        </div>
      </div>

      {/* 레퍼럴 링크 카드 */}
      <div className={`${theme.cardBg} rounded-2xl p-6 border`}>
        <h3 className={`text-xl font-bold mb-4 ${theme.textPrimary}`}>Your Referral Link</h3>
        <div className={`${theme.cardSecondary} rounded-xl p-4 border`}>
          <div className="flex items-center justify-between">
            <code className={`${theme.accent} text-sm break-all`}>
              https://payzme.app/ref/0x45E...59Da6
            </code>
            <button className={`ml-4 ${isDarkTheme ? 'bg-cyan-500 hover:bg-cyan-400' : 'bg-blue-600 hover:bg-blue-500'} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0`}>
              Copy
            </button>
          </div>
        </div>
        <p className={`${theme.textMuted} text-sm mt-2`}>
          Share this link with friends to earn referral bonuses when they start mining.
        </p>
      </div>

      {/* 레퍼럴 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${theme.cardBg} rounded-2xl p-6 border text-center`}>
          <Users className={`w-8 h-8 ${isDarkTheme ? 'text-cyan-400' : 'text-blue-600'} mx-auto mb-3`} />
          <p className={`text-3xl font-bold mb-2 ${theme.textPrimary}`}>23</p>
          <p className={theme.textSecondary}>Total Referrals</p>
        </div>
        <div className={`${theme.cardBg} rounded-2xl p-6 border text-center`}>
          <Gift className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <p className={`text-3xl font-bold mb-2 ${theme.textPrimary}`}>145.8</p>
          <p className={theme.textSecondary}>Bonus PZM Earned</p>
        </div>
        <div className={`${theme.cardBg} rounded-2xl p-6 border text-center`}>
          <BarChart3 className="w-8 h-8 text-purple-500 mx-auto mb-3" />
          <p className={`text-3xl font-bold mb-2 ${theme.textPrimary}`}>+15.5</p>
          <p className={theme.textSecondary}>Hash Power Bonus</p>
        </div>
      </div>

      {/* 레퍼럴 목록 */}
      <div className={`${theme.cardBg} rounded-2xl p-6 border`}>
        <h3 className={`text-xl font-bold mb-6 ${theme.textPrimary}`}>Your Referrals</h3>
        <div className="space-y-4">
          {[
            { address: '0x1a2...8f9d', date: '2024-07-10', status: 'Active', bonus: '+0.5 H/s' },
            { address: '0x3c4...2e1a', date: '2024-07-09', status: 'Active', bonus: '+0.5 H/s' },
            { address: '0x5f6...7c8b', date: '2024-07-08', status: 'Pending', bonus: 'Pending' },
            { address: '0x9d0...4a5f', date: '2024-07-07', status: 'Active', bonus: '+0.5 H/s' },
          ].map((referral, index) => (
            <div key={index} className={`${theme.cardSecondary} rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 border`}>
              <div className="flex-1">
                <p className={`${theme.textPrimary} font-medium`}>{referral.address}</p>
                <p className={`${theme.textMuted} text-sm`}>Joined {referral.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  referral.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {referral.status}
                </span>
                <span className={`${theme.accent} font-medium`}>{referral.bonus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 레퍼럴 보상 안내 */}
      <div className={`${isDarkTheme ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-400/20' : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20'} backdrop-blur-lg rounded-2xl p-6 border`}>
        <h3 className={`text-xl font-bold mb-4 ${theme.textPrimary}`}>Referral Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className={`${theme.accent} font-medium mb-2`}>For You:</p>
            <ul className={`${theme.textSecondary} space-y-1`}>
              <li>• +0.5 H/s per active referral</li>
              <li>• 5% of their mining rewards</li>
              <li>• Bonus missions unlock</li>
            </ul>
          </div>
          <div>
            <p className={`${theme.accent} font-medium mb-2`}>For Your Friend:</p>
            <ul className={`${theme.textSecondary} space-y-1`}>
              <li>• +1.0 H/s welcome bonus</li>
              <li>• 10% extra mining rewards (7 days)</li>
              <li>• Premium features trial</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // 메인 레이아웃
  const MainLayout = ({ children }) => (
    <div className={`min-h-screen relative overflow-hidden ${theme.background}`}>
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-10 w-2 h-2 ${theme.stars[0]} rounded-full animate-pulse`}></div>
        <div className={`absolute top-40 right-20 w-1 h-1 ${theme.stars[1]} rounded-full animate-pulse`}></div>
        <div className={`absolute bottom-32 left-20 w-1.5 h-1.5 ${theme.stars[2]} rounded-full animate-pulse`}></div>
        <div className={`absolute bottom-20 right-32 w-1 h-1 ${theme.stars[3]} rounded-full animate-pulse`}></div>
        <div className={`absolute top-1/2 left-1/4 w-1 h-1 ${theme.stars[4]} rounded-full animate-pulse`}></div>
        <div className={`absolute top-3/4 right-1/4 w-1.5 h-1.5 ${theme.stars[5]} rounded-full animate-pulse`}></div>
      </div>

      <div className="relative z-10 flex">
        <Navigation />
        <main className="flex-1 lg:ml-0">
          <div className="pt-16 lg:pt-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );

  // 페이지 렌더링
  if (currentPage === 'login') {
    return <LoginPage />;
  }

  return (
    <MainLayout>
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'mining' && <MiningPage />}
      {currentPage === 'referral' && <ReferralPage />}
      {currentPage === 'card' && <CardPage />}
    </MainLayout>
  );
};

export default PayzMeApp;