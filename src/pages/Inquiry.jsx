import { useState } from 'react';

const Inquiry = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({ name: '', org: '', contact: '', email: '', type: '도입 문의', message: '' });

  const handleInputChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };
  
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    alert(`도입 및 협력 신청 문의가 보안 가이드라인에 따라 안전하게 접수되었습니다.`); 
  };

  return (
    <div className="tab-page max-w-xl mx-auto space-y-8 pb-32">
      <div className="text-center space-y-2 reveal-1">
        <h3 className={`text-xl md:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>지자체 관내 도입 신청 및 실증 제휴 제안</h3>
        <p className={`text-xs leading-relaxed max-w-md mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          기관 인프라 환경에 최적화된 하이브리드 데이터 파이프라인 설계 및 디지털 스마트 안심 복지망 PoC 연동 서류 사양을 공유해 주시면 기술 영업 담당 부서에서 확인 후 조속히 회신해 드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`border p-6 md:p-8 rounded-2xl space-y-4 shadow-xl reveal-2 ${isDarkMode ? 'bg-gray-900/30 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={`text-[10px] md:text-[11px] font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>기관 및 고객사 공식 명칭</label>
            <input type="text" name="org" required value={formData.org} onChange={handleInputChange} className={`w-full border rounded-xl px-4 py-3 text-xs outline-none transition ${isDarkMode ? 'bg-gray-950 border-gray-800 text-gray-100 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'}`} placeholder="예: OO시 정신건강복지센터" />
          </div>
          <div className="space-y-1">
            <label className={`text-[10px] md:text-[11px] font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>책임 실무 담당자 성함</label>
            <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className={`w-full border rounded-xl px-4 py-3 text-xs outline-none transition ${isDarkMode ? 'bg-gray-950 border-gray-800 text-gray-100 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'}`} placeholder="담당 팀장 성함" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={`text-[10px] md:text-[11px] font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>회신 직통 연락처</label>
            <input type="text" name="contact" required value={formData.contact} onChange={handleInputChange} className={`w-full border rounded-xl px-4 py-3 text-xs outline-none transition ${isDarkMode ? 'bg-gray-950 border-gray-800 text-gray-100 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'}`} placeholder="010-0000-0000" />
          </div>
          <div className="space-y-1">
            <label className={`text-[10px] md:text-[11px] font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>회신 주소용 기관 이메일</label>
            <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={`w-full border rounded-xl px-4 py-3 text-xs outline-none transition ${isDarkMode ? 'bg-gray-950 border-gray-800 text-gray-100 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'}`} placeholder="name@agency.go.kr" />
          </div>
        </div>

        <div className="space-y-1">
          <label className={`text-[10px] md:text-[11px] font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>희망 프로젝트 연동 유형 구분</label>
          <select name="type" value={formData.type} onChange={handleInputChange} className={`w-full border rounded-xl px-4 py-3 text-xs outline-none transition ${isDarkMode ? 'bg-gray-950 border-gray-800 text-gray-300 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-800 focus:border-blue-500'}`}>
            <option value="도입 문의">관내 센터 시스템 데이터 라인업 도입 및 보급 문의</option>
            <option value="기술 제휴">현장 임베디드 단말 하드웨어 장비 연동 하이브리드 PoC 연동 신청</option>
            <option value="기타">정부 과제 기획 협력 및 지자체 변경 과제 지원 사업 제휴 제안</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className={`text-[10px] md:text-[11px] font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>상세 협업 요청 환경 조건 및 제안 내용</label>
          <textarea name="message" rows="5" required value={formData.message} onChange={handleInputChange} className={`w-full border rounded-xl px-4 py-3 text-xs outline-none transition resize-none leading-relaxed ${isDarkMode ? 'bg-gray-950 border-gray-800 text-gray-100 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'}`} placeholder="희망하시는 도입 대상 취약계층의 대략적인 규모, 결합 연동 장비 스펙 환경 조건(NVIDIA Jetson 모듈 탑재 여부 등)을 간략히 기술해 주세요."></textarea>
        </div>

        <div className={`p-4 rounded-xl border shadow-inner ${isDarkMode ? 'bg-gray-950 border-gray-900' : 'bg-gray-100 border-gray-200'}`}>
          <div className="text-[10px] text-gray-500 leading-relaxed">
            🔒 본 문의창을 거쳐 전달되는 비즈니스 자산 정보 및 요구 명세 데이터 세트는 AWS KMS(키 관리 서비스) 가이드라인에 입각하여 암호 가공 격리 전송 적재되며, 제휴PoC 검증 타당성 목적용으로만 안전 관리 처리됩니다.
          </div>
        </div>

        <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs md:text-sm font-bold text-white shadow-md tracking-wider">
          보안 규격 가이드라인 동의 및 공식 제안 신청서 송신
        </button>
      </form>
    </div>
  );
};

export default Inquiry;