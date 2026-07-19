import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants/images';

const Home = ({ isDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className="tab-page space-y-36 pb-32">
      <div className={`relative rounded-3xl overflow-hidden border p-8 md:p-24 text-center shadow-xl reveal-1 ${isDarkMode? 'border-gray-800/80 bg-gray-900': 'border-gray-200 bg-white'}`}>
        <div className="absolute inset-0 z-0 pointer-events-none"style={{backgroundImage: `url(${IMAGES.heroBackground})`,backgroundSize: 'cover',backgroundPosition: 'center',}}/>
        <div className={`absolute inset-0 z-0 pointer-events-none ${isDarkMode ? 'bg-black/45' : 'bg-white/35'}`}/>
        <div className="relative z-10 space-y-8">
          <div className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-600 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase">
              ⚡ CONNECTING HUMAN MINDS WITH EDGE INTELLIGENCE
          </div>

          <h1 className={`text-2xl md:text-5xl font-black tracking-tight max-w-4xl mx-auto leading-tight md:leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            텍스트를 넘어 목소리와 마음의 깊이까지,<br />
            <span className={isDarkMode ? 'bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent' : 'text-blue-600'}>
              AI 디지털 파수꾼 (CNS)
            </span>
          </h1>

          <p className={`max-w-3xl mx-auto text-xs md:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            단순 텍스트 변환과 감정 분석을 넘어 발화 리듬, 정밀 침묵 태깅, 실시간 비언어 표정 수치화 기술을 엮었습니다. 다문화 가정, 언어 표현 취약 계층의 심리 건강 상태와 고립 위험 징후를 조기에 관제하는 혁신적인 다중 다중모달 하이브리드 인프라 솔루션입니다.
            </p>

          <div className="flex justify-center space-x-4 pt-4">
            <button
              onClick={() => navigate('/inquiry')}
              className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs md:text-sm tracking-wide shadow-md transition duration-200"
            >
              도입 문의 및 PoC 신청하기
            </button>

            <button
              onClick={() => navigate('/products')}
              className={`px-6 py-4 border rounded-xl font-bold text-xs md:text-sm tracking-wide transition duration-200 ${
                isDarkMode
                  ? 'bg-gray-900/80 border-gray-800 text-gray-300 hover:bg-gray-800'
                  : 'bg-white/70 border-gray-300 text-gray-700 hover:bg-white'
              }`}
            >
               기술 정의 규격서 열람
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-2">
        {[
          { num: '7-Session', label: '시계열 고유 감정 베이스라인 학습', text: '단발적인 측정 에러와 왜곡을 방지하기 위해 유저 고유의 초기 7회 세션 상담 리듬을 복합 가중 학습하여 감정의 평형 평면선을 정밀하게 수립합니다.' },
          { num: '0.01s 단위', label: '초저지연 Turn-taking 발화 관제', desc: '상담 과정에서 발생하는 미세 대화 끊김 편차, 질문 후 답변이 시작되기까지의 발화 지연(Response Latency) 시간을 단말 내부 엣지 단에서 실시간 제어합니다.' },
          { num: '100% Privacy', label: '생체 원본 미디어 즉시 파기 수칙', text: '가장 민감한 영역인 원본 음성 녹음과 안면 영상은 디바이스 내부 전처리 모듈에서 68개 좌표 및 파형 특징 정보만 추출한 뒤 메모리 상에서 실시간 완전 파기됩니다.' }
        ].map((stat, i) => (
          <div key={i} className={`border rounded-2xl p-6 md:p-8 shadow-sm transition flex flex-col justify-between ${isDarkMode ? 'bg-gray-950/60 border-gray-900' : 'bg-white border-gray-200'}`}>
            <div className="space-y-4">
              <div className="text-3xl font-black text-blue-600">{stat.num}</div>
              <h4 className={`text-sm md:text-base font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{stat.label}</h4>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.text || stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center reveal-3">
        <div className="space-y-6">
          <div className="text-xs font-bold text-blue-500 uppercase tracking-wider">01 / CLOUD & EDGE HYBRID ARCHITECTURE</div>
          <h2 className={`text-2xl md:text-3xl font-bold tracking-tight leading-snug ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>엣지 단말 전처리 연산과 AWS 대용량 분산 클라우드의 매핑</h2>
          <p className={`text-xs md:text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            현장에 즉각 보급되는 임베디드 단말(NVIDIA Jetson 가속 보드 및 로컬 시스템)은 오디오 가속 필터를 가동해 주변 환경 소음을 제거하고 비언어적 랜드마크 좌표계 추출을 완수합니다. 이후 가공된 보안 좌표 정보 수치 배열 세트만을 안전하게 API 라우팅하여, 대규모 장기 시계열 시각화 분석 처리는 글로벌 가용성이 입증된 <strong>AWS 인프라 서버망</strong>에서 동시 분산 처리해 냅니다.
          </p>
          <div className={`p-5 border rounded-2xl space-y-2.5 shadow-sm ${isDarkMode ? 'bg-gray-900/40 border-gray-800' : 'bg-blue-50/40 border-blue-100'}`}>
            <div className="text-xs font-bold text-blue-600">📊 임베디드 키오스크 및 모바일 멀티 디바이스 통합 호환</div>
            <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>관내 복지 센터에 배치될 고정식 헬스케어 키오스크 환경은 물론, 현장 원격 방문 케어를 지원하기 위한 크로스 플랫폼 모바일 앱(Expo SDK 하이브리드 아키텍처)까지 폭넓은 멀티 채널 통신 엔드포인트를 구축하여 트래픽 병목 현상이 발생하지 않습니다.</p>
          </div>
        </div>
        <div className={`rounded-2xl overflow-hidden border shadow-lg bg-gray-900/10 p-2 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <img src={IMAGES.productDashboard} alt="System Dashboard Spec" className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>

      <div className={`border-t pt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${isDarkMode ? 'border-gray-900' : 'border-gray-200'}`}>
        <div className={`rounded-2xl overflow-hidden border shadow-lg bg-gray-900/10 p-2 order-last md:order-first ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <img src={IMAGES.kioskImg} alt="Kiosk Deployment" className="w-full h-auto object-contain rounded-xl" />
        </div>
        <div className="space-y-6">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">02 / PUBLIC WELFARE & DIGITAL ANTIVIRUS</div>
          <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>소외 계층의 보이지 않는 벽을 허무는 디지털 안심 방역선</h2>
          <p className={`text-xs md:text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            자신의 심리적 우울감이나 뇌졸중 및 인지 지연성 질환 등의 위기 전조 증상을 말로 명확히 소통하기 힘든 다문화 계층, 독거 고령층, 발화 표현 장애인 분들은 위험에 직면해도 사회적 구호 신호를 먼저 타전하기 힘듭니다. AI CNS는 음성 주파수 변동폭(Jitter, Shimmer) 스펙트럼과 안면 미세 근육의 실시간 비대칭 일탈도를 연산하여, 위험 편차가 축적될 경우 자치 단체 및 관제 센터에 🚦3단계 신호등 형태로 이상 징후를 사전 통보해 줍니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <h5 className={`text-xs font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>✓ 광명형 복지망 실증화 PoC</h5>
              <p className="text-[11px] text-gray-500 leading-tight">정부 과제 및 지자체 매칭 지원 사업 규격에 완벽히 호환 설계</p>
            </div>
            <div className="space-y-1">
              <h5 className={`text-xs font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>✓ 상담사 관제 센터 연동망</h5>
              <p className="text-[11px] text-gray-500 leading-tight">이상 가중치 위험 알림 도출 시 원격 관제 즉각 푸시 인터페이스</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`border-t pt-24 space-y-8 ${isDarkMode ? 'border-gray-900' : 'border-gray-200'}`}>
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>엔터프라이즈급 인프라 설계 패러다임</h3>
          <p className="text-xs text-gray-500 leading-relaxed">CORS 오류 및 데이터 고립 현상을 원천 배제하기 위해 카페24/가비아 호스팅을 탈피하여 설계된 독자적인 연산 파이프라인의 핵심 구조적 강점입니다.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: '16kHz 모노 강제화', desc: '음악용 고용량 데이터 낭비를 제거하고 기계 학습과 STT 분석 효율을 극대화하는 주파수 통일' },
            { title: 'CORS 데이터 고립 방지', desc: '프론트엔드와 AWS 클라우드 연산망 간 웹 보안 도메인 제약을 사전에 통제하는 API 라우팅 가이드' },
            { title: '결제 모듈 위젯화 API', desc: '무겁고 복잡한 서버 가동 없이 토스페이먼츠 등 독립 API 가동으로 초고속 비즈니스 전개' },
            { title: '이벤트 기반 스케줄링', desc: '상담 세션 종료 1시간 뒤 자동 요약 보고서 전송 등 컴퓨팅 자원 낭비가 없는 서버리스 아키텍처' }
          ].map((spec, i) => (
            <div key={i} className={`p-5 rounded-2xl border text-left flex flex-col justify-between ${isDarkMode ? 'bg-gray-900/20 border-gray-800' : 'bg-white border-gray-200'}`}>
              <h4 className="text-xs font-bold text-blue-600 mb-2">{spec.title}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">{spec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;