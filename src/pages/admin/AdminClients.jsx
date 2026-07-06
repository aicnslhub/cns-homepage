import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockClients } from '../../data/mockClients';

const statusStyle = {
  red: {
    border: 'border-l-red-500',
    dot: 'bg-red-500 shadow-red-500/60',
    tag: 'bg-red-500/10 text-red-400',
  },
  yellow: {
    border: 'border-l-yellow-400',
    dot: 'bg-yellow-400 shadow-yellow-400/60',
    tag: 'bg-yellow-400/10 text-yellow-400',
  },
  green: {
    border: 'border-l-green-500',
    dot: 'bg-green-500 shadow-green-500/60',
    tag: 'bg-green-500/10 text-green-500',
  },
};

const AdminClients = ({
  basePath = '/admin',
  isDarkMode,
  setIsDarkMode,
}) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [sortType, setSortType] = useState('risk');

  const filteredClients = useMemo(() => {
    const searched = mockClients.filter((client) => {
      const value = `${client.name} ${client.id} ${client.tags.join(' ')}`;

      return value.toLowerCase().includes(keyword.toLowerCase());
    });

    if (sortType === 'name') {
      return [...searched].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }

    if (sortType === 'latest') {
      return [...searched].sort((a, b) => {
        return b.lastAnalyzedAt.localeCompare(a.lastAnalyzedAt);
      });
    }

    return [...searched].sort((a, b) => {
      return b.riskScore - a.riskScore;
    });
  }, [keyword, sortType]);

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
              CNS CLIENT MANAGEMENT
            </p>

            <h1 className="text-2xl sm:text-3xl font-black">
              전체 내담자 관리
            </h1>

            <p
              className={`mt-2 text-sm ${
                isDarkMode
                  ? 'text-gray-400'
                  : 'text-gray-500'
              }`}
            >
              위험도, 회기, 최근 분석 결과를 한 화면에서 확인합니다.
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

        <section className="grid grid-cols-3 gap-3 mb-5">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-center">
            <div className="text-red-500 text-2xl font-black">
              {
                mockClients.filter((client) => {
                  return client.status === 'red';
                }).length
              }
            </div>

            <div className="text-xs font-black mt-1">
              위험
            </div>
          </div>

          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/30 p-4 text-center">
            <div className="text-yellow-400 text-2xl font-black">
              {
                mockClients.filter((client) => {
                  return client.status === 'yellow';
                }).length
              }
            </div>

            <div className="text-xs font-black mt-1">
              주의
            </div>
          </div>

          <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-4 text-center">
            <div className="text-green-500 text-2xl font-black">
              {
                mockClients.filter((client) => {
                  return client.status === 'green';
                }).length
              }
            </div>

            <div className="text-xs font-black mt-1">
              안정
            </div>
          </div>
        </section>

        <section
          className={`rounded-3xl p-4 border mb-5 ${
            isDarkMode
              ? 'bg-[#111827] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="내담자 이름, ID, 태그 검색..."
            className={`w-full min-h-12 rounded-xl px-4 border outline-none text-base mb-3 ${
              isDarkMode
                ? 'bg-black border-gray-700 text-white placeholder-gray-600'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            }`}
          />

          <div className="flex items-center justify-between gap-3">
            <div className="font-black text-sm">
              총 {filteredClients.length}명
            </div>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className={`min-h-10 rounded-xl px-3 text-sm font-bold outline-none ${
                isDarkMode
                  ? 'bg-black border border-gray-700 text-white'
                  : 'bg-gray-100 border border-gray-200 text-gray-900'
              }`}
            >
              <option value="risk">
                위험도 높은 순
              </option>

              <option value="latest">
                최신 분석 순
              </option>

              <option value="name">
                가나다 순
              </option>
            </select>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          {filteredClients.map((client) => {
            const style = statusStyle[client.status];

            return (
              <article
                key={client.id}
                className={`rounded-2xl p-4 border-l-4 ${style.border} ${
                  isDarkMode
                    ? 'bg-[#111827]'
                    : 'bg-white border-y border-r border-gray-200'
                }`}
              >
                <div className="flex justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-4 h-4 rounded-full mt-1 shadow-lg ${style.dot}`}
                    />

                    <div>
                      <div className="text-lg font-black">
                        {client.name}

                        {client.trendDirection === 'up' && (
                          <span className="ml-2 text-sm text-red-400">
                            ↑ {client.trend}
                          </span>
                        )}

                        {client.trendDirection === 'down' && (
                          <span className="ml-2 text-sm text-green-400">
                            ↓ {client.trend}
                          </span>
                        )}

                        {client.trendDirection === 'flat' && (
                          <span className="ml-2 text-sm text-gray-400">
                            - {client.trend}
                          </span>
                        )}
                      </div>

                      <div className="text-sm opacity-70">
                        ID: {client.id}
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-xs sm:text-sm opacity-70">
                    <b>{client.session}</b>
                    <br />
                    {client.lastAnalyzedAt}
                  </div>
                </div>

                <div
                  className={`mt-4 rounded-xl p-3 ${
                    isDarkMode
                      ? 'bg-black/40'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex flex-wrap gap-2 mb-2">
                    {client.tags.map((tag) => {
                      return (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded-lg text-xs font-black ${style.tag}`}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  <p className="text-sm leading-relaxed">
                    <b>AI 요약:</b> {client.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => navigate(`${basePath}/report/${client.id}`)}
                    className="min-h-12 rounded-xl bg-blue-600 active:bg-blue-800 text-white font-black"
                  >
                    상세 리포트 보기
                  </button>

                  <button
                    className={`min-h-12 rounded-xl font-black ${
                      isDarkMode
                        ? 'bg-gray-800 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    음성/대화록 다운로드
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      </div>

      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] border-t ${
          isDarkMode
            ? 'bg-black/90 border-gray-800'
            : 'bg-white/90 border-gray-200'
        } backdrop-blur-md`}
      >
        <div className="max-w-[860px] mx-auto grid grid-cols-3 gap-2">
          <button
            onClick={() => navigate(basePath)}
            className={`min-h-12 rounded-xl font-black text-sm ${
              isDarkMode
                ? 'bg-[#111827] text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            관제센터
          </button>

          <button className="min-h-12 rounded-xl bg-blue-600 text-white font-black text-sm">
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

export default AdminClients;