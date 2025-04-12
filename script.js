// 네비게이션 메뉴 토글 기능
const navLinks = document.getElementById('navLinks');
const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');

openMenu.addEventListener('click', () => {
    navLinks.style.right = "0";
});

closeMenu.addEventListener('click', () => {
    navLinks.style.right = "-200px";
});

// 스크롤 시 네비게이션 바 스타일 변경
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = "#111";
        nav.style.padding = "1% 6%";
        nav.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
        nav.style.transition = "all 0.3s ease";
    } else {
        nav.style.backgroundColor = "transparent";
        nav.style.padding = "2% 6%";
        nav.style.boxShadow = "none";
    }
});

// 섹션 애니메이션 - 스크롤 시 요소 fade-in
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    // 애니메이션을 적용할 요소들
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Contact form handling has been removed as requested

// 동적 카운터 애니메이션 (연구 분야 섹션에 추가 가능)
function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounter, 10);
        } else {
            counter.innerText = target;
        }
    });
}

// 버튼과 링크의 스무스 스크롤 기능
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});