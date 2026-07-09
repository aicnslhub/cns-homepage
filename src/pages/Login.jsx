import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cognitoLogin, saveAuthTokens } from '../services/cognitoAuth';

const Login = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('이메일을 입력하세요.');
      return;
    }

    if (!password) {
      setError('비밀번호를 입력하세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const tokens = await cognitoLogin(email, password);

      saveAuthTokens(tokens);

      localStorage.setItem('cns_web_login', 'true');
      localStorage.setItem('cns_web_role', 'admin');
      localStorage.removeItem('cns_user_role');

      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
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
            {isDarkMode ? '☀️ 화이트 모드' : '🌙 블랙 모드'}
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
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Cognito 계정으로 로그인 후 관리자 관제센터에 접속합니다.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-bold">
                이메일
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
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
              disabled={loading}
              className="w-full min-h-14 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 text-white font-black text-base transition"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className={`w-full min-h-12 rounded-xl border font-black ${
              isDarkMode
                ? 'border-gray-700 text-gray-300'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            📝 이메일 회원가입
          </button>
          <div
            className={`mt-6 rounded-2xl p-4 text-xs leading-relaxed ${
              isDarkMode
                ? 'bg-black/30 text-gray-400'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            PC 웹과 앱은 같은 Cognito 계정을 사용합니다.
            <br />
            로그인 성공 시 <b>aicns_id_token</b>이 저장됩니다.
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;