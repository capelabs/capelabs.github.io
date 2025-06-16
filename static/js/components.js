// ==================== COMPONENT LOADER ====================

// 현재 페이지의 기본 경로를 확인하는 함수
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/brevity/')) {
        return '../static/components/';
    }
    return 'static/components/';
}

// 컴포넌트를 로딩하는 함수
async function loadComponent(componentName, targetSelector) {
    try {
        const basePath = getBasePath();
        const response = await fetch(`${basePath}${componentName}.html`);
        
        if (!response.ok) {
            throw new Error(`Failed to load ${componentName}: ${response.status}`);
        }
        
        const html = await response.text();
        const targetElement = document.querySelector(targetSelector);
        
        if (targetElement) {
            targetElement.innerHTML = html;
            console.log(`✅ ${componentName} component loaded successfully`);
        } else {
            console.warn(`⚠️ Target element ${targetSelector} not found for ${componentName}`);
        }
    } catch (error) {
        console.error(`❌ Error loading ${componentName} component:`, error);
        
        // 폴백: 기본 콘텐츠 표시
        const targetElement = document.querySelector(targetSelector);
        if (targetElement && componentName === 'header') {
            targetElement.innerHTML = `
                <header class="header">
                    <nav class="nav-container">
                        <a href="/" class="logo">CapeLabs</a>
                    </nav>
                </header>
            `;
        } else if (targetElement && componentName === 'footer') {
            targetElement.innerHTML = `
                <footer class="footer">
                    <div class="container">
                        <p>&copy; 2025 CapeLabs Research Group. All rights reserved.</p>
                    </div>
                </footer>
            `;
        }
    }
}

// Header 로딩 함수
async function loadHeader() {
    await loadComponent('header', '#header-placeholder');
}

// Footer 로딩 함수
async function loadFooter() {
    await loadComponent('footer', '#footer-placeholder');
}

// 모든 컴포넌트 로딩
async function loadAllComponents() {
    console.log('🔄 Loading components...');
    
    // 병렬로 로딩 (성능 향상)
    await Promise.all([
        loadHeader(),
        loadFooter()
    ]);
    
    console.log('✅ All components loaded');
    
    // 컴포넌트 로딩 완료 후 이벤트 발생
    document.dispatchEvent(new Event('componentsLoaded'));
}

// DOM이 로드되면 컴포넌트 로딩 시작
document.addEventListener('DOMContentLoaded', function() {
    loadAllComponents();
});

// 컴포넌트 로딩 완료 후 추가 초기화가 필요한 경우
document.addEventListener('componentsLoaded', function() {
    // 여기서 추가 초기화 작업 수행
    console.log('🎉 Components loaded, initializing additional features...');
    
    // 예: 메뉴 이벤트 리스너 재등록 등
    initializeComponentEvents();
});

// 컴포넌트 로딩 후 이벤트 초기화
function initializeComponentEvents() {
    // 모바일 메뉴 이벤트 리스너가 이미 전역에 있으므로 
    // 추가 초기화가 필요한 경우에만 사용
    
    // 네비게이션 링크 스무스 스크롤 (필요한 경우)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 모바일 메뉴 닫기
                const navMenu = document.getElementById('navMenu');
                const mobileToggle = document.querySelector('.mobile-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// 컴포넌트 다시 로딩하는 함수 (필요한 경우)
function reloadComponents() {
    loadAllComponents();
}

// 전역에서 사용할 수 있도록 export
window.ComponentLoader = {
    loadHeader,
    loadFooter,
    loadAllComponents,
    reloadComponents
};