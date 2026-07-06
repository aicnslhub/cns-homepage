export const mockClients = [
  {
    id: 'nec273ai',
    name: '아이작',
    counselor: '이민경 대표',
    session: '3 / 7 회기',
    lastAnalyzedAt: '2026-04-08 15:30',
    status: 'red',
    statusLabel: '주의',
    trend: '악화',
    trendDirection: 'up',
    riskScore: 87,
    tags: [
      '#뇌졸중전조_주의',
      '#성대긴장_위험',
      '#불안지수_증가',
    ],
    summary:
      '구음 장애 지표 15% 상승 및 가족 주제 언급 시 불안도 급증. 긴급 모니터링이 필요합니다.',
    emotions: {
      불안: 65,
      슬픔: 20,
      분노: 10,
      평온: 5,
      기쁨: 0,
    },
    indicators: [
      {
        title: '위기 관리',
        status: '자살위험 낮음, 충동성 보통',
        level: 'yellow',
        detail:
          '발화 내 절망적 키워드 및 극단적 부정어 빈도는 낮은 편입니다. 다만 충동성 관련 표현은 일부 관찰되어 지속 관찰이 필요합니다.',
      },
      {
        title: '정서 장애',
        status: '불안증 주의, 우울 안정',
        level: 'yellow',
        detail:
          '특정 주제에서 음성 떨림과 발화 긴장이 증가했습니다. 불안 반응이 일시적인지 반복 패턴인지 다음 회기에서 확인해야 합니다.',
      },
      {
        title: '신경/인지',
        status: '구음 지표 주의',
        level: 'red',
        detail:
          '발음 부정확도와 음성 긴장도가 평소 대비 높게 측정된 것으로 가정한 샘플 데이터입니다. 실제 서비스에서는 의료 진단이 아닌 선별 참고 지표로 표시해야 합니다.',
      },
      {
        title: '행동/특성',
        status: '집중력 양호, 사고경직 보통',
        level: 'green',
        detail:
          '대화 주제 이탈 빈도는 낮고 집중 유지가 비교적 안정적입니다. 반복 표현은 일부 있으나 과도한 수준은 아닙니다.',
      },
      {
        title: '사회/환경',
        status: '일상 스트레스 높음',
        level: 'yellow',
        detail:
          '관계성 키워드와 피로 관련 표현이 함께 관찰됩니다. 주변 지지 체계와 생활 스트레스 요인을 확인할 필요가 있습니다.',
      },
    ],
    opinion:
      '전반적인 심리 상태는 주의 단계입니다. 음성 떨림, 발화 긴장도, 특정 주제 반응을 다음 회기에서도 비교 관찰해야 합니다.',
  },
  {
    id: 'cns-9921',
    name: '김태형',
    counselor: '이민경 대표',
    session: '1 / 7 회기',
    lastAnalyzedAt: '2026-04-08 14:00',
    status: 'yellow',
    statusLabel: '주의',
    trend: '유지',
    trendDirection: 'flat',
    riskScore: 58,
    tags: [
      '#초기우울_감지',
      '#번아웃_의심',
      '#목소리에너지_저하',
    ],
    summary:
      '발화 에너지가 평균 이하이며 만성 피로 또는 번아웃 가능성이 관찰됩니다.',
    emotions: {
      불안: 35,
      슬픔: 42,
      분노: 5,
      평온: 15,
      기쁨: 3,
    },
    indicators: [
      {
        title: '위기 관리',
        status: '위험 낮음',
        level: 'green',
        detail:
          '극단적 위험 표현은 관찰되지 않았습니다.',
      },
      {
        title: '정서 장애',
        status: '초기 우울 주의',
        level: 'yellow',
        detail:
          '발화 에너지 저하와 느린 응답 패턴이 관찰됩니다.',
      },
      {
        title: '신경/인지',
        status: '정상 범위',
        level: 'green',
        detail:
          '대화 맥락 유지와 단어 회상은 안정적입니다.',
      },
      {
        title: '행동/특성',
        status: '집중력 보통',
        level: 'green',
        detail:
          '주제 이탈 빈도는 높지 않습니다.',
      },
      {
        title: '사회/환경',
        status: '피로 누적 의심',
        level: 'yellow',
        detail:
          '피로와 업무 부담 관련 표현이 일부 관찰됩니다.',
      },
    ],
    opinion:
      '초기 상담 단계로, 라포 형성과 생활 피로도 확인이 중요합니다.',
  },
  {
    id: 'cns-8812',
    name: '박소진',
    counselor: '이민경 대표',
    session: '5 / 7 회기',
    lastAnalyzedAt: '2026-04-07 11:00',
    status: 'green',
    statusLabel: '안정',
    trend: '개선',
    trendDirection: 'down',
    riskScore: 24,
    tags: [
      '#안정적_호흡',
      '#스트레스_감소',
      '#긍정어_증가',
    ],
    summary:
      '이전 회기 대비 음성 피로도가 회복되었고 긍정어 사용 빈도가 증가했습니다.',
    emotions: {
      불안: 15,
      슬픔: 10,
      분노: 5,
      평온: 55,
      기쁨: 15,
    },
    indicators: [
      {
        title: '위기 관리',
        status: '안정',
        level: 'green',
        detail:
          '위기 표현은 관찰되지 않았습니다.',
      },
      {
        title: '정서 장애',
        status: '안정',
        level: 'green',
        detail:
          '정서 반응이 안정적으로 유지되고 있습니다.',
      },
      {
        title: '신경/인지',
        status: '정상 범위',
        level: 'green',
        detail:
          '발화 흐름과 맥락 유지가 안정적입니다.',
      },
      {
        title: '행동/특성',
        status: '양호',
        level: 'green',
        detail:
          '대화 집중도와 반응성이 양호합니다.',
      },
      {
        title: '사회/환경',
        status: '개선',
        level: 'green',
        detail:
          '스트레스 관련 표현이 이전보다 감소했습니다.',
      },
    ],
    opinion:
      '전반적으로 안정적인 상태입니다. 현재의 회복 흐름을 유지하는 방향이 좋습니다.',
  },
];