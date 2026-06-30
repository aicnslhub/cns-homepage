import { useNavigate } from 'react-router-dom';

const Products = ({ isDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className="tab-page space-y-16 pb-32">
      <div className="space-y-1 reveal-1">
        <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">CNS Technical Specifications</span>
        <h3 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>핵심 가용 엔진 파이프라인 세부 카탈로그</h3>
        <p className="text-xs text-gray-500">임베디드 단말 사양 조건 및 인공지능 가중치 연산 수치 스펙 사양서</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-2">
        {[
          {
            engine: 'Audio AI Core Spec',
            title: '침묵 분석 및 발화 지연 추적 엔진 (Silence & Latency Analysis)',
            details: [
              '상담사의 질문 파동 종료 플래그 인식 후 내담자 최초 발화점까지의 반응 지연 타이밍(Latency) 마이크로 밀리초 추적 측정',
              '유저가 문장을 구사하는 과정 중 심리적 감정 저항, 회피 및 위축 현상으로 인해 발생하는 미세 무음 구간 단락 분할 매핑',
              'pyannote.audio 오디오 인프라를 활용하여 동시 발화가 겹치는 오버랩 구간 화자 격리 분할 처리 및 정밀 대화 크로스 턴 분석',
              '한국어 자연어 대화 정서 특화 KcBERT 미세 조정 가중치를 통한 대화 맥락별 스코어링 및 감정 가중 변화 추이 연산'
            ]
          },
          {
            engine: 'Multi-Modal Platform Integrator',
            title: '하이브리드 디바이스 다중모달 실시간 동기화 라인',
            details: [
              'MediaPipe 가속 파이프라인 엔진을 탑재하여 현장 단말 카메라 기준 안면 68개 키포인트 벡터 모션 실시간 추출 트래킹',
              '얼굴 안면의 미세 근육 움직임 데이터베이스 비교를 통한 좌우 표정 불일치율 측정 및 신경학적 인지 저조 감지 알고리즘 작동',
              '성대 근육 제어력 이상 상태 파악을 위한 openSMILE 기반 오디오 물리 징후 변동폭(Jitter, Shimmer, HNR) 스펙트럼 스캔',
              '엣지 하드웨어 단말 내부의 오디오 커널 필터를 경유하여 현장 잡음 및 마이크 하울링 주파수 신호 1차 전처리 제거 소거'
            ]
          },
          {
            engine: 'AWS Analytics Infrastructure',
            title: '🚦 실시간 위기 관제 모니터링 및 요약 생성 백엔드',
            details: [
              '세션 동작 시간 동안 누입되는 텍스트/주파수/안면 좌표 변화율의 이상 편차 가중 점수를 실시간 가중합 연산 계산',
              '🚦 3단계 신호등 시스템(정상·주의·위험) 형태 대시보드 관제창 표출 및 자치 단체 보호 담당 실무자 즉시 브릿지 연동 인터페이스',
              '면담 종료와 동시에 수집 수치 타임라인을 기반으로 거대 대형 모델을 기동하여 📄1시간 이내 AI 소견 및 상담 내용 요약 리포트 발행',
              '안정성이 확보된 대규모 AWS 인프라 환경 가동을 기반으로 시계열 데이터 가용성을 확보한 유저 7-Session 평형성 추적 관리'
            ]
          }
        ].map((item, idx) => (
          <div key={idx} className={`border p-6 md:p-8 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-300 shadow-sm ${isDarkMode ? 'bg-gray-900/10 border-gray-800 hover:border-blue-500/40' : 'bg-white border-gray-200 hover:border-blue-500/40'}`}>
            <div className="space-y-4">
              <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-md ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{item.engine}</span>
              <h4 className={`text-base font-black leading-snug ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{item.title}</h4>
              <ul className={`space-y-3 border-t pt-4 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                {item.details.map((detail, i) => (
                  <li key={i} className={`text-[11px] flex items-start space-x-2 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="text-blue-500 font-bold mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`text-[11px] text-blue-600 font-bold cursor-pointer hover:underline border-t pt-4 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>기술 규격 사양 정의서(Spec Sheet v1.4) 다운로드 →</div>
          </div>
        ))}
      </div>

      <div className={`border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 reveal-3 shadow-sm ${isDarkMode ? 'bg-gray-950 border-gray-900' : 'bg-white border-gray-200'}`}>
        <div className="space-y-1">
          <h5 className={`text-xs md:text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>임베디드 단말기 하드웨어 장비 및 공공 망 연동 범위 호환 가이드</h5>
          <p className="text-[11px] text-gray-500 leading-relaxed">NVIDIA Jetson 가속 장비 모듈, 단말 로컬 커스텀 FPGA 제어 레이어 프로토콜 규격 및 기존 도메인 대행사(가비아, 카페24 등) 도메인 네임서버 포워딩 라우팅 인프라 환경과의 실증 PoC 규격 가이드라인 수립이 완비되어 있습니다.</p>
        </div>
        <button onClick={() => navigate('/inquiry')} className={`px-5 py-3 rounded-xl font-bold text-[11px] whitespace-nowrap transition border ${isDarkMode ? 'bg-gray-900 border-gray-800 text-gray-200 hover:bg-gray-800' : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-200'}`}>인프라 연동 적합성 의뢰</button>
      </div>
    </div>
  );
};

export default Products;