import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pad = (num) => {
  return String(num).padStart(2, '0');
};

const formatDuration = (seconds) => {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  return `${pad(hour)}:${pad(minute)}:${pad(second)}`;
};

const getTodayDate = () => {
  const now = new Date();

  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;
};

const getCurrentTime = () => {
  const now = new Date();

  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

const createFileName = ({
  counselorName,
  clientName,
  sessionDate,
  startTime,
}) => {
  const safeCounselor = counselorName.trim() || 'counselor';
  const safeClient = clientName.trim() || 'client';
  const safeDate = sessionDate.replaceAll('-', '');
  const safeTime = startTime.replaceAll(':', '');

  return `CNS_${safeDate}_${safeTime}_${safeCounselor}_${safeClient}.webm`;
};

const AppRecorder = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const role = localStorage.getItem('cns_app_role');

  const [counselorName, setCounselorName] = useState('이민경 대표');
  const [clientName, setClientName] = useState('아이작');
  const [sessionDate, setSessionDate] = useState(getTodayDate());
  const [startTime, setStartTime] = useState(getCurrentTime());

  const [isRecording, setIsRecording] = useState(false);
  const [isSheetExpanded, setIsSheetExpanded] = useState(true);

  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const [recordStatus, setRecordStatus] = useState('대기 중');
  const [uploadStatus, setUploadStatus] = useState('업로드 대기');
  const [analysisStatus, setAnalysisStatus] = useState('AI 분석 요청 대기');
  const [uploadProgress, setUploadProgress] = useState(0);

  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleStartRecording = async () => {
    try {
      if (!isSheetExpanded) {
        setIsSheetExpanded(true);
      }

      setRecordStatus('마이크 권한 요청 중');
      setUploadStatus('업로드 대기');
      setAnalysisStatus('AI 분석 요청 대기');
      setUploadProgress(0);
      setAudioUrl('');
      setRecordingSeconds(0);

      const currentTime = getCurrentTime();

      setStartTime(currentTime);

      const generatedFileName = createFileName({
        counselorName,
        clientName,
        sessionDate,
        startTime: currentTime,
      });

      setFileName(generatedFileName);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      chunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: 'audio/webm',
        });

        const url = URL.createObjectURL(blob);

        setAudioUrl(url);
        setRecordStatus('녹음 완료');

        setRecordings((prev) => [
          {
            id: Date.now().toString(),
            fileName: generatedFileName,
            counselorName,
            clientName,
            sessionDate,
            startTime: currentTime,
            duration: formatDuration(recordingSeconds),
            audioUrl: url,
          },
          ...prev,
        ]);

        stream.getTracks().forEach((track) => {
          track.stop();
        });
      };

      mediaRecorder.start();

      setIsRecording(true);
      setRecordStatus('녹음 중...');

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error(error);

      setRecordStatus('마이크 권한 또는 녹음 기능을 사용할 수 없습니다.');
    }
  };

  const handleStopRecording = () => {
    if (!mediaRecorderRef.current) {
      return;
    }

    mediaRecorderRef.current.stop();

    setIsRecording(false);
    setRecordStatus('녹음 종료 처리 중');

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMockUpload = () => {
    if (!audioUrl) {
      setUploadStatus('먼저 녹음을 완료해 주세요.');
      return;
    }

    setUploadProgress(0);
    setUploadStatus('AWS 업로드 준비 중');
    setAnalysisStatus('AI 분석 요청 대기');

    let progress = 0;

    const timer = setInterval(() => {
      progress += 10;

      setUploadProgress(progress);
      setUploadStatus(`AWS 업로드 중 ${progress}%`);

      if (progress >= 100) {
        clearInterval(timer);

        setUploadStatus('AWS 업로드 완료');
        setAnalysisStatus('AI 분석 요청 완료 - 결과 대기 중');
      }
    }, 180);
  };

  const handleLogout = () => {
    localStorage.removeItem('cns_app_login');
    localStorage.removeItem('cns_app_role');
    localStorage.removeItem('cns_user_role');

    navigate('/app/login', {
      replace: true,
    });
  };

  const updateRecordingClientName = (id, value) => {
    setRecordings((prev) => {
      return prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          clientName: value,
        };
      });
    });
  };

  return (
    <main
      className={`min-h-[100dvh] relative overflow-hidden ${
        isDarkMode
          ? 'bg-black text-white'
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="min-h-[100dvh] px-4 pt-5 pb-[calc(130px+env(safe-area-inset-bottom))]">
        <div className="w-full max-w-[500px] mx-auto">
          <header className="flex items-start justify-between gap-3 mb-6">
            <div>
              <p className="text-green-500 text-sm font-black mb-1">
                CNS RECORD APP
              </p>

              <h1 className="text-3xl font-black tracking-tight">
                상담 기록
              </h1>

              <p
                className={`mt-2 text-sm ${
                  isDarkMode
                    ? 'text-gray-400'
                    : 'text-gray-500'
                }`}
              >
                녹음 후 AWS 업로드 및 AI 분석으로 연결됩니다.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {role === 'admin' && (
                <button
                  type="button"
                  onClick={() => navigate('/app/admin')}
                  className={`min-h-11 min-w-11 px-3 rounded-xl text-sm font-bold border flex items-center justify-center ${
                    isDarkMode
                      ? 'bg-[#111827] border-blue-500/40 text-blue-400'
                      : 'bg-white border-blue-300 text-blue-600'
                  }`}
                  title="AI 관제센터"
                >
                  🧠
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`min-h-11 min-w-11 px-3 rounded-xl text-sm font-bold border flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-[#111827] border-gray-700 text-yellow-300'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
            </div>
          </header>

          <section
            className={`rounded-[28px] p-4 border mb-4 ${
              isDarkMode
                ? 'bg-[#111827] border-gray-800'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-bold mb-2">
                  상담자 이름
                </label>

                <input
                  value={counselorName}
                  onChange={(e) => setCounselorName(e.target.value)}
                  disabled={isRecording}
                  className={`w-full min-h-12 rounded-xl px-4 border outline-none text-base ${
                    isDarkMode
                      ? 'bg-black border-gray-700 text-white disabled:opacity-50'
                      : 'bg-white border-gray-300 text-gray-900 disabled:opacity-50'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  내담자 이름
                </label>

                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  disabled={isRecording}
                  className={`w-full min-h-12 rounded-xl px-4 border outline-none text-base ${
                    isDarkMode
                      ? 'bg-black border-gray-700 text-white disabled:opacity-50'
                      : 'bg-white border-gray-300 text-gray-900 disabled:opacity-50'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    상담 날짜
                  </label>

                  <input
                    type="date"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    disabled={isRecording}
                    className={`w-full min-h-12 rounded-xl px-3 border outline-none text-base ${
                      isDarkMode
                        ? 'bg-black border-gray-700 text-white disabled:opacity-50'
                        : 'bg-white border-gray-300 text-gray-900 disabled:opacity-50'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    시작 시간
                  </label>

                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    disabled={isRecording}
                    className={`w-full min-h-12 rounded-xl px-3 border outline-none text-base ${
                      isDarkMode
                        ? 'bg-black border-gray-700 text-white disabled:opacity-50'
                        : 'bg-white border-gray-300 text-gray-900 disabled:opacity-50'
                    }`}
                  />
                </div>
              </div>
            </div>
          </section>

          <section
            className={`rounded-[28px] p-4 border mb-4 ${
              isDarkMode
                ? 'bg-[#111827] border-gray-800'
                : 'bg-white border-gray-200'
            }`}
          >
            <h2 className="text-lg font-black mb-3">
              녹음 파일 정보
            </h2>

            <div className="space-y-3 text-sm">
              <div
                className={`rounded-2xl p-4 ${
                  isDarkMode
                    ? 'bg-black/40'
                    : 'bg-gray-100'
                }`}
              >
                <div className="opacity-60 font-bold mb-1">
                  녹음 파일명
                </div>

                <div className="font-black break-all">
                  {fileName || '아직 생성된 녹음 파일이 없습니다.'}
                </div>
              </div>

              <div
                className={`rounded-2xl p-4 ${
                  isDarkMode
                    ? 'bg-black/40'
                    : 'bg-gray-100'
                }`}
              >
                <div className="opacity-60 font-bold mb-1">
                  업로드 상태
                </div>

                <div className="font-black text-blue-500">
                  {uploadStatus}
                </div>
              </div>

              <div
                className={`rounded-2xl p-4 ${
                  isDarkMode
                    ? 'bg-black/40'
                    : 'bg-gray-100'
                }`}
              >
                <div className="opacity-60 font-bold mb-1">
                  AI 분석 요청 상태
                </div>

                <div className="font-black text-green-500">
                  {analysisStatus}
                </div>
              </div>
            </div>

            {uploadProgress > 0 && (
              <div className="mt-5">
                <div
                  className={`h-3 rounded-full overflow-hidden ${
                    isDarkMode
                      ? 'bg-black'
                      : 'bg-gray-200'
                  }`}
                >
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  />
                </div>

                <div className="mt-2 text-sm font-bold text-blue-500">
                  업로드 진행률 {uploadProgress}%
                </div>
              </div>
            )}

            {audioUrl && (
              <div className="mt-5">
                <p className="text-sm font-bold mb-2">
                  녹음 미리듣기
                </p>

                <audio
                  src={audioUrl}
                  controls
                  className="w-full"
                />
              </div>
            )}
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-black mb-3">
              최근 녹음 목록
            </h2>

            {recordings.length === 0 ? (
              <div
                className={`rounded-2xl p-5 text-sm ${
                  isDarkMode
                    ? 'bg-[#111827] text-gray-400'
                    : 'bg-white text-gray-500'
                }`}
              >
                아직 저장된 녹음이 없습니다.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {recordings.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl p-4 border ${
                        isDarkMode
                          ? 'bg-[#111827] border-gray-800'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="font-black text-sm break-all">
                        {item.fileName}
                      </div>

                      <div
                        className={`mt-1 text-xs ${
                          isDarkMode
                            ? 'text-gray-400'
                            : 'text-gray-500'
                        }`}
                      >
                        녹음 시간: {item.duration}
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className={`text-sm ${
                            isDarkMode
                              ? 'text-gray-400'
                              : 'text-gray-500'
                          }`}
                        >
                          내담자:
                        </span>

                        <input
                          value={item.clientName}
                          onChange={(e) =>
                            updateRecordingClientName(
                              item.id,
                              e.target.value
                            )
                          }
                          className="flex-1 bg-transparent text-blue-500 font-black text-sm outline-none"
                        />

                        <span className="text-gray-500">
                          ›
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <button
            onClick={handleLogout}
            className={`w-full min-h-14 rounded-xl font-black border mb-24 ${
              isDarkMode
                ? 'border-gray-700 text-gray-300 bg-[#111827]'
                : 'border-gray-300 text-gray-700 bg-white'
            }`}
          >
            로그아웃
          </button>
        </div>
      </div>

      <section
        className={`fixed left-0 right-0 bottom-0 z-50 transition-all duration-300 rounded-t-[32px] overflow-hidden border-t ${
          isSheetExpanded
            ? 'h-[420px]'
            : 'h-[104px]'
        } ${
          isDarkMode
            ? 'bg-[#1c1c1e] border-gray-800'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className="w-full max-w-[500px] mx-auto">
          <button
            type="button"
            onClick={() => setIsSheetExpanded(!isSheetExpanded)}
            className="w-full h-11 flex flex-col items-center justify-center"
          >
            <div
              className={`w-10 h-1.5 rounded-full mb-1 ${
                isDarkMode
                  ? 'bg-gray-700'
                  : 'bg-gray-300'
              }`}
            />

            <span
              className={`text-xs ${
                isDarkMode
                  ? 'text-gray-500'
                  : 'text-gray-400'
              }`}
            >
              {isSheetExpanded ? '⌄' : '⌃'}
            </span>
          </button>

          {isSheetExpanded ? (
            <div className="px-6 pb-[calc(20px+env(safe-area-inset-bottom))] text-center">
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                disabled={isRecording}
                placeholder="내담자 이름 입력"
                className={`w-full bg-transparent border-b text-center text-lg font-black outline-none pb-3 mb-5 ${
                  isDarkMode
                    ? 'text-white border-gray-700 placeholder-gray-600'
                    : 'text-gray-900 border-gray-300 placeholder-gray-400'
                }`}
              />

              <div className="h-10 flex items-center justify-center gap-1 mb-3">
                {[0, 1, 2, 3, 4, 5, 6].map((item) => {
                  return (
                    <div
                      key={item}
                      className={`w-1 rounded-full bg-red-500 ${
                        isRecording
                          ? 'animate-pulse'
                          : ''
                      }`}
                      style={{
                        height: isRecording
                          ? `${16 + ((item * 9) % 24)}px`
                          : `${12 + ((item * 5) % 14)}px`,
                        animationDelay: `${item * 0.08}s`,
                      }}
                    />
                  );
                })}
              </div>

              <div className="text-4xl font-black tracking-tight mb-1">
                {formatDuration(recordingSeconds)}
              </div>

              <div
                className={`text-sm font-bold mb-5 ${
                  isRecording
                    ? 'text-red-500'
                    : isDarkMode
                      ? 'text-gray-400'
                      : 'text-gray-500'
                }`}
              >
                {recordStatus}
              </div>

              <button
                type="button"
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className="w-20 h-20 rounded-full border-4 border-white mx-auto flex items-center justify-center"
              >
                <div
                  className={`bg-red-500 transition-all duration-200 ${
                    isRecording
                      ? 'w-9 h-9 rounded-lg'
                      : 'w-14 h-14 rounded-full'
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={handleMockUpload}
                className="mt-5 w-full min-h-12 rounded-xl bg-blue-600 active:bg-blue-800 text-white font-black"
              >
                AWS 업로드 테스트
              </button>
            </div>
          ) : (
            <div className="px-6 pb-[calc(14px+env(safe-area-inset-bottom))] flex items-center justify-between">
              <div className="text-left">
                <div className="font-black">
                  {isRecording ? '녹음 진행 중...' : '새로운 상담 준비'}
                </div>

                <div
                  className={`text-sm mt-1 ${
                    isDarkMode
                      ? 'text-gray-400'
                      : 'text-gray-500'
                  }`}
                >
                  {formatDuration(recordingSeconds)}
                </div>
              </div>

              <button
                type="button"
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
              >
                <div
                  className={`bg-red-500 transition-all duration-200 ${
                    isRecording
                      ? 'w-5 h-5 rounded'
                      : 'w-9 h-9 rounded-full'
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AppRecorder;