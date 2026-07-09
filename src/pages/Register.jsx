import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cognitoConfirmSignUp, cognitoSignUp } from '../services/cognitoAuth';

const Register = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('이메일을 입력하세요.');
      return;
    }

    if (!password) {
      setError('비밀번호를 입력하세요.');
      return;
    }

    if (password !== passwordCheck) {
      setError('비밀번호가 서로 다릅니다.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await cognitoSignUp(email, password, name);

      setStep('confirm');
      setMessage('이메일로 인증코드를 보냈습니다. 인증코드를 입력하세요.');
    } catch (err) {
      setError(err.message || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setError('인증코드를 입력하세요.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await cognitoConfirmSignUp(email, code);

      setMessage('가입이 완료되었습니다. 로그인 화면으로 이동합니다.');

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 800);
    } catch (err) {
      setError(err.message || '이메일 인증에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`min-h-[100dvh] px-4 py-6 flex items-center justify-center ${
        isDarkMode ? 'bg-[#05070d] text-white' : 'bg-gray-50 text-gray-900'
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
              CNS ACCOUNT
            </p>

            <h1 className="text-3xl font-black tracking-tight">
              {step === 'signup' ? '회원가입' : '이메일 인증'}
            </h1>

            <p
              className={`mt-3 text-sm leading-relaxed ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {step === 'signup'
                ? 'Cognito 이메일 계정을 생성합니다.'
                : '이메일로 받은 인증코드를 입력하세요.'}
            </p>
          </div>

          {step === 'signup' ? (
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-bold">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                  className={`w-full min-h-12 rounded-xl px-4 border outline-none text-base ${
                    isDarkMode
                      ? 'bg-[#05070d] border-gray-700 text-white placeholder-gray-600 focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@example.com"
                  autoComplete="username"
                  className={`w-full min-h-12 rounded-xl px-4 border outline-none text-base ${
                    isDarkMode
                      ? 'bg-[#05070d] border-gray-700 text-white placeholder-gray-600 focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="대문자/소문자/숫자/특수문자 포함"
                  autoComplete="new-password"
                  className={`w-full min-h-12 rounded-xl px-4 border outline-none text-base ${
                    isDarkMode
                      ? 'bg-[#05070d] border-gray-700 text-white placeholder-gray-600 focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold">비밀번호 확인</label>
                <input
                  type="password"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  placeholder="비밀번호 재입력"
                  autoComplete="new-password"
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

              {message && (
                <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 px-4 py-3 text-sm font-bold text-blue-500">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-14 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 text-white font-black text-base transition"
              >
                {loading ? '가입 처리 중...' : '회원가입'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-bold">이메일</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className={`w-full min-h-12 rounded-xl px-4 border outline-none text-base opacity-70 ${
                    isDarkMode
                      ? 'bg-[#05070d] border-gray-700 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold">인증코드</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="이메일 인증코드"
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

              {message && (
                <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 px-4 py-3 text-sm font-bold text-blue-500">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-14 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 text-white font-black text-base transition"
              >
                {loading ? '인증 처리 중...' : '인증 완료'}
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={() => navigate('/login')}
            className={`w-full mt-5 min-h-12 rounded-xl border font-black ${
              isDarkMode
                ? 'border-gray-700 text-gray-300'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            로그인 화면으로 돌아가기
          </button>
        </section>
      </div>
    </main>
  );
};

export default Register;