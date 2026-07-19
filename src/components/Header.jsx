import { useLocation, useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants/images';

const Header = ({ isDarkMode, setIsDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname.replace('/', '') || 'home';

  return (
    <header className={`w-full sticky top-0 z-50 backdrop-blur-md border-b ${isDarkMode ? 'bg-[#0B0F19]/90 border-gray-800/60' : 'bg-white/90 border-gray-200/80'}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between overflow-x-auto no-scrollbar">
        
        <div className="flex items-center space-x-10 md:space-x-16">
          <div 
            className="flex items-center cursor-pointer shrink-0" 
            onClick={() => navigate('/home')}
          >
            <img
              src={isDarkMode ? IMAGES.logoWhite : IMAGES.logoBlack}
              alt="AI CNS Logo"
              className="h-9 md:h-10 w-auto object-contain"
            />
          </div>
          
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
          <button
            onClick={() => navigate('/login')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition whitespace-nowrap ${
              isDarkMode
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-700 hover:text-black'
            }`}
          >
            로그인
          </button>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border shadow-sm transition flex items-center gap-2 whitespace-nowrap ${isDarkMode ? 'bg-gray-900 border-gray-700 text-yellow-400 hover:bg-gray-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
          >
            {isDarkMode ? (
              <>
                <span>🌙</span>
                <span className="hidden md:inline text-gray-300">블랙 모드</span>
              </>
            ) : (
              <>
                <span>☀️</span>
                <span className="hidden md:inline text-gray-700">화이트 모드</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;