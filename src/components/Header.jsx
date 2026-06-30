import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ isDarkMode, setIsDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname.replace('/', '') || 'home';

  return (
    <header className={`w-full sticky top-0 z-50 backdrop-blur-md border-b ${isDarkMode ? 'bg-[#0B0F19]/90 border-gray-800/60' : 'bg-white/90 border-gray-200/80'}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between overflow-x-auto no-scrollbar">
        
        {/* 로고와 메뉴 간격 확대 */}
        <div className="flex items-center space-x-10 md:space-x-16">
          <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer shrink-0" onClick={() => navigate('/home')}>
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center font-bold text-sm md:text-base tracking-tighter text-white shadow-lg">C</div>
            <span className={`text-lg md:text-xl font-black tracking-wider ${isDarkMode ? 'bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent' : 'text-blue-600'}`}>AI CNS</span>
          </div>
          
          {/* 메뉴 간 간격 축소 */}
          <nav className="flex items-center gap-4 md:gap-6 whitespace-nowrap shrink-0">
            {['home', 'about', 'products', 'inquiry'].map((tab) => (
              <button
                key={tab}
                onClick={() => navigate(`/${tab}`)}
                className={`relative text-[14px] md:text-[16px] tracking-tight transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? isDarkMode ? 'text-white font-black' : 'text-gray-900 font-black'
                    : isDarkMode ? 'text-gray-500 hover:text-gray-300 font-semibold' : 'text-gray-500 hover:text-gray-800 font-semibold'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <button onClick={() => alert("관제실 로그인 페이지로 이동합니다.")} className={`px-4 py-2 rounded-xl font-bold text-sm transition whitespace-nowrap ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
            로그인
          </button>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`px-3.5 py-2 rounded-xl text-xs font-bold border shadow-sm transition flex items-center gap-2 whitespace-nowrap ${isDarkMode ? 'bg-gray-900 border-gray-700 text-yellow-400 hover:bg-gray-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
            {isDarkMode ? (<><span>🌙</span><span className="hidden md:inline text-gray-300">블랙 모드</span></>) : (<><span>☀️</span><span className="hidden md:inline text-gray-700">화이트 모드</span></>)}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;