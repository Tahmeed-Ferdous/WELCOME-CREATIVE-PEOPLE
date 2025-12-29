// Retro Grid Canvas Background
const canvas = document.getElementById('retroGrid');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Grid properties
const gridSize = 50;
let offset = 0;
const colors = ['#00f0ff', '#ff00ff', '#ffff00', '#00ff88'];
let colorIndex = 0;

// Animated grid
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Perspective grid
    ctx.strokeStyle = colors[colorIndex];
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines with perspective
    for (let y = offset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    offset += 0.5;
    if (offset >= gridSize) {
        offset = 0;
        colorIndex = (colorIndex + 1) % colors.length;
    }
    
    requestAnimationFrame(drawGrid);
}

drawGrid();

// Scroll-based animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe section titles
document.querySelectorAll('.split-text').forEach(el => {
    observer.observe(el);
});

// Member cards staggered reveal
const memberCards = document.querySelectorAll('.member-card');
memberCards.forEach((card, index) => {
    setTimeout(() => {
        card.classList.add('member-reveal');
    }, index * 150);
});

// Director message cards
const messageCards = document.querySelectorAll('.message-card');
const messageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('left')) {
                entry.target.classList.add('slide-in-left');
            } else {
                entry.target.classList.add('slide-in-right');
            }
        }
    });
}, observerOptions);

messageCards.forEach(card => {
    messageObserver.observe(card);
});

// What awaits cards
const awaitCards = document.querySelectorAll('.await-card');
const awaitObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('scale-in');
            }, index * 100);
        }
    });
}, observerOptions);

awaitCards.forEach(card => {
    awaitObserver.observe(card);
});

// Mentor card reveal
const mentorCard = document.querySelector('.mentor-card');
const mentorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

if (mentorCard) {
    mentorObserver.observe(mentorCard);
}

// Inspiration cards
const inspirationCards = document.querySelectorAll('.inspiration-card');
const inspirationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 150);
        }
    });
}, observerOptions);

inspirationCards.forEach(card => {
    inspirationObserver.observe(card);
});

// Parallax effect on scroll
let scrollPosition = 0;

window.addEventListener('scroll', () => {
    scrollPosition = window.pageYOffset;
    
    // Parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
    
    // Update nav on scroll
    const nav = document.querySelector('.nav');
    if (scrollPosition > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
        nav.style.boxShadow = '0 5px 30px rgba(0, 240, 255, 0.3)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Magnetic effect for member cards
memberCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    });
});

// Glitch effect on hover for glitch text
const glitchElements = document.querySelectorAll('.glitch-inline');
glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        const originalText = element.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        let iteration = 0;
        
        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            iteration += 1/3;
            
            if (iteration >= originalText.length) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, 30);
    });
});

// CRT scan line effect
function createScanLines() {
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            transparent 50%,
            rgba(0, 240, 255, 0.03) 50%
        );
        background-size: 100% 4px;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(scanLine);
}

createScanLines();

// Typewriter effect enhancement
const typewriter = document.querySelector('.typewriter');
if (typewriter) {
    const text = typewriter.textContent;
    typewriter.textContent = '';
    typewriter.style.width = '0';
    
    setTimeout(() => {
        typewriter.style.width = '100%';
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                typewriter.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }, 1000);
}

// Neon pulse on hover for await cards
awaitCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const color = card.getAttribute('data-color');
        let colorValue;
        
        switch(color) {
            case 'cyan':
                colorValue = '#00f0ff';
                break;
            case 'magenta':
                colorValue = '#ff00ff';
                break;
            case 'yellow':
                colorValue = '#ffff00';
                break;
            case 'green':
                colorValue = '#00ff88';
                break;
        }
        
        card.style.boxShadow = `0 0 50px ${colorValue}, inset 0 0 20px ${colorValue}`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});

// Retro button click effect
const retroButton = document.querySelector('.retro-button');
if (retroButton) {
    retroButton.addEventListener('click', () => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: radial-gradient(circle, rgba(0, 240, 255, 0.8), transparent);
            border-radius: 50%;
            animation: ripple 0.6s ease-out;
        `;
        
        retroButton.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Show alert
        alert('🚀 Let\'s create some amazing stuff together! Your journey begins now!');
    });
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation
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

// Random glitch effect every few seconds
setInterval(() => {
    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle && Math.random() > 0.7) {
        glitchTitle.style.animation = 'none';
        setTimeout(() => {
            glitchTitle.style.animation = 'glitch 2s infinite';
        }, 10);
    }
}, 5000);

// Particle system for background
class Particle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

const particles = [];
for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        alert('🎉 Easter egg unlocked! You found the secret! Keep being awesome!');
        konamiCode = [];
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Cursor trail effect
const cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
    
    cursorTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            top: ${point.y}px;
            left: ${point.x}px;
            width: ${10 - (index / maxTrailLength) * 10}px;
            height: ${10 - (index / maxTrailLength) * 10}px;
            background: ${colors[index % colors.length]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: ${1 - (index / maxTrailLength)};
        `;
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 100);
    });
});

// Log welcome message in console
console.log('%c🚀 Welcome to BUCC Creative Department! 🎨', 
    'font-size: 20px; font-weight: bold; color: #00f0ff; text-shadow: 0 0 10px #00f0ff;');
console.log('%cYou found the console! You\'re already thinking like a creative developer 💻', 
    'font-size: 14px; color: #ff00ff;');
console.log('%cTip: Try the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) for a surprise! 🎮', 
    'font-size: 12px; color: #ffff00;');

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.querySelectorAll('.member-card').forEach(card => {
        card.style.transition = 'all 0.3s ease';
    });
}

// Accessibility: Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}
