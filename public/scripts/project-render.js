/**
 * Dynamic Project Rendering System
 * Integrates Supabase with Project Showcase UI
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Configuration & State
    const itemsPerPage = 15;
    let currentPage = 1;
    let allProjects = [];
    let filteredProjects = [];
    let currentCategory = 'all';

    const gridContainer = document.getElementById('project-grid');
    const carouselTrack = document.getElementById('carousel-track');
    const carouselNav = document.getElementById('carousel-nav');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadMoreText = document.getElementById('load-more-text');
    const tabNameDisplay = document.getElementById('archive-tab-name');

    // Category Metadata Mapping
    const categoryMap = {
        'pension': { label: '퇴직연금', color: 'blue', icon: 'wallet' },
        'investment': { label: '집합투자증권', color: 'orange', icon: 'trending-up' },
        'mutual': { label: '공제업무시스템', color: 'green', icon: 'shield-check' },
        'consulting': { label: '컨설팅', color: 'purple', icon: 'clipboard-list' },
        'etc': { label: '유지보수 및 기타', color: 'gray', icon: 'settings' }
    };

    // 2. Fetch Data from Supabase
    async function fetchProjects() {
        try {
            const { data, error } = await supabaseClient
                .from('projects')
                .select('*')
                .order('start_date', { ascending: false });

            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Error fetching projects:', err);
            return [];
        }
    }

    // Helper: Dynamic Date & Status formatter based on current time
    function getProjectStatusAndDate(p) {
        const now = new Date();
        const currentYM = now.getFullYear() + '.' + String(now.getMonth() + 1).padStart(2, '0');
        
        let isOngoing = true;
        let displayEndDate = '진행 중';
        
        if (p.end_date && p.end_date !== '현재' && p.end_date !== '진행 중' && p.end_date !== '진행중') {
            if (currentYM > p.end_date) {
                isOngoing = false;
                displayEndDate = p.end_date;
            }
        }
        
        let dateDisplay = '';
        if (p.start_date && displayEndDate !== '진행 중') {
            dateDisplay = p.start_date === displayEndDate ? p.start_date : `${p.start_date} ~ ${displayEndDate}`;
        } else if (p.start_date) {
            dateDisplay = `${p.start_date} ~ 진행 중`;
        } else if (displayEndDate !== '진행 중') {
            dateDisplay = displayEndDate;
        } else {
            dateDisplay = '-';
        }
        
        return { isOngoing, dateDisplay };
    }

    // 3. Render Carousel (Highlights)
    function renderCarousel(projects) {
        const highlights = projects.filter(p => p.is_highlight);
        if (!carouselTrack || highlights.length === 0) return;

        carouselTrack.innerHTML = '';
        carouselNav.innerHTML = '';

        highlights.forEach((p, idx) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            
            // Format dates dynamically based on current date
            const { isOngoing, dateDisplay: dateStr } = getProjectStatusAndDate(p);
            
            slide.innerHTML = `
                <div class="project-card wide">
                    <div class="card-header">
                        <div class="company-logo">
                            ${p.logo_url ? `<img src="${p.logo_url}" alt="${p.client}">` : `<span class="logo-placeholder">${p.client}</span>`}
                        </div>
                    </div>
                    <div class="project-content">
                        <div class="content-top">
                            <div class="card-icon"><i data-lucide="${categoryMap[p.category]?.icon || 'layers'}"></i></div>
                            <div class="card-tags">
                                ${isOngoing ? '<span class="tag green">ONGOING</span>' : '<span class="tag">COMPLETED</span>'}
                                <span class="tag ${categoryMap[p.category]?.color || 'blue'}">${p.category}</span>
                            </div>
                        </div>
                        <div class="project-info">
                            <h3><span class="company-name">${p.client}</span> ${p.title}</h3>
                            <p style="color: #64748b; font-size: 1.1rem; max-width: 800px;">${p.description || ''}</p>
                        </div>
                        <div class="project-year">${dateStr}</div>
                    </div>
                </div>
            `;
            carouselTrack.appendChild(slide);

            // Add dot
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(idx));
            carouselNav.appendChild(dot);
        });

        // Initialize Carousel Logic
        initCarousel();
    }

    // 4. Render Grid Items
    function renderGrid(projects, page = 1, append = false) {
        if (!gridContainer) return;
        
        if (!append) gridContainer.innerHTML = '';
        
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = projects.slice(start, end);

        pageItems.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.category = p.category;
            
            // Apply dynamic status and date logic
            const { isOngoing, dateDisplay } = getProjectStatusAndDate(p);

            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icon"><i data-lucide="${categoryMap[p.category]?.icon || 'layers'}"></i></div>
                    <div class="card-tags">
                        ${isOngoing ? '<span class="tag green">ONGOING</span>' : '<span class="tag">COMPLETED</span>'}
                        <span class="tag ${categoryMap[p.category]?.color || 'blue'}">${p.category}</span>
                    </div>
                </div>
                <div class="project-info">
                    <h3><span class="company-name">${p.client}</span> ${p.title}</h3>
                </div>
                <div class="project-year">${dateDisplay}</div>
            `;
            gridContainer.appendChild(card);
        });

        // Update Load More Button visibility
        const shownCount = append ? gridContainer.querySelectorAll('.project-card').length : pageItems.length;
        const total = projects.length;
        const remaining = total - shownCount;

        if (remaining > 0) {
            loadMoreBtn.style.display = 'inline-flex';
            const nextBatch = Math.min(itemsPerPage, remaining);
            loadMoreText.textContent = `${nextBatch}건 더 보기 (${shownCount}/${total})`;
        } else {
            loadMoreBtn.style.display = 'none';
        }

        // Re-initialize icons
        if (window.lucide) lucide.createIcons();
    }

    // 5. Update Tab Counts UI
    function updateTabCounts(projects) {
        const counts = {
            all: projects.length,
            pension: projects.filter(p => p.category === 'pension').length,
            investment: projects.filter(p => p.category === 'investment').length,
            mutual: projects.filter(p => p.category === 'mutual').length,
            consulting: projects.filter(p => p.category === 'consulting').length,
            etc: projects.filter(p => p.category === 'etc').length
        };

        document.querySelectorAll('.tab-btn').forEach(btn => {
            const tab = btn.dataset.tab;
            const count = counts[tab] || 0;
            
            // Get icon name from categoryMap or use default
            const iconName = tab === 'all' ? 'layers' : (categoryMap[tab]?.icon || 'circle');
            const label = tab === 'all' ? '전체' : (categoryMap[tab]?.label || tab);
            
            // Explicitly set HTML with icon and count
            btn.innerHTML = `<i data-lucide="${iconName}"></i>${label} (${count})`;
        });

        // Re-initialize icons for the tabs
        if (window.lucide) lucide.createIcons();
    }

    // 6. Filtering Logic
    function applyFilter(category) {
        currentCategory = category;
        currentPage = 1;
        
        // Update Active Tab UI
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === category);
        });

        // Show/Hide Ongoing Carousel (only on 'all' tab)
        const ongoingSection = document.getElementById('ongoing-section');
        if (ongoingSection) {
            ongoingSection.style.display = category === 'all' ? 'block' : 'none';
        }

        // Update Title logic
        const titleMap = {
            all: { line1: '신뢰로 쌓아온', tabName: '성공 기록,' },
            pension: { line1: '내일을 설계하는', tabName: '퇴직연금' },
            investment: { line1: '가치를 증명하는', tabName: '집합투자증권' },
            mutual: { line1: '함께 성장하는', tabName: '공제업무시스템' },
            consulting: { line1: '미래를 진단하는', tabName: '컨설팅' },
            etc: { line1: '빈틈없이 관리하는', tabName: '유지보수 및 기타' }
        };

        const config = titleMap[category] || titleMap.all;
        const line1El = document.getElementById('archive-title-line1');
        if (line1El) line1El.textContent = config.line1;
        if (tabNameDisplay) tabNameDisplay.textContent = config.tabName + ' ';

        // Filter projects
        filteredProjects = category === 'all' 
            ? allProjects 
            : allProjects.filter(p => p.category === category);

        renderGrid(filteredProjects, 1, false);
    }

    // 6. Carousel Core Logic
    let currentSlide = 0;
    function initCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        if (slides.length <= 1) return;

        function goToSlide(idx) {
            currentSlide = idx;
            carouselTrack.style.transform = `translateX(-${idx * 100}%)`;
            document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === idx);
            });
        }

        window.goToSlide = goToSlide; // Make global for dots

        // Auto play
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }, 5000);
    }

    // 7. Event Listeners
    loadMoreBtn?.addEventListener('click', () => {
        currentPage++;
        renderGrid(filteredProjects, currentPage, true);
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.tab));
    });

    // 8. Bootstrap
    allProjects = await fetchProjects();
    filteredProjects = allProjects;
    
    updateTabCounts(allProjects);
    renderCarousel(allProjects);
    applyFilter('all'); // Initial render
});
