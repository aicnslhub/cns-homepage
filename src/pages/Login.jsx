import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState('admin');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const trimmedUserId = userId.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (trimmedUserId === 'admin' && trimmedPassword === '1234') {
      localStorage.setItem('cns_web_login', 'true');
      localStorage.setItem('cns_web_role', 'admin');

      localStorage.removeItem('cns_user_role');

      const redirectPath = location.state?.from || '/admin';
      navigate(redirectPath, { replace: true });
      return;
    }

    setError('아이디 또는 비밀번호가 올바르지 않습니다.');
  };

  return (
    <main
      className={`min-h-[100dvh] px-4 py-6 flex items-center justify-center ${
        isDarkMode
          ? 'bg-[#05070d] text-white'
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
            {isDarkMode ? '🌙 블랙 모드' : '☀️ 화이트 모드'}
          </button>
        </div>

        <section
          className={`rounded-[28px] p-6 sm:p-8 border shadow-2xl ${
            isDarkMode
              ? 'bg-[#111827] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="mb-8">
            <p className="text-blue-500 text-sm font-black tracking-wide mb-2">
              CNS AI CONTROL CENTER
            </p>

            <h1 className="text-3xl font-black tracking-tight">
              웹 관리자 로그인
            </h1>

            <p
              className={`mt-3 text-sm leading-relaxed ${
                isDarkMode
                  ? 'text-gray-400'
                  : 'text-gray-500'
              }`}
            >
              PC / 모바일 웹에서 관리자 관제센터로 접속합니다.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-bold">
                관리자 ID
              </label>

              <input
                type="text"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  setError('');
                }}
                placeholder="admin"
                autoCapitalize="none"
                autoComplete="username"
                className={`w-full min-h-12 rounded-xl px-4 border outline-none text-base ${
                  isDarkMode
                    ? 'bg-[#05070d] border-gray-700 text-white placeholder-gray-600 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="1234"
                autoComplete="current-password"
                className={`w-full min-h-12 rounded-xl px-4 border outline-none text-base ${
                  isDarkMode
                    ? 'bg-[#05070d] border-gray-700 text-white placeholder-gray-600 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
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
              className="w-full min-h-14 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-base transition"
            >
              로그인
            </button>
          </form>

          <div
            className={`mt-6 rounded-2xl p-4 text-xs leading-relaxed ${
              isDarkMode
                ? 'bg-black/30 text-gray-400'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            임시 테스트 계정
            <br />
            ID: <b>admin</b> / PW: <b>1234</b>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;