// ==================== BREVITY PAGE FUNCTIONS ====================
// 기존 script.js 파일의 맨 아래에 추가할 코드

// Mobile menu toggle function for Brevity page
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const body = document.body;
    
    if (navMenu && mobileToggle) {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');

        // Brevity 페이지에서는 추가 클래스로 컨텐츠 고정
        if (isBrevityPage()) {
            if (navMenu.classList.contains('active')) {
                body.classList.add('menu-open');
                body.style.overflow = 'hidden';
            } else {
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        } else {
            // 기존 메인 페이지 로직
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        }
    }
}

// Brevity 페이지인지 확인하는 함수
function isBrevityPage() {
    return document.body.classList.contains('brevity-page');
}

// Brevity Matrix-like background effect
function createBrevityMatrixBackground() {
    if (!isBrevityPage()) return;
    
    const canvas = document.querySelector('.matrix-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#8cbec3';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 100);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Brevity email validation function
function isValidBrevityEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Brevity show custom alert
function showBrevityAlert(type, title, message) {
    if (!isBrevityPage()) return;
    
    const overlay = document.getElementById('alertOverlay');
    const icon = document.getElementById('alertIcon');
    const iconSymbol = document.getElementById('alertIconSymbol');
    const alertTitle = document.getElementById('alertTitle');
    const alertMessage = document.getElementById('alertMessage');

    if (!overlay || !icon || !iconSymbol || !alertTitle || !alertMessage) return;

    alertTitle.textContent = title;
    alertMessage.textContent = message;

    if (type === 'success') {
        icon.className = 'alert-icon success';
        iconSymbol.textContent = '✓';
    } else {
        icon.className = 'alert-icon error';
        iconSymbol.textContent = '✕';
    }

    overlay.classList.add('show');
}

// Brevity close alert
function closeBrevityAlert() {
    if (!isBrevityPage()) return;
    
    const overlay = document.getElementById('alertOverlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

// Global function for onclick (HTML에서 호출하기 위해 전역으로 선언)
function closeAlert() {
    closeBrevityAlert();
}

// Brevity 페이지 초기화 함수
function initBrevityPage() {
    if (!isBrevityPage()) return;

    console.log('Brevity page detected, initializing...');

    // Matrix 배경 초기화
    createBrevityMatrixBackground();

    // 모바일 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navContainer = document.querySelector('.nav-container');
        const body = document.body;
        
        if (navContainer && !navContainer.contains(e.target) && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
            
            // Brevity 페이지에서 클래스 제거
            if (isBrevityPage()) {
                body.classList.remove('menu-open');
            }
            body.style.overflow = ''; // 스크롤 복원
        }
    });

    // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.getElementById('navMenu');
            const mobileToggle = document.querySelector('.mobile-toggle');
            const body = document.body;
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                }
                
                // Brevity 페이지에서 클래스 제거
                if (isBrevityPage()) {
                    body.classList.remove('menu-open');
                }
                body.style.overflow = ''; // 스크롤 복원
            }
        });
    });

    // 버튼 활성화 상태 체크 함수
    function checkFormValidity() {
        const emailInput = document.getElementById('emailInput');
        const tosCheckbox = document.getElementById('tosCheckbox');
        const ppCheckbox = document.getElementById('ppCheckbox');
        const subscribeBtn = document.getElementById('subscribeBtn');
        
        if (!emailInput || !tosCheckbox || !ppCheckbox || !subscribeBtn) return;
        
        const email = emailInput.value.trim();
        const isEmailValid = email && isValidBrevityEmail(email);
        const isTosChecked = tosCheckbox.checked;
        const isPpChecked = ppCheckbox.checked;
        
        // 모든 조건이 만족되면 버튼 활성화
        const isFormValid = isEmailValid && isTosChecked && isPpChecked;
        
        subscribeBtn.disabled = !isFormValid;
    }

    // 알림 외부 클릭 시 닫기
    const alertOverlay = document.getElementById('alertOverlay');
    if (alertOverlay) {
        alertOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeBrevityAlert();
            }
        });
    }

    // ESC 키로 알림 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isBrevityPage()) {
            closeBrevityAlert();
        }
    });

    // 구독 폼 제출 처리
    const subscriptionForm = document.getElementById('subscriptionForm');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('emailInput');
            const tosCheckbox = document.getElementById('tosCheckbox');
            const ppCheckbox = document.getElementById('ppCheckbox');
            const subscribeBtn = document.getElementById('subscribeBtn');
            
            if (!emailInput || !tosCheckbox || !ppCheckbox || !subscribeBtn) return;
            
            const email = emailInput.value.trim();

            // 이메일이 비어있는 경우
            if (!email) {
                showBrevityAlert('error', 'Input Required', 'Email address required for system authentication.');
                emailInput.focus();
                return;
            }

            // 이메일 형식이 잘못된 경우
            if (!isValidBrevityEmail(email)) {
                showBrevityAlert('error', 'Format Error', 'Invalid email format detected. Please verify input syntax and try again.');
                emailInput.focus();
                return;
            }

            // 체크박스 확인
            if (!tosCheckbox.checked) {
                showBrevityAlert('error', 'Terms Required', 'Please accept the Terms of Service to continue.');
                return;
            }

            if (!ppCheckbox.checked) {
                showBrevityAlert('error', 'Privacy Policy Required', 'Please accept the Privacy Policy to continue.');
                return;
            }

            // 버튼 비활성화 및 로딩 상태
            subscribeBtn.disabled = true;
            const originalText = subscribeBtn.textContent;
            subscribeBtn.textContent = 'Processing...';

            // API 요청
            const apiUrl = 'https://api.thecapelabs.com/brevity/v1.0/0c492e35-d082-41ef-9bf7-ae20f9b61151';
            
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                })
            })
            .then(response => {
                if (response.status === 200) {
                    // 성공적인 구독
                    showBrevityAlert('success', 'Subscription Confirmed', 'Welcome to Brevity intelligence network. Daily briefings will commence within 24 hours.');
                    
                    // 폼 초기화
                    emailInput.value = '';
                    tosCheckbox.checked = false;
                    ppCheckbox.checked = false;
                    checkFormValidity();
                } else {
                    // HTTP 상태 코드가 200이 아닌 경우
                    throw new Error(`Server responded with status ${response.status}`);
                }
            })
            .catch(error => {
                console.error('Subscription error:', error);
                
                // 네트워크 오류 또는 기타 오류 처리
                if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    // 네트워크 연결 오류
                    showBrevityAlert('error', 'Network Error', 'Unable to connect to the server. Please check your internet connection and try again.');
                } else if (error.message.includes('status 4')) {
                    // 4xx 클라이언트 오류
                    showBrevityAlert('error', 'Request Error', 'Invalid request. Please verify your email address and try again.');
                } else if (error.message.includes('status 5')) {
                    // 5xx 서버 오류
                    showBrevityAlert('error', 'Server Error', 'Server is temporarily unavailable. Please try again in a few minutes.');
                } else {
                    // 기타 오류
                    showBrevityAlert('error', 'Subscription Error', 'An unexpected error occurred. Please try again later.');
                }
            })
            .finally(() => {
                // 버튼 상태 복원
                subscribeBtn.disabled = false;
                subscribeBtn.textContent = originalText;
                checkFormValidity(); // 폼 상태에 따라 버튼 활성화 여부 재확인
            });
        });
    }

    // Enter 키로 구독 버튼 동작 (단, 버튼이 활성화된 경우에만)
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const subscribeBtn = document.getElementById('subscribeBtn');
                if (subscribeBtn && !subscribeBtn.disabled) {
                    const form = document.getElementById('subscriptionForm');
                    if (form) {
                        form.dispatchEvent(new Event('submit'));
                    }
                }
            }
        });

        // 이메일 입력 시 실시간 검증 및 버튼 상태 업데이트
        emailInput.addEventListener('input', function(e) {
            const email = e.target.value.trim();
            const input = e.target;
            
            if (email.length > 0) {
                if (isValidBrevityEmail(email)) {
                    input.style.borderColor = 'var(--primary-blue)';
                    input.style.boxShadow = '0 0 0 2px var(--focus-glow)';
                } else {
                    input.style.borderColor = 'var(--accent-red)';
                    input.style.boxShadow = '0 0 0 2px rgba(255, 107, 107, 0.3)';
                }
            } else {
                input.style.borderColor = 'var(--border-primary)';
                input.style.boxShadow = 'none';
            }
            
            // 버튼 상태 업데이트
            checkFormValidity();
        });

        // 입력 필드 포커스 아웃 시 기본 스타일로 복원
        emailInput.addEventListener('blur', function(e) {
            const email = e.target.value.trim();
            const input = e.target;
            
            if (email.length === 0) {
                input.style.borderColor = 'var(--border-primary)';
                input.style.boxShadow = 'none';
            }
        });
    }

    // 체크박스 상태 변경 시 버튼 상태 업데이트
    const tosCheckbox = document.getElementById('tosCheckbox');
    const ppCheckbox = document.getElementById('ppCheckbox');
    
    if (tosCheckbox) {
        tosCheckbox.addEventListener('change', checkFormValidity);
    }
    
    if (ppCheckbox) {
        ppCheckbox.addEventListener('change', checkFormValidity);
    }

    // 체크박스 라벨 클릭 지원
    const checkboxLabels = document.querySelectorAll('.checkbox-label');
    checkboxLabels.forEach(label => {
        label.addEventListener('click', function(e) {
            // 링크 클릭이 아닌 경우에만 체크박스 토글
            if (!e.target.classList.contains('terms-link')) {
                const checkboxId = this.getAttribute('for');
                const checkbox = document.getElementById(checkboxId);
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkFormValidity();
                }
            }
        });
    });

    // 구독 버튼 호버 효과 (활성화된 경우에만)
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        subscribeBtn.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
            }
        });
    }

    // 초기 버튼 상태 설정
    checkFormValidity();

    // Console easter egg for Brevity
    console.log(`
╔══════════════════════════════════════════════╗
║                 BREVITY                      ║
║              CapeLabs Research               ║
║                                              ║
║    "Intelligence through Innovation"         ║
║                                              ║
║  System Status: OPERATIONAL                  ║
║  Security Level: MAXIMUM                     ║
║  Network: SECURE                             ║
╚══════════════════════════════════════════════╝
    `);
}

// 기존 DOMContentLoaded 이벤트 리스너에 추가하거나, 
// 기존 리스너가 없다면 이 코드를 추가
document.addEventListener('DOMContentLoaded', function() {
    // 기존 CapeLabs 메인 페이지 초기화 코드들...
    
    // Brevity 페이지 초기화 (Brevity 페이지일 때만 실행됨)
    initBrevityPage();
});