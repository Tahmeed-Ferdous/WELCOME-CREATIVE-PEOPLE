// Retro Grid Canvas Background with color transitions
const canvas = document.getElementById('retroGrid');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animated grid with color cycling
const gridSize = 50;
let offset = 0;
const colors = ['#00f0ff', '#ff00ff', '#ffff00', '#00ff88'];
let colorIndex = 0;
let colorTransition = 0;

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Smooth color transition
    const currentColor = colors[colorIndex];
    const nextColor = colors[(colorIndex + 1) % colors.length];
    
    ctx.strokeStyle = lerpColor(currentColor, nextColor, colorTransition);
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines with movement
    for (let y = offset; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Update animations
    offset += 0.5;
    if (offset >= gridSize) offset = 0;
    
    colorTransition += 0.002;
    if (colorTransition >= 1) {
        colorTransition = 0;
        colorIndex = (colorIndex + 1) % colors.length;
    }
    
    requestAnimationFrame(drawGrid);
}

// Color interpolation helper
function lerpColor(color1, color2, t) {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    
    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);
    
    return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 240, b: 255 };
}

drawGrid();

// Smooth scroll-triggered animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.split-text, .message-card, .await-card, .mentor-card, .inspiration-card').forEach(el => {
    fadeObserver.observe(el);
});

// Staggered animation for inspiration cards
const inspirationCards = document.querySelectorAll('.inspiration-card');
const inspirationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = Array.from(inspirationCards);
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 150);
            });
            inspirationObserver.disconnect();
        }
    });
}, observerOptions);

if (inspirationCards.length > 0) {
    inspirationObserver.observe(inspirationCards[0]);
}

// Staggered animation for await cards
const awaitCards = document.querySelectorAll('.await-card');
const awaitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = Array.from(awaitCards);
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 200);
            });
            awaitObserver.disconnect();
        }
    });
}, observerOptions);

if (awaitCards.length > 0) {
    awaitObserver.observe(awaitCards[0]);
}

// Enhanced nav scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const nav = document.querySelector('.nav');
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
        nav.style.boxShadow = '0 5px 30px rgba(0, 240, 255, 0.3)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// Smooth scroll for links
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

// Button interaction
const button = document.querySelector('.retro-button');
if (button) {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
        
        alert('🚀 Welcome to BUCC Creative! Let\'s create amazing things together!');
    });
}

// Add floating particles
const particleCount = 30;
const particles = [];

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = 0.2 + Math.random() * 0.5;
        this.size = 1 + Math.random() * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 0.3 + Math.random() * 0.3;
    }
    
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.reset();
        }
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Console welcome
console.log('%c🚀 Welcome to BUCC Creative Department! 🎨', 
    'font-size: 20px; font-weight: bold; color: #00f0ff; text-shadow: 0 0 10px #00f0ff;');
console.log('%cReady to create something amazing? Let\'s go! 💻', 
    'font-size: 14px; color: #ff00ff;');


