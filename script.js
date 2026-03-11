/* ===========================
   LENIS SMOOTH SCROLL
=========================== */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

function rafLoop(time) {
  lenis.raf(time);
  requestAnimationFrame(rafLoop);
}
requestAnimationFrame(rafLoop);

/* ===========================
   CUSTOM CURSOR
=========================== */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

/* ===========================
   NAVIGATION
=========================== */
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

lenis.on('scroll', ({ scroll }) => {
  if (scroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = menuBtn.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  });
});

/* ===========================
   HERO PARTICLE CANVAS
=========================== */
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;

    if (this.life > this.maxLife) this.reset();
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    const progress = this.life / this.maxLife;
    const alpha = this.opacity * (1 - Math.abs(progress - 0.5) * 2);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 245, 212, ${alpha})`;
    ctx.fill();
  }
}

// Grid nodes for a tech mesh
class GridNode {
  constructor(x, y) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.radius = 1.5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    // Drift back toward base
    this.vx += (this.baseX - this.x) * 0.002;
    this.vy += (this.baseY - this.y) * 0.002;
    // Damping
    this.vx *= 0.99;
    this.vy *= 0.99;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 245, 212, 0.4)';
    ctx.fill();
  }
}

const particles = Array.from({ length: 80 }, () => new Particle());

const gridNodes = [];
const cols = 12, rows = 8;
function buildGrid() {
  gridNodes.length = 0;
  const cw = canvas.width, ch = canvas.height;
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      gridNodes.push(new GridNode((i / cols) * cw, (j / rows) * ch));
    }
  }
}
buildGrid();
window.addEventListener('resize', buildGrid);

function drawConnections() {
  for (let i = 0; i < gridNodes.length; i++) {
    for (let j = i + 1; j < gridNodes.length; j++) {
      const dx = gridNodes[i].x - gridNodes[j].x;
      const dy = gridNodes[i].y - gridNodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 120;
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.08;
        ctx.beginPath();
        ctx.moveTo(gridNodes[i].x, gridNodes[i].y);
        ctx.lineTo(gridNodes[j].x, gridNodes[j].y);
        ctx.strokeStyle = `rgba(0, 245, 212, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

// Mouse influence on grid
let heroMouseX = canvas.width / 2;
let heroMouseY = canvas.height / 2;

document.querySelector('.hero').addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  heroMouseX = e.clientX - rect.left;
  heroMouseY = e.clientY - rect.top;
});

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gradient background
  const grad = ctx.createRadialGradient(
    canvas.width * 0.3, canvas.height * 0.4, 0,
    canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.7
  );
  grad.addColorStop(0, 'rgba(0, 245, 212, 0.03)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update + draw grid
  gridNodes.forEach(node => {
    // Mouse repulsion
    const dx = node.x - heroMouseX;
    const dy = node.y - heroMouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      node.vx += (dx / dist) * 0.5;
      node.vy += (dy / dist) * 0.5;
    }
    node.update();
    node.draw();
  });

  drawConnections();

  // Particles
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateCanvas);
}
animateCanvas();

/* ===========================
   SCROLL REVEAL
=========================== */
const revealElements = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ===========================
   COUNTER ANIMATION
=========================== */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => {
  counterObserver.observe(el);
});

/* ===========================
   PCARD GLOW (Mouse Track)
=========================== */
document.querySelectorAll('.pcard').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.pcard__glow');
    if (glow) {
      glow.style.left = x + 'px';
      glow.style.top = y + 'px';
    }
  });
});

/* ===========================
   TIMELINE ANIMATION
=========================== */
const timelineLine = document.querySelector('.timeline__line');
if (timelineLine) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timelineLine.style.transition = 'height 2s cubic-bezier(0.65, 0.05, 0, 1)';
      }
    });
  }, { threshold: 0.1 });
  timelineObserver.observe(timelineLine);
}

/* ===========================
   TYPING ANIMATION
=========================== */
const typingEl = document.getElementById('typingText');
if (typingEl) {
  const roles = [
    'Full Stack Developer',
    'Data Scientist',
    'ML Engineer',
    'Researcher',
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 1800; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }

    setTimeout(typeLoop, delay);
  }

  setTimeout(typeLoop, 800);
}

/* ===========================
   CONTACT FORM
=========================== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span>Message Sent! ✓</span>';
    btn.style.background = '#00c4a0';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

/* ===========================
   SMOOTH ANCHOR SCROLL (Lenis)
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    }
  });
});

/* ===========================
   SKILL PILL STAGGER
=========================== */
document.querySelectorAll('.stack__category').forEach((category, ci) => {
  category.querySelectorAll('.skill-pill').forEach((pill, i) => {
    pill.style.transitionDelay = `${i * 0.04}s`;
  });
});

/* ===========================
   PARALLAX HERO TITLE
=========================== */
lenis.on('scroll', ({ scroll }) => {
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    heroContent.style.transform = `translateY(${scroll * 0.25}px)`;
    heroContent.style.opacity = 1 - scroll / window.innerHeight;
  }
});

/* ===========================
   ACTIVE NAV LINK ON SCROLL
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
