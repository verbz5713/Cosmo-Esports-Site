// Mouse Glow Tracking
const glow = document.getElementById('mouse-glow');
document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// Tiled Gaming Icons - a dense wallpaper-style grid, muted & desaturated so it reads
// as atmosphere, not stickers. Each cell gets a random icon, slight jitter, and a
// slow drift so it feels alive without losing the tiled pattern.
const bgContainer = document.getElementById('bg-elements');
const iconClasses = [
    'fa-solid fa-gamepad',
    'fa-solid fa-desktop',
    'fa-solid fa-headset',
    'fa-solid fa-keyboard',
    'fa-solid fa-computer-mouse',
    'fa-solid fa-crosshairs',
    'fa-solid fa-tv',
    'fa-solid fa-microchip'
];
const glowColors = ['34,211,238', '168,85,247', '232,121,249']; // cyan, purple, magenta

const COLS = 8;
const ROWS = 10;
for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
        const el = document.createElement('i');
        el.className = iconClasses[Math.floor(Math.random() * iconClasses.length)] + ' floating-icon';
        const c = glowColors[Math.floor(Math.random() * glowColors.length)];
        // Base grid position + small jitter so it doesn't look like a rigid checkerboard
        const jitterX = (Math.random() - 0.5) * (100 / COLS) * 0.6;
        const jitterY = (Math.random() - 0.5) * (100 / ROWS) * 0.6;
        el.style.left = ((col + 0.5) * (100 / COLS) + jitterX) + '%';
        el.style.top = ((row + 0.5) * (100 / ROWS) + jitterY) + '%';
        el.style.fontSize = (1 + Math.random() * 0.9) + 'rem';
        el.style.setProperty('--tilt', ((Math.random() - 0.5) * 30) + 'deg');
        el.style.animationDelay = (Math.random() * 10) + 's';
        el.style.animationDuration = (30 + Math.random() * 25) + 's';
        el.style.opacity = 0.08 + Math.random() * 0.13;
        el.style.filter = `grayscale(65%) drop-shadow(0 0 9px rgba(${c},0.6))`;
        bgContainer.appendChild(el);
    }
}

// ---- SCROLL PROGRESS + "LOADING" SCAN EFFECT ----
// A slim progress bar fills as you move through the page, and a brief
// scanline/brightness flicker plays while actively scrolling (up or down)
// so the page feels like it's streaming content in as you go.
const scrollProgressEl = document.getElementById('scroll-progress');
let scrollStopTimer;

function updateScrollProgress() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    if (scrollProgressEl) scrollProgressEl.style.width = pct + '%';
}

window.addEventListener('scroll', () => {
    updateScrollProgress();
    document.body.classList.add('is-scrolling');
    clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
    }, 180);
}, { passive: true });

updateScrollProgress();

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => io.observe(el));

// Stagger division/roster cards for a cascading pop-in
document.querySelectorAll('.divisions-grid .card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.06) + 's';
});
document.querySelectorAll('.roster-grid .roster-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
});
