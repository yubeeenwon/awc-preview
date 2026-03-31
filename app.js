/* ═══ CASE DATA ═══ */
const cases = [
  {
    id: 1, tag: 'automation', title: '이메일 자동 분류 & 응답 시스템',
    desc: '수신 이메일을 AI가 분류하고, 맥락에 맞는 초안을 자동 작성하는 워크플로우.',
    problem: '하루 200+건의 고객 이메일을 수동으로 분류·응답하느라 3명의 CS팀이 풀타임 투입.',
    solution: 'LLM 기반 이메일 분류 에이전트 → 카테고리별 응답 템플릿 자동 생성 → 인간 검토 후 발송.',
    result: '응답 시간 4시간 → 25분, CS 인력 3명 → 1명 (검토 역할)',
    tools: 'GPT-4 · Zapier · Gmail API'
  },
  {
    id: 2, tag: 'agent', title: '코드 리뷰 에이전트',
    desc: 'PR이 올라오면 자동으로 코드 품질을 분석하고 리뷰 코멘트를 작성하는 에이전트.',
    problem: '시니어 개발자의 코드 리뷰 병목으로 PR 머지까지 평균 2일 소요.',
    solution: 'GitHub Webhook → AI 코드 분석 에이전트 → 자동 리뷰 코멘트 + 심각도 분류.',
    result: '리뷰 대기 시간 48시간 → 15분, 버그 사전 탐지율 34% 향상',
    tools: 'Claude · GitHub Actions · Custom Agent'
  },
  {
    id: 3, tag: 'ops', title: '서버 모니터링 & 자동 복구',
    desc: '이상 탐지 시 원인을 분석하고 자동으로 복구 조치를 실행하는 운영 워크플로우.',
    problem: '야간 장애 발생 시 온콜 엔지니어 대응까지 평균 23분, 다운타임 비용 분당 ₩50만.',
    solution: '메트릭 이상 탐지 → AI 원인 분석 → 사전 정의된 복구 플레이북 자동 실행.',
    result: '평균 복구 시간 23분 → 3분, 월간 다운타임 67% 감소',
    tools: 'Datadog · PagerDuty · Custom Agent'
  },
  {
    id: 4, tag: 'dev', title: '디자인 → 코드 자동 변환',
    desc: 'Figma 디자인을 분석하여 프론트엔드 코드를 자동 생성하는 파이프라인.',
    problem: '디자인 핸드오프 후 퍼블리싱까지 3~5일, 디자인-개발 간 불일치 빈번.',
    solution: 'Figma API → 레이아웃 분석 에이전트 → HTML/CSS 코드 생성 → 개발자 검토.',
    result: '퍼블리싱 시간 60% 단축, 디자인 일치율 95%+',
    tools: 'Figma API · GPT-4V · Custom Pipeline'
  },
  {
    id: 5, tag: 'automation', title: '회의록 자동화 & 액션 아이템 추적',
    desc: '회의 녹음에서 요약과 액션 아이템을 추출하고, 담당자에게 자동 할당하는 워크플로우.',
    problem: '회의 후 회의록 작성에 30분, 액션 아이템 누락으로 후속 조치 지연.',
    solution: 'STT → 요약 에이전트 → 액션 아이템 추출 → Notion/Slack 자동 생성·알림.',
    result: '회의록 작성 시간 30분 → 0분, 액션 아이템 이행률 55% → 89%',
    tools: 'Whisper · Claude · Notion API · Slack'
  },
  {
    id: 6, tag: 'agent', title: '고객 온보딩 가이드 에이전트',
    desc: '신규 고객에게 맞춤형 온보딩 여정을 설계하고 단계별로 안내하는 에이전트.',
    problem: '고객마다 다른 니즈에 획일적 온보딩 → 30일 내 이탈률 40%.',
    solution: '고객 프로필 분석 → 맞춤 온보딩 플랜 생성 → 단계별 자동 안내 + 막힘 감지.',
    result: '30일 이탈률 40% → 18%, 첫 가치 도달 시간 14일 → 5일',
    tools: 'Intercom · Custom LLM Agent · Analytics'
  }
];

/* ═══ RENDER ═══ */
const listEl = document.getElementById('caseList');
const detailEl = document.getElementById('caseDetail');

function renderCases(filter) {
  if (!listEl) return;
  const filtered = filter === 'all' ? cases : cases.filter(c => c.tag === filter);
  listEl.innerHTML = filtered.map((c, i) => `
    <div class="case-row" data-id="${c.id}">
      <span class="c-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="c-title">${c.title}</span>
      <span class="c-tag">${c.tag}</span>
      <span class="c-arrow">→</span>
    </div>
  `).join('');

  listEl.querySelectorAll('.case-row').forEach(row => {
    row.addEventListener('click', () => openCase(+row.dataset.id));
  });
}

function openCase(id) {
  const c = cases.find(x => x.id === id);
  if (!c || !detailEl) return;
  detailEl.className = 'case-detail open';
  detailEl.innerHTML = `
    <button class="cd-close" onclick="closeCase()">✕</button>
    <span class="cd-badge">${c.tag}</span>
    <h3>${c.title}</h3>
    <p>${c.desc}</p>
    <h4>문제</h4><p>${c.problem}</p>
    <h4>해결</h4><p>${c.solution}</p>
    <h4>도구</h4><p>${c.tools}</p>
    <div class="result-box">📊 ${c.result}</div>
  `;
  detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeCase() {
  if (!detailEl) return;
  detailEl.className = 'case-detail';
  detailEl.innerHTML = '';
}

/* ═══ FILTERS ═══ */
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCases(btn.dataset.f);
    closeCase();
  });
});

/* ═══ INIT ═══ */
renderCases('all');
