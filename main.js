/* ============================================================
   Vilma Aires · Podologia ao Domicílio — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV: adiciona classe "scrolled" ao fazer scroll ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── SCROLL REVEAL: anima elementos ao entrarem no viewport ── */
  const revealEls = document.querySelectorAll(
    '.why-card, .service-card, .step, .testimonial-card'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ${i * 0.07}s ease, transform 0.55s ${i * 0.07}s ease`;
    revealObserver.observe(el);
  });

  // Classe "visible" aplica a transição
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  /* ── MENU MOBILE: hamburger toggle ── */
  const hamburger = document.querySelector('.hamburger');
  const navMenu   = document.querySelector('nav ul');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Fecha o menu ao clicar num link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── SMOOTH SCROLL para âncoras internas ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── CONTADORES animados nos stats do hero ── */
  const counters = document.querySelectorAll('.stat-num');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const raw   = el.textContent.trim();           // ex: "500+" ou "10+" ou "100%"
      const num   = parseInt(raw.replace(/\D/g, ''), 10);
      const suffix = raw.replace(/[0-9]/g, '');      // "+" ou "%"
      const duration = 1200;
      const step  = Math.ceil(num / (duration / 16));
      let current = 0;

      const tick = () => {
        current = Math.min(current + step, num);
        el.textContent = current + suffix;
        if (current < num) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => countObserver.observe(c));

  /* ── TOOLTIP no botão WhatsApp ── */
  const waBtn = document.querySelector('.whatsapp-btn');
  if (waBtn) {
    const tooltip = document.createElement('span');
    tooltip.textContent = 'Falar pelo WhatsApp';
    tooltip.style.cssText = `
      position: absolute;
      right: 70px;
      background: #25D366;
      color: #fff;
      font-size: 0.78rem;
      font-family: 'Lato', sans-serif;
      font-weight: 700;
      padding: 0.4rem 0.9rem;
      border-radius: 20px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s;
    `;
    waBtn.style.position = 'fixed';
    waBtn.appendChild(tooltip);

    waBtn.addEventListener('mouseenter', () => { tooltip.style.opacity = '1'; });
    waBtn.addEventListener('mouseleave', () => { tooltip.style.opacity = '0'; });
  }

});