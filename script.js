/* ── script.js ── */

// ── NAV TOGGLE (mobile) ──
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── SCROLL-TRIGGERED ANIMATIONS ──
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

// Timeline reveal
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
  timelineObserver.observe(item);
});

// Skill bar fill on scroll
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        const target = fill.getAttribute('style').match(/width:\s*([\d.]+%)/)?.[1] || '0%';
        fill.style.width = target;
      });
    }
  });
}, { threshold: 0.2 });

const skillSection = document.querySelector('.skills');
if (skillSection) skillBarObserver.observe(skillSection);

// Circular language indicators animate on scroll
const circleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Reset then animate
      entry.target.querySelectorAll('.circle-prog').forEach(circle => {
        const offset = circle.getAttribute('stroke-dashoffset');
        circle.style.strokeDashoffset = '314';
        setTimeout(() => {
          circle.style.strokeDashoffset = offset;
        }, 100);
      });
    }
  });
}, { threshold: 0.3 });

const langSection = document.querySelector('.languages');
if (langSection) circleObserver.observe(langSection);

// ── SKILL CARD stagger on load ──
window.addEventListener('load', () => {
  document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.1 + 0.3}s, transform 0.5s ease ${i * 0.1 + 0.3}s`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, (i * 100) + 300);
  });
});

// ── NAV SHADOW ON SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.06)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.textContent = 'Sent ✓';
    btn.style.background = '#3a9e5f';
    formSuccess.style.display = 'block';
    contactForm.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.background = '';
      formSuccess.style.display = 'none';
    }, 3500);
  }, 900);
});

// ── SMOOTH ACTIVE NAV HIGHLIGHT ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.style.color = '');
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.style.color = 'var(--primary-color)';
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => activeObserver.observe(s));
