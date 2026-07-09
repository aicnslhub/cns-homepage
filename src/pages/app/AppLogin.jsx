import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cognitoLogin, saveAuthTokens } from '../../services/cognitoAuth';

const AppLogin = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingTarget, setLoadingTarget] = useState('');

  const handleLogin = async (target) => {
    if (!email.trim()) {
      setError('이메일을 입력하세요.');
      return;
    }

    if (!password) {
      setError('비밀번호를 입력하세요.');
      return;
    }

    setLoadingTarget(target);
    setError('');

    try {
      const tokens = await cognitoLogin(email, password);

      saveAuthTokens(tokens);

      localStorage.setItem('cns_app_login', 'true');
      localStorage.removeItem('cns_user_role');

      if (target === 'admin') {
        localStorage.setItem('cns_app_role', 'admin');
        localStorage.setItem('cns_web_login', 'true');
        localStorage.setItem('cns_web_role', 'admin');

        navigate('/app/admin', { replace: true });
        return;
      }

      localStorage.setItem('cns_app_role', 'recorder');

      navigate('/app/record', { replace: true });
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoadingTarget('');
    }
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
            {isDarkMode ? '☀️ 앱 화이트' : '🌙 앱 블랙'}
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
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Cognito 계정으로 로그인 후 녹음 화면 또는 AI 관제센터로 이동합니다.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin('record');
            }}
            className="space-y-5"
          >
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
                placeholder="비밀번호"
                autoComplete="current-password"
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
              disabled={!!loadingTarget}
              className="w-full min-h-14 rounded-xl bg-green-600 active:bg-green-800 disabled:opacity-60 text-white font-black text-base"
            >
              {loadingTarget === 'record' ? '로그인 중...' : '녹음 화면으로 로그인'}
            </button>

            <button
              type="button"
              disabled={!!loadingTarget}
              onClick={() => handleLogin('admin')}
              className="w-full min-h-14 rounded-xl bg-blue-600 active:bg-blue-800 disabled:opacity-60 text-white font-black text-base"
            >
              {loadingTarget === 'admin' ? '로그인 중...' : 'AI 관제센터로 로그인'}
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
                ? 'bg-black/40 text-gray-400'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            앱과 PC 웹은 같은 Cognito 계정을 사용합니다.
            <br />
            권한 분리는 다음 단계에서 DB 기준으로 처리합니다.
          </div>
        </section>
      </div>
    </main>
  );
};

export default AppLogin;