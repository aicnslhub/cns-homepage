import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockClients } from '../../data/mockClients';

const levelStyle = {
  red: 'text-red-400 bg-red-500/10 border-red-500/30',
  yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  green: 'text-green-400 bg-green-500/10 border-green-500/30',
};

const statusVisual = {
  red: {
    text: 'text-red-500',
    bg: 'bg-red-500',
    glow: 'shadow-red-500/70',
    border: 'border-red-500',
  },
  yellow: {
    text: 'text-yellow-400',
    bg: 'bg-yellow-400',
    glow: 'shadow-yellow-400/70',
    border: 'border-yellow-400',
  },
  green: {
    text: 'text-green-500',
    bg: 'bg-green-500',
    glow: 'shadow-green-500/70',
    border: 'border-green-500',
  },
};

const EmotionBars = ({ emotions }) => {
  const entries = Object.entries(emotions);

  return (
    <div className="space-y-4">
      {entries.map(([name, value]) => {
        return (
          <div key={name}>
            <div className="flex justify-between text-sm font-bold mb-1">
              <span>
                {name}
              </span>

              <span>
                {value}%
              </span>
            </div>

            <div className="h-3 rounded-full bg-gray-700/50 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{
                  width: `${value}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const AccordionItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-700/50 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-4 flex items-center justify-between gap-3 text-left"
      >
        <div>
          <div className="font-black">
            {index + 1}. {item.title}
          </div>

          <div
            className={`inline-flex mt-2 px-2 py-1 rounded-lg border text-xs font-black ${
              levelStyle[item.level]
            }`}
          >
            {item.status}
          </div>
        </div>

        <span
          className={`transition ${
            open ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="pb-4 text-sm leading-relaxed text-gray-400">
          {item.detail}
        </div>
      )}
    </div>
  );
};

const AdminReport = ({
  basePath = '/admin',
  isDarkMode,
  setIsDarkMode,
}) => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  const client =
    mockClients.find((item) => {
      return item.id === clientId;
    }) || mockClients[0];

  const visual = statusVisual[client.status];

  return (
    <main
      className={`min-h-[100dvh] px-4 pt-5 pb-[calc(110px+env(safe-area-inset-bottom))] ${
        isDarkMode
          ? 'bg-black text-white'
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="w-full max-w-[860px] mx-auto">
        <header className="flex items-start justify-between gap-3 mb-5">
          <div>
            <p className="text-blue-500 text-sm font-black mb-1">
              CNS AI REPORT
            </p>

            <h1 className="text-2xl font-black">
              AI 분석 리포트
            </h1>

            <p
              className={`mt-2 text-sm ${
                isDarkMode
                  ? 'text-gray-400'
                  : 'text-gray-500'
              }`}
            >
              ID: {client.id} · {client.lastAnalyzedAt}
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

        <section
          className={`rounded-3xl p-4 border mb-4 ${
            isDarkMode
              ? 'bg-[#111827] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-xs opacity-60 font-black mb-1">
                상담자
              </div>

              <div className="font-black">
                {client.counselor}
              </div>
            </div>

            <div className="text-center border-l border-gray-700/50">
              <div className="text-xs opacity-60 font-black mb-1">
                내담자
              </div>

              <div className="font-black">
                {client.name}
              </div>
            </div>
          </div>
        </section>

        <section
          className={`rounded-3xl p-6 border-2 mb-4 text-center ${
            isDarkMode
              ? 'bg-[#111827]'
              : 'bg-white'
          } ${visual.border}`}
        >
          <div
            className={`w-20 h-20 rounded-full mx-auto mb-4 ${visual.bg} shadow-2xl ${visual.glow}`}
          />

          <div className="text-xl font-black">
            종합 상태:{' '}

            <span className={visual.text}>
              {client.statusLabel}
            </span>
          </div>

          <div
            className={`mt-4 rounded-2xl p-4 text-left text-sm leading-relaxed ${
              client.status === 'red'
                ? 'bg-red-500/10 text-red-200'
                : client.status === 'yellow'
                  ? 'bg-yellow-400/10 text-yellow-100'
                  : 'bg-green-500/10 text-green-100'
            }`}
          >
            <b>AI 분석 리포트</b>
            <br />
            {client.summary}
          </div>
        </section>

        <section
          className={`rounded-3xl p-5 border mb-4 ${
            isDarkMode
              ? 'bg-[#111827] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <h2 className="text-lg font-black mb-4">
            다운로드
          </h2>

          <div className="flex flex-col gap-3">
            <button className="w-full min-h-12 rounded-xl bg-gray-700 text-white font-black">
              화자 분리 대화록 다운로드
            </button>

            <button className="w-full min-h-12 rounded-xl bg-blue-600 text-white font-black">
              상담 음성 다운로드
            </button>
          </div>
        </section>

        <section
          className={`rounded-3xl p-5 border mb-4 ${
            isDarkMode
              ? 'bg-[#111827] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <h2 className="text-lg font-black mb-4">
            AI 감정 분포
          </h2>

          <EmotionBars emotions={client.emotions} />
        </section>

        <section
          className={`rounded-3xl p-5 border mb-4 ${
            isDarkMode
              ? 'bg-[#111827] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <h2 className="text-lg font-black mb-2">
            5대 선별 지표
          </h2>

          <p
            className={`text-sm mb-3 ${
              isDarkMode
                ? 'text-gray-400'
                : 'text-gray-500'
            }`}
          >
            항목을 눌러 상세 내용을 확인합니다.
          </p>

          {client.indicators.map((item, index) => {
            return (
              <AccordionItem
                key={item.title}
                item={item}
                index={index}
              />
            );
          })}
        </section>

        <section
          className={`rounded-3xl p-5 border mb-4 ${
            isDarkMode
              ? 'bg-[#111827] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <h2 className="text-lg font-black mb-3">
            종합 소견
          </h2>

          <p className="text-sm leading-relaxed">
            {client.opinion}
          </p>
        </section>

        <section className="rounded-2xl p-4 border border-yellow-400/30 bg-yellow-400/10 text-yellow-100 text-xs leading-relaxed mb-4">
          <b>주의:</b> 본 리포트는 음성 및 대화 패턴 기반의 AI 선별 참고자료이며,
          의학적 진단을 대체하지 않습니다. 긴급 위험이 의심되는 경우 보호자,
          상담 전문가 또는 의료기관의 확인이 필요합니다.
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

          <button className="min-h-12 rounded-xl bg-blue-600 text-white font-black text-sm">
            리포트
          </button>
        </div>
      </nav>
    </main>
  );
};

export default AdminReport;