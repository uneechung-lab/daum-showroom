const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const jobs = [
  {
    title: "금융 시스템 개발자",
    department: "금융사업부",
    job_type: "정규직/계약직/프리랜서",
    end_date: null,
    is_active: true,
    content: JSON.stringify({
      label: "Open Roles",
      meta: ["정규직/계약직/프리랜서", "여의도/서울대입구", "상시채용"],
      intro: "국내 주요 금융권의 차세대 시스템 및 비즈니스 플랫폼 개발을 담당하며, 기술적 성장을 이끌어갈 우수한 개발자를 모십니다.",
      tasks: [
        "금융 정보계/계정계 시스템 설계 및 개발",
        "웹 서비스/API 설계, 구현 및 통합 프로젝트 수행",
        "대용량 트랜잭션 처리 및 고성능 인프라 최적화"
      ],
      requirements: [
        "Java/Spring Boot 기반 웹 어플리케이션 개발 경력 3년 이상",
        "RDBMS(Oracle, MySQL 등) 설계 및 쿼리 최적화 역량",
        "Git 및 협업 도구를 활용한 공동 개발 경험"
      ],
      preferred: [
        "은행, 증권, 카드 등 금융권 대형 프로젝트 수행 유경험자",
        "클라우드(AWS, Azure) 환경 인프라 설계 및 배포 경험자",
        "MSA(Microservice Architecture) 구축 및 개발 경험자"
      ]
    })
  },
  {
    title: "AI / 데이터 사이언티스트",
    department: "AI 연구실",
    job_type: "정규직",
    end_date: null,
    is_active: true,
    content: JSON.stringify({
      label: "Open Roles",
      meta: ["정규직", "여의도", "상시채용"],
      intro: "자체 AI 모델 고도화 및 금융 도메인 맞춤형 LLM 솔루션을 연구 개발하고 비즈니스 임팩트를 만드실 연구원을 모집합니다.",
      tasks: [
        "대형 언어 모델(LLM) 파인튜닝 및 RAG 시스템 아키텍처 설계",
        "금융 특화 예측 모델 및 이상거래 탐지 알고리즘 연구",
        "연구 성과의 프로덕트 화를 위한 ML pipeline 구축"
      ],
      requirements: [
        "Python 기반 머신러닝/딥러닝 프레임워크(PyTorch 등) 실무 역량",
        "자연어 처리(NLP) 또는 데이터 분석 실무 경력 2년 이상",
        "논문을 구현하거나 상용 오픈소스 모델을 파인튜닝 해본 경험"
      ],
      preferred: [
        "컴퓨터공학, 통계학, 인공지능 등 관련 학과 석/박사 학위 소지자",
        "LangChain, LlamaIndex 등을 활용한 AI 에이전트 서비스 개발자",
        "MLOps 플랫폼(Kubeflow, MLflow) 관리 경험자"
      ]
    })
  },
  {
    title: "금융 솔루션 기술 컨설턴트",
    department: "솔루션사업부",
    job_type: "정규직",
    end_date: null,
    is_active: true,
    content: JSON.stringify({
      label: "Open Roles",
      meta: ["정규직", "여의도", "상시채용"],
      intro: "고객사의 비즈니스 요구사항을 이해하고, 자사 및 파트너사의 최적 금융 시스템 아키텍처를 진단 및 설계하는 컨설턴트를 모십니다.",
      tasks: [
        "고객사 IT 인프라 분석 및 도입 적합도 분석(GAP Analysis)",
        "제안서 작성, POC(Proof of Concept) 리딩 및 기술 데모 진행",
        "구축 프로젝트 초기 아키텍처 설계 및 기술 지원"
      ],
      requirements: [
        "금융 IT 부문 개발 또는 엔지니어링 경력 5년 이상",
        "고객 커뮤니케이션 능력 및 비즈니스 문서 작성 스킬 우수자",
        "엔터프라이즈 아키텍처 및 미들웨어에 대한 깊은 이해"
      ],
      preferred: [
        "IT 컨설팅 펌 또는 대형 SI 사 컨설턴트 유경험자",
        "클라우드 아키텍트 자격증 소지자 (AWS SAP, Azure Solutions Architect 등)",
        "영어 또는 외국어로 기술 프레젠테이션이 가능하신 분"
      ]
    })
  },
  {
    title: "프로젝트 매니지먼트",
    department: "PMO",
    job_type: "정규직",
    end_date: null,
    is_active: true,
    content: JSON.stringify({
      label: "Talent Pool",
      meta: ["정규직", "본사/여의도", "상시채용"],
      intro: "금융 IT 구축 프로젝트의 스케줄, 리스크, 그리고 최고의 딜리버리 퀄리티를 조율하는 프로젝트 관리자를 모십니다.",
      tasks: [
        "프로젝트 생애주기 관리 (일정 수립, 범위 관리, 진척률 관리)",
        "고객사 현업 및 다양한 이해관계자 조율과 리스크 사전 대응",
        "WBS 작성 및 정량화된 지표를 통한 현황 보고서 작성"
      ],
      requirements: [
        "금융 IT 프로젝트 수행/관리 경력 5년 이상",
        "논리적인 설득 및 뛰어난 갈등 관리 역량 보유자",
        "MS Project, Jira, Confluence 등 협업 관리 도구 숙련자"
      ],
      preferred: [
        "PMP(Project Management Professional) 자격증 소지자",
        "애자일 방법론(Scrum, Kanban) 실제 리딩 경험자",
        "대형 금융 통합 차세대 시스템 구축 PMO 참여 경험자"
      ]
    })
  },
  {
    title: "품질 관리 (QA)",
    department: "QA팀",
    job_type: "정규직/계약직/프리랜서",
    end_date: null,
    is_active: true,
    content: JSON.stringify({
      label: "Talent Pool",
      meta: ["정규직/계약직/프리랜서", "여의도", "상시채용"],
      intro: "작은 결함도 용납하지 않는 꼼꼼함으로 자사 금융 시스템의 완성도와 안정성을 확보할 QA 엔지니어를 모십니다.",
      tasks: [
        "테스트 시나리오, 테스트 케이스 설계 및 상세 평가 수행",
        "기능/비기능 테스트 진행 및 버그 리포팅 관리",
        "자동화 테스트 스크립트 작성 및 배포 파이프라인 검증 연계"
      ],
      requirements: [
        "SW 테스트/QA 실무 경력 2년 이상",
        "웹/앱 환경 및 백엔드 API 테스트 기법에 대한 이해",
        "이슈 트래킹 시스템(Jira 등)에 대한 정형화된 사용 능력"
      ],
      preferred: [
        "ISTQB, CSTS 등 QA 관련 자격증 소지자",
        "Selenium, Appium, Playwright 등 테스트 자동화 프레임워크 유경험자",
        "성능 부하 테스트(JMeter, nGrinder 등) 설계 및 테스트 경험자"
      ]
    })
  },
  {
    title: "UI / UX / CX",
    department: "디자인실",
    job_type: "정규직/계약직/프리랜서",
    end_date: null,
    is_active: true,
    content: JSON.stringify({
      label: "Talent Pool",
      meta: ["정규직/계약직/프리랜서", "여의도", "상시채용"],
      intro: "사용자의 복잡한 여정을 극도로 명확하고 아름다운 금융 인터페이스로 완성시킬 UI/UX 디자이너를 모십니다.",
      tasks: [
        "금융 솔루션 및 플랫폼 인터페이스(UI) 설계 및 시각화",
        "사용자 관점 리서치(CX) 기반 UX 가이드라인 정의 및 프로토타입 작성",
        "디자인 시스템(Design System) 구축 및 개발팀 협업 가이드 제공"
      ],
      requirements: [
        "UI/UX 디자이너 실무 경력 3년 이상 (포트폴리오 제출 필수)",
        "Figma, Adobe XD 등 주요 디자인 도구 숙련도 최상",
        "플랫폼 디자인 가이드라인(Android, iOS, Web)에 대한 높은 이해도"
      ],
      preferred: [
        "금융, 핀테크 서비스 디자인 출시 경험자",
        "인터랙션 디자인, 모션 그래픽 툴 활용 능력 우수자",
        "HTML/CSS 및 JS에 대한 기본적인 이해와 마크업 소통 능력이 뛰어나신 분"
      ]
    })
  }
];

async function run() {
  console.log("Starting migration of careers to job_postings table...");
  
  for (const job of jobs) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/job_postings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(job)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Failed to insert "${job.title}":`, errorText);
      } else {
        const inserted = await response.json();
        console.log(`✅ Successfully inserted "${job.title}" with ID ${inserted[0].id}`);
      }
    } catch (err) {
      console.error(`❌ Network error inserting "${job.title}":`, err.message);
    }
  }
  console.log("Migration finished.");
}

run();
