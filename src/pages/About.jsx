import { IMAGES } from '../constants/images';

const About = ({ isDarkMode }) => {
  return (
    <div className="tab-page space-y-28 pb-32">
      <div className="space-y-4 max-w-3xl reveal-1">
        <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Our Engineering Philosophy</span>
        <h3 className={`text-2xl md:text-4xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          우리는 판단하고 평가하는 AI가 아닌,<br />
          인간의 마음을 예방하고 <span className="text-blue-600">지키는 AI</span>를 만듭니다.
        </h3>
        <p className={`text-xs md:text-sm leading-relaxed pt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          기존의 수많은 인공지능 진단 툴들은 내담자의 상태를 단편적인 지표로 잘라내어 "당신은 우울증 몇 단계입니다"라고 규정짓는 재판관 역할을 자처했습니다. 하지만 인간의 마음은 날씨처럼 유동적입니다. AI CNS는 내담자가 과거에 유지해 오던 고유의 고유 리듬 평형선(The Intra-speaker Baseline)을 심층 분석한 뒤, 평소와 확연하게 이격되어 벌어지는 위기의 이상 징후만을 정확히 캐치해 냅니다. 판단하는 차가운 지능이 아닌, 위급한 순간 상담사에게 조용히 손을 내미는 **'디지털 파수꾼'**의 역할을 지향합니다.
        </p>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t pt-16 reveal-2 ${isDarkMode ? 'border-gray-900' : 'border-gray-200'}`}>
        <div className={`rounded-xl overflow-hidden border bg-gray-900/10 p-1.5 shadow-md ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <img src={IMAGES.aboutVision} alt="Deep Multi-Modal Concept" className="w-full h-full object-cover rounded-lg aspect-video" />
        </div>
        <div className="space-y-5">
          <h4 className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>다중 수치 다중모달 동기화 파이프라인 (Multi-Modal Technology)</h4>
          <p className={`text-xs md:text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            인간의 내면적인 정서 불안과 건강 위기는 결코 한 가지 채널로 정형화되어 분출되지 않습니다. AI CNS는 한국어 자연어 구어체 및 대화체 뉘앙스를 정밀 추적하기 위해 튜닝된 <strong>KcBERT 감정 모델</strong> 텍스트 파트, 성대 근육의 위축도와 주파수 떨림을 캐치하는 <strong>openSMILE 물리 지표 분석</strong> 오디오 파트, 안면 근육의 비대칭 분포를 쫓는 <strong>MediaPipe 벡터 좌표계</strong> 비전 파트를 밀리초 단위로 상호 크로스 매핑하여 결합해 냅니다.
          </p>
        </div>
      </div>

      <div className={`bg-gradient-to-br border rounded-3xl p-6 md:p-12 space-y-10 reveal-3 shadow-xl ${isDarkMode ? 'from-gray-950 via-gray-900/40 to-gray-950 border-gray-800/80' : 'from-white via-gray-50 to-white border-gray-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="space-y-3 col-span-2">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">AWS Cloud Security Infrastructure</span>
            <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>중앙 서버에 어떠한 미디어 원본도 적재하지 않는 무결점 철학</h4>
            <p className={`text-xs md:text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              공공 복지 관내 및 지자체 협력 인프라망을 타겟팅하여 작동하는 헬스케어 솔루션인 만큼, 개인정보 보호 및 규제 허들을 원천 통제했습니다. 모든 인프라는 AWS VPC 사설 격리망 내부에서 통제되며, 가공 및 암호화가 완료된 특징점 수치 배열 테이블 세트만 전송되므로 원본 소리나 영상의 외부 유출 가능성을 기하학적으로 원천 차단했습니다.
            </p>
          </div>
          <div className={`rounded-2xl overflow-hidden border p-1 bg-gray-900/10 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <img src={IMAGES.securityImg} alt="AWS Security Standard" className="w-full h-full object-cover rounded-xl opacity-90" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border-t pt-8 border-gray-800/20">
          {[
            { name: 'Cloudflare Tunnel Secure', desc: '외부 인바운드 개방 포트를 원천적으로 폐쇄하고 승인된 프록시 서버만 통과시키는 특수 터널링 연동망 구축' },
            { name: 'AWS KMS Key standard', desc: '모든 개인화 비식별 수치 데이터베이스 테이블 세트에 군용 표준 AES-256 규격 실시간 이중화 암호 연산 가동' },
            { name: 'Strict IAM Role Management', desc: '최소 권한 가이드라인에 근거한 역할 기반 액세스 토큰 제어 및 실시간 클라우드 감사 관제 추적 모니터링' },
            { name: 'Zero-Storage Client RAM', desc: '임베디드 디바이스 전처리 필터 가동 종료와 동시에 모든 특징 수치 버퍼 데이터 램 캐시 영구 소멸 제거' }
          ].map((sec, i) => (
            <div key={i} className={`p-4 rounded-xl border flex flex-col justify-between shadow-inner ${isDarkMode ? 'bg-gray-900/40 border-gray-900' : 'bg-gray-50 border-gray-200'}`}>
              <div className="text-xs font-black text-blue-600 mb-2">{sec.name}</div>
              <div className="text-[10px] text-gray-500 leading-normal">{sec.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;