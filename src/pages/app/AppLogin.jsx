import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppLogin = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('recorder');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const trimmedUserId = userId.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (trimmedPassword !== '1234') {
      setError('비밀번호가 올바르지 않습니다.');
      return;
    }

    if (trimmedUserId === 'admin') {
      localStorage.setItem('cns_app_login', 'true');
      localStorage.setItem('cns_app_role', 'admin');

      // 예전 공용 role 제거
      localStorage.removeItem('cns_user_role');

      navigate('/app/admin', { replace: true });
      return;
    }

    if (trimmedUserId === 'recorder') {
      localStorage.setItem('cns_app_login', 'true');
      localStorage.setItem('cns_app_role', 'recorder');

      // 예전 공용 role 제거
      localStorage.removeItem('cns_user_role');

      navigate('/app/record', { replace: true });
      return;
    }

    localStorage.removeItem('cns_app_login');
    localStorage.removeItem('cns_app_role');
    localStorage.removeItem('cns_user_role');

    setError('앱 테스트 계정은 admin 또는 recorder 입니다.');
  };

  return (
    <main
      className={`min-h-[100dvh] px-4 py-6 flex items-center justify-center ${
        isDarkMode
          ? 'bg-black text-white'
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="w-full max-w-[430px]">
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`min-h-11 px-4 rounded-xl text-sm font-bold border ${
              isDarkMode
                ? 'bg-[#111827] border-gray-700 text-yellow-300'
                : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            {isDarkMode ? '🌙 앱 블랙' : '☀️ 앱 화이트'}
          </button>
        </div>

        <section
          className={`rounded-[30px] p-6 border shadow-2xl ${
            isDarkMode
              ? 'bg-[#111827] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="mb-8">
            <p className="text-green-500 text-sm font-black mb-2">
              CNS HYBRID APP
            </p>

            <h1 className="text-3xl font-black tracking-tight">
              앱 로그인
            </h1>

            <p
              className={`mt-3 text-sm leading-relaxed ${
                isDarkMode
                  ? 'text-gray-400'
                  : 'text-gray-500'
              }`}
            >
              녹음 기능 또는 관리자 관제센터로 접속합니다.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-bold">
                앱 사용자 ID
              </label>

              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="recorder 또는 admin"
                autoCapitalize="none"
                className={`w-full min-h-12 rounded-xl px-4 border outline-none text-base ${
                  isDarkMode
                    ? 'bg-black border-gray-700 text-white placeholder-gray-600 focus:border-green-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'
                }`}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold">
                비밀번호
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="1234"
                className={`w-full min-h-12 rounded-xl px-4 border outline-none text-base ${
                  isDarkMode
                    ? 'bg-black border-gray-700 text-white placeholder-gray-600 focus:border-green-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'
                }`}
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm font-bold text-red-500">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full min-h-14 rounded-xl bg-green-600 active:bg-green-800 text-white font-black text-base"
            >
              앱 로그인
            </button>
          </form>

          <div
            className={`mt-6 rounded-2xl p-4 text-xs leading-relaxed ${
              isDarkMode
                ? 'bg-black/40 text-gray-400'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            녹음 사용자: <b>recorder / 1234</b>
            <br />
            관리자: <b>admin / 1234</b>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AppLogin;