import { useNavigate } from 'react-router-dom';
import { mockClients } from '../../data/mockClients';

const statusStyle = {
  red: {
    border: 'border-red-500/50',
    bg: 'bg-red-500/10',
    text: 'text-red-500',
    dot: 'bg-red-500 shadow-red-500/60',
  },
  yellow: {
    border: 'border-yellow-400/50',
    bg: 'bg-yellow-400/10',
    text: 'text-yellow-400',
    dot: 'bg-yellow-400 shadow-yellow-400/60',
  },
  green: {
    border: 'border-green-500/50',
    bg: 'bg-green-500/10',
    text: 'text-green-500',
    dot: 'bg-green-500 shadow-green-500/60',
  },
};

const AdminDashboard = ({
  mode = 'web',
  basePath = '/admin',
  isDarkMode,
  setIsDarkMode,
}) => {
  const navigate = useNavigate();

  const urgentClients = mockClients.filter((client) => {
    return client.status === 'red';
  });

  const handleLogout = () => {
    if (mode === 'app') {
      localStorage.removeItem('cns_app_login');
      localStorage.removeItem('cns_app_role');
      localStorage.removeItem('cns_user_role');

      navigate('/app/login', { replace: true });
      return;
    }

    localStorage.removeItem('cns_web_login');
    localStorage.removeItem('cns_web_role');
    localStorage.removeItem('cns_user_role');

    navigate('/login', { replace: true });
  };

  return (
    <main
      className={`min-h-[100dvh] px-4 pt-5 pb-[calc(110px+env(safe-area-inset-bottom))] ${
        isDarkMode
          ? 'bg-black text-white'
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="w-full max-w-[860px] mx-auto">
        <header className="flex items-start justify-between gap-3 mb-6 border-b border-gray-700/40 pb-5">
          <div>
            <p className="text-blue-500 text-sm font-black mb-1">
              CNS AI CONTROL CENTER
            </p>

            <h1 className="text-2xl sm:text-3xl font-black">
              AI 관제센터
            </h1>

            <p
              className={`mt-2 text-sm ${
                isDarkMode
                  ? 'text-gray-400'
                  : 'text-gray-500'
              }`}
            >
              {mode === 'app'
                ? '앱 관리자 환경입니다.'
                : 'PC / 모바일 웹 관리자 환경입니다.'}
            </p>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`min-h-11 px-3 rounded-xl text-sm font-bold border shrink-0 ${
              isDarkMode
                ? 'bg-[#111827] border-gray-700 text-yellow-300'
                : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-5">
            <div className="text-red-500 text-3xl font-black">
              {
                mockClients.filter((client) => {
                  return client.status === 'red';
                }).length
              }
            </div>

            <div className="mt-2 font-black">
              긴급 개입
            </div>

            <p className="mt-1 text-sm opacity-70">
              위험군 모니터링
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/30 p-5">
            <div className="text-yellow-400 text-3xl font-black">
              {
                mockClients.filter((client) => {
                  return client.status === 'yellow';
                }).length
              }
            </div>

            <div className="mt-2 font-black">
              집중 관찰
            </div>

            <p className="mt-1 text-sm opacity-70">
              주의 단계 내담자
            </p>
          </div>

          <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-5">
            <div className="text-green-500 text-3xl font-black">
              {
                mockClients.filter((client) => {
                  return client.status === 'green';
                }).length
              }
            </div>

            <div className="mt-2 font-black">
              안정 유지
            </div>

            <p className="mt-1 text-sm opacity-70">
              정상 관리 대상
            </p>
          </div>
        </section>

        <section
          className={`rounded-3xl p-5 border mb-5 ${
            isDarkMode
              ? 'bg-[#111827] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-black">
                긴급 확인 대상
              </h2>

              <p
                className={`mt-1 text-sm ${
                  isDarkMode
                    ? 'text-gray-400'
                    : 'text-gray-500'
                }`}
              >
                위험도가 높은 내담자를 우선 표시합니다.
              </p>
            </div>

            <button
              onClick={() => navigate(`${basePath}/clients`)}
              className="min-h-11 px-4 rounded-xl bg-blue-600 active:bg-blue-800 text-white text-sm font-black"
            >
              전체보기
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {urgentClients.map((client) => {
              const style = statusStyle[client.status];

              return (
                <article
                  key={client.id}
                  className={`rounded-2xl p-4 border ${style.border} ${style.bg}`}
                >
                  <div className="flex justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-4 h-4 rounded-full mt-1 shadow-lg ${style.dot}`}
                      />

                      <div>
                        <div className="text-lg font-black">
                          {client.name}

                          <span className="ml-2 text-sm text-red-400">
                            ↑ {client.trend}
                          </span>
                        </div>

                        <div className="text-sm opacity-70">
                          ID: {client.id}
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-sm opacity-70">
                      <b>{client.session}</b>
                      <br />
                      {client.lastAnalyzedAt}
                    </div>
                  </div>

                  <div
                    className={`mt-4 rounded-xl p-3 ${
                      isDarkMode
                        ? 'bg-black/40'
                        : 'bg-white/70'
                    }`}
                  >
                    <div className="flex flex-wrap gap-2 mb-2">
                      {client.tags.map((tag) => {
                        return (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-black"
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    <p className="text-sm leading-relaxed">
                      <b>AI 특이사항:</b> {client.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`${basePath}/report/${client.id}`)}
                    className="mt-4 w-full min-h-12 rounded-xl bg-blue-600 active:bg-blue-800 text-white font-black"
                  >
                    상세 리포트 보기
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {mode === 'app' && (
          <button
            onClick={() => navigate('/app/record')}
            className="w-full min-h-12 rounded-xl bg-green-600 active:bg-green-800 text-white font-black mb-3"
          >
            녹음 화면으로 이동
          </button>
        )}

        <button
          onClick={handleLogout}
          className={`w-full min-h-12 rounded-xl font-black border ${
            isDarkMode
              ? 'border-red-500/30 text-red-400 bg-red-500/10'
              : 'border-red-200 text-red-600 bg-red-50'
          }`}
        >
          로그아웃
        </button>
      </div>

      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] border-t ${
          isDarkMode
            ? 'bg-black/90 border-gray-800'
            : 'bg-white/90 border-gray-200'
        } backdrop-blur-md`}
      >
        <div className="max-w-[860px] mx-auto grid grid-cols-3 gap-2">
          <button className="min-h-12 rounded-xl bg-blue-600 text-white font-black text-sm">
            관제센터
          </button>

          <button
            onClick={() => navigate(`${basePath}/clients`)}
            className={`min-h-12 rounded-xl font-black text-sm ${
              isDarkMode
                ? 'bg-[#111827] text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            전체관리
          </button>

          <button
            onClick={() => navigate(`${basePath}/report/${mockClients[0].id}`)}
            className={`min-h-12 rounded-xl font-black text-sm ${
              isDarkMode
                ? 'bg-[#111827] text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            리포트
          </button>
        </div>
      </nav>
    </main>
  );
};

export default AdminDashboard;