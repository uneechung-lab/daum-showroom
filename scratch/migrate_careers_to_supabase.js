const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

const hardcodedCareers = [
    {
        title: "금융 시스템 개발자",
        department: "개발본부",
        job_type: "정규직/계약직/프리랜서",
        is_active: true,
        content: {
            label: "Open Roles",
            intro: "국내 주요 금융권의 차세대 시스템 및 핵심 금융 솔루션을 개발하고 고도화하는 역할을 수행합니다.",
            tasks: [
                "은행, 증권, 보험 등 핵심 기간계 금융 시스템 설계 및 개발",
                "Java/Spring 기반 고가용성 대규모 트랜잭션 엔진 구축",
                "대용량 금융 데이터베이스 설계 및 쿼리 최적화",
                "클라우드(AWS/Azure) 환경의 마이크로서비스 아키텍처 구현"
            ],
            requirements: [
                "Java/Spring 기반 백엔드 개발 경력 3년 이상",
                "RDBMS(Oracle, MySQL, PostgreSQL 등) 및 SQL 활용 능력",
                "금융 도메인(퇴직연금, 자산관리 등) 프로젝트 수행 경험",
                "클린 코드 작성 및 코드 리뷰를 통한 협업 능력"
            ],
            preferred: [
                "대용량 트랜잭션 처리 및 분산 시스템 아키텍처 경험자",
                "금융권 차세대 프로젝트 PL/PM 경험자",
                "DevOps 및 CI/CD 파이프라인 구축 유경험자"
            ]
        }
    },
    {
        title: "AI / 데이터 사이언티스트",
        department: "개발본부",
        job_type: "정규직",
        is_active: true,
        content: {
            label: "Open Roles",
            intro: "금융 빅데이터와 최신 생성형 AI 기술을 결합하여 지능형 금융 솔루션을 리드합니다.",
            tasks: [
                "금융 특화 LLM(Large Language Model) 도입 및 튜닝",
                "이상거래탐지(FDS) 및 자산관리 알고리즘 고도화",
                "데이터 거버넌스 기반의 AI 서비스 파이프라인 구축",
                "생성형 AI를 활용한 비즈니스 프로세스 자동화 솔루션 개발"
            ],
            requirements: [
                "AI/머신러닝 관련 실무 경력 3년 이상",
                "Python, PyTorch, TensorFlow 등 딥러닝 프레임워크 숙련",
                "NLP, LLM, RAG 등 최신 AI 기술에 대한 깊은 이해",
                "관련 분야(컴퓨터공학, 통계학 등) 석사 이상 학위 보유자"
            ],
            preferred: [
                "금융 서비스에 AI 기술을 성공적으로 상용화한 경험",
                "대규모 데이터 엔지니어링 및 MLOps 환경 구축 경험",
                "글로벌 AI 컨퍼런스 논문 게재 및 경진대회 입상자"
            ]
        }
    },
    {
        title: "금융 솔루션 기술 컨설턴트",
        department: "개발본부",
        job_type: "정규직",
        is_active: true,
        content: {
            label: "Open Roles",
            intro: "기술적 전문성을 바탕으로 고객사의 비즈니스 혁신을 위한 디지털 전환 전략을 제안합니다.",
            tasks: [
                "고객사 비즈니스 요구사항 분석 및 정보화 전략 수립(ISP/ISP)",
                "차세대 금융 시스템 아키텍처 설계 및 기술 가이드 제시",
                "솔루션 도입 제안서 작성 및 기술 PT 수행",
                "프로젝트 수행 단계별 기술 리스크 관리 및 고도화 전략 제안"
            ],
            requirements: [
                "금융 IT 분야 개발 또는 컨설팅 경력 5년 이상",
                "금융 비즈니스 로직에 대한 깊은 이해와 시스템화 능력",
                "뛰어난 문서 작성 능력 및 기술적 커뮤니케이션 스킬",
                "최신 IT 트렌드(Cloud, MSA, AI)에 대한 통찰력"
            ],
            preferred: [
                "대형 금융사 차세대 시스템 전략 컨설팅 유경험자",
                "솔루션 아키텍트(SA) 또는 기술 영업 경 경력자",
                "비즈니스 영어 회화 및 문서 작성 가능자"
            ]
        }
    },
    {
        title: "프로젝트 매니지먼트",
        department: "개발본부",
        job_type: "정규직",
        is_active: true,
        content: {
            label: "Talent Pool",
            intro: "복잡한 금융 IT 프로젝트의 성공적인 완수를 위해 전체 라이프사이클을 리드하고 관리합니다.",
            tasks: [
                "금융 프로젝트 범위, 일정, 자원 및 리스크 통합 관리",
                "고객사 및 내/외부 이해관계자 간의 커뮤니케이션 리딩",
                "프로젝트 품질 확보를 위한 산출물 관리 및 프로세스 준수",
                "수행 팀원 매니지먼트 및 업무 효율화 방안 수립"
            ],
            requirements: [
                "IT 프로젝트 매니지먼트(PM/PL) 경력 7년 이상",
                "대규모 금융 시스템 구축 프로젝트 수행 경험 필수",
                "Agile 및 Waterfall 방법론에 대한 전문 지식",
                "강한 책임감과 유연한 문제 해결 능력"
            ],
            preferred: [
                "PMP 등 프로젝트 관리 전문 자격증 보유자",
                "금융권 기간계 시스템 개발자 출신 PM",
                "다수의 프로젝트 동시 관리 및 협력사 관리 경험자"
            ]
        }
    },
    {
        title: "품질 관리 (QA)",
        department: "개발본부",
        job_type: "정규직/계약직/프리랜서",
        is_active: true,
        content: {
            label: "Talent Pool",
            intro: "금융 서비스의 무결성과 신뢰성을 확보하기 위해 전문적인 품질 검증 프로세스를 운영합니다.",
            tasks: [
                "금융 도메인 특화 테스트 시나리오 설계 및 테스트 케이스 작성",
                "단위, 통합, 시스템, 성능 테스트 수행 및 결함 관리",
                "테스트 자동화 도구 도입 및 자동화 환경 구축/운영",
                "릴리즈 전 품질 리스크 분석 및 배포 가부 의사결정 지원"
            ],
            requirements: [
                "소프트웨어 QA 또는 테스트 엔지니어 경력 3년 이상",
                "금융 비즈니스 프로세스에 대한 기본적인 이해",
                "결함 추적 도구(Jira 등) 활용 및 리포팅 능력",
                "논리적 사고 기반의 꼼꼼한 테스트 수행 능력"
            ],
            preferred: [
                "ISTQB 등 QA 관련 국제 자격증 보유자",
                "금융권 대규모 시스템 테스트 리딩 경험자",
                "API 및 UI 자동화 테스트 도구 활용 가능자"
            ]
        }
    },
    {
        title: "UI / UX / CX",
        department: "개발본부",
        job_type: "정규직/계약직/프리랜서",
        is_active: true,
        content: {
            label: "Talent Pool",
            intro: "사용자 중심의 사고를 바탕으로 직관적이고 완성도 높은 금융 인터페이스를 설계합니다.",
            tasks: [
                "금융 서비스 UI/UX 기획 및 시각화 디자인",
                "사용자 데이터 및 여정 분석을 통한 통합 고객 경험(CX) 설계",
                "일관성 있는 경험을 위한 디자인 시스템 구축 및 가이드 수립",
                "프로토타이핑을 통한 아이디어 구체화 및 사용성 검증"
            ],
            requirements: [
                "UI/UX 디자인 또는 서비스 기획 경력 3년 이상",
                "Figma, Adobe XD, Protopie 등 디자인 툴 숙련",
                "복잡한 금융 정보를 정제하여 사용자에게 전달하는 정보 설계 능력",
                "비즈니스 목표와 사용자 니즈의 균형을 맞추는 통찰력"
            ],
            preferred: [
                "금융/핀테크 서비스 디자인 시스템 구축 경험자",
                "사용자 리서치 및 UT 기반의 개선 프로젝트 수행 경험",
                "HTML/CSS 등 퍼블리싱에 대한 기본적인 이해도 보유자"
            ]
        }
    }
];

async function migrate() {
    console.log("Checking existing job postings in Supabase...");
    try {
        const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/job_postings?select=title`, { headers });
        const existing = await checkRes.json();
        const existingTitles = new Set(existing.map(x => x.title));
        
        const toInsert = [];
        for (const career of hardcodedCareers) {
            if (!existingTitles.has(career.title)) {
                // Construct meta array
                let metaText = "인재풀";
                if (career.content.label === 'Open Roles') metaText = "상시채용";
                
                toInsert.push({
                    title: career.title,
                    department: career.department,
                    job_type: career.job_type,
                    end_date: null,
                    is_active: true,
                    content: JSON.stringify({
                        label: career.content.label,
                        meta: [career.job_type, metaText],
                        intro: career.content.intro,
                        contractPeriod: "",
                        contractStart: "",
                        contractEnd: "",
                        startDate: null,
                        tasks: career.content.tasks,
                        requirements: career.content.requirements,
                        preferred: career.content.preferred
                    })
                });
            } else {
                console.log(`Job posting '${career.title}' already exists. Skipping.`);
            }
        }
        
        if (toInsert.length > 0) {
            console.log(`Inserting ${toInsert.length} job postings...`);
            const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/job_postings`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(toInsert)
            });
            console.log("Insert Status:", insertRes.status);
            const resData = await insertRes.json();
            if (insertRes.status === 201 || insertRes.status === 200) {
                console.log("Migration completed successfully!", resData.length, "rows inserted.");
            } else {
                console.error("Migration failed:", resData);
            }
        } else {
            console.log("All postings already exist in database. No inserts needed.");
        }
    } catch (e) {
        console.error("Migration error:", e);
    }
}

migrate();
