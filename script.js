// ===========================
// APK DOWNLOAD LINK
// ===========================
const APK_DOWNLOAD_URL = 'https://drive.google.com/file/d/1Q6CiI-TLb4Y4Zz44Yi85ZeVf6Oz23mm_/view?usp=drivesdk';
const APK_DIRECT_DOWNLOAD = 'https://drive.google.com/uc?export=download&id=1Q6CiI-TLb4Y4Zz44Yi85ZeVf6Oz23mm_';

// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// NAVBAR ANIMATION
// ===========================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    
    if (current > 100) {
        navbar.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = current;
});

// ===========================
// APK DOWNLOAD FUNCTION
// ===========================
function downloadAPK() {
    showNotification('⬇️ Starting APK download...');
    
    // Create a hidden link and trigger download
    const link = document.createElement('a');
    link.href = APK_DIRECT_DOWNLOAD;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message after a short delay
    setTimeout(() => {
        showNotification('✅ APK download started! Check your downloads folder.');
    }, 500);
}

// ===========================
// BUTTON INTERACTIONS
// ===========================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    // Download APK buttons
    if (button.textContent.includes('Download') && button.textContent.includes('APK')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            downloadAPK();
        });
    }
    
    // Other button interactions
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.feature-card, .game-card, .tournament-card, .leaderboard-row').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ===========================
// TOURNAMENT JOIN BUTTON
// ===========================
document.querySelectorAll('.btn-join').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const tournamentCard = this.closest('.tournament-card');
        const tournamentName = tournamentCard.querySelector('h3').textContent;
        const entryFee = tournamentCard.querySelector('.value').textContent;
        showNotification(`🎮 Successfully joined ${tournamentName}! Entry fee: ${entryFee}`);
    });
});

// ===========================
// GAME PLAY BUTTON
// ===========================
document.querySelectorAll('.game-card .btn-small').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const gameName = this.closest('.game-card').querySelector('h3').textContent;
        showNotification(`🚀 Launching ${gameName}... Open the app to start playing!`);
    });
});

// ===========================
// WEB LOGIN BUTTON
// ===========================
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('🔐 Redirecting to login portal...');
    });
});

// ===========================
// CTA DOWNLOAD BUTTON
// ===========================
document.querySelector('.cta .btn-primary')?.addEventListener('click', function(e) {
    e.preventDefault();
    downloadAPK();
});

// ===========================
// NOTIFICATION SYSTEM
// ===========================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 1rem;
        background: linear-gradient(135deg, #a855f7, #0ea5e9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===========================
// ANIMATIONS KEYFRAMES
// ===========================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// LEADERBOARD SCROLL EFFECT
// ===========================
const leaderboardBody = document.querySelector('.leaderboard-body');
if (leaderboardBody) {
    let isScrolling = false;
    
    leaderboardBody.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            
            document.querySelectorAll('.leaderboard-row').forEach(row => {
                const rect = row.getBoundingClientRect();
                const relativeY = rect.top - leaderboardBody.getBoundingClientRect().top;
                
                if (relativeY > 0 && relativeY < leaderboardBody.clientHeight) {
                    row.style.opacity = '1';
                } else {
                    row.style.opacity = '0.5';
                }
            });
            
            setTimeout(() => isScrolling = false, 100);
        }
    });
}

// ===========================
// MOUSE FOLLOW EFFECT
// ===========================
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        heroContent.style.transform = `perspective(1000px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
    });
    
    document.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// ===========================
// PAGE LOAD ANIMATION
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    const heroBadge = document.querySelector('.live-badge');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroBadge) {
        heroBadge.style.animation = 'slideDown 0.6s ease 0.2s forwards';
        heroBadge.style.opacity = '0';
    }
    if (heroTitle) {
        heroTitle.style.animation = 'slideDown 0.6s ease 0.4s forwards';
        heroTitle.style.opacity = '0';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'slideDown 0.6s ease 0.6s forwards';
        heroSubtitle.style.opacity = '0';
    }
    if (heroButtons) {
        heroButtons.style.animation = 'slideDown 0.6s ease 0.8s forwards';
        heroButtons.style.opacity = '0';
    }
});

// Add slideDown animation
const slideDownStyle = document.createElement('style');
slideDownStyle.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(slideDownStyle);

// ===========================
// PARALLAX EFFECT
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===========================
// CONSOLE WELCOME MESSAGE
// ===========================
console.log('%cWelcome to Warr Battle! 🎮', 'font-size: 20px; font-weight: bold; color: #a855f7;');
console.log('%cThe premier mobile eSports platform for competitive gamers', 'font-size: 14px; color: #0ea5e9;');
console.log('%cAPK Download: Ready to distribute', 'font-size: 12px; color: #ef4444;');
console.log('%cAPK Download URL: https://drive.google.com/file/d/1Q6CiI-TLb4Y4Zz44Yi85ZeVf6Oz23mm_/view', 'font-size: 11px; color: #ffffff;');
console.log('✅ Warr Battle website initialized successfully!');