/* ============================================================
   MultyVia Services – main.js
   ============================================================ */

/* ── Navbar: scroll effect + active link ───────────────── */
(function () {
  const header    = document.getElementById('header');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');

  function onScroll() {
    // Sticky style
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile nav hamburger ───────────────────────────────── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.createElement('div');

  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.5);
    z-index:999;opacity:0;pointer-events:none;
    transition:opacity .3s ease;
  `;
  document.body.appendChild(overlay);

  function close() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    overlay.style.opacity = isOpen ? '1' : '0';
    overlay.style.pointerEvents = isOpen ? 'auto' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.addEventListener('click', close);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', close);
  });
})();

/* ── Scroll animations (AOS-like) ───────────────────────── */
(function () {
  const elements = document.querySelectorAll('[data-aos]');

  function checkElements() {
    const windowHeight = window.innerHeight;
    elements.forEach(el => {
      const rect  = el.getBoundingClientRect();
      const delay = parseInt(el.getAttribute('data-delay') || 0, 10);
      if (rect.top < windowHeight - 60) {
        setTimeout(() => el.classList.add('aos-animate'), delay);
      }
    });
  }

  window.addEventListener('scroll', checkElements, { passive: true });
  window.addEventListener('resize', checkElements, { passive: true });
  // Initial check after a short delay to let the page render
  setTimeout(checkElements, 100);
})();

/* ── Back to Top ────────────────────────────────────────── */
(function () {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Contact Form Validation ────────────────────────────── */
(function () {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const success   = document.getElementById('formSuccess');

  if (!form) return;

  function showError(input, message) {
    const group = input.closest('.form-group');
    input.classList.add('error');
    const errSpan = group.querySelector('.field-error');
    if (errSpan) errSpan.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('error');
    const group = input.closest('.form-group');
    const errSpan = group.querySelector('.field-error');
    if (errSpan) errSpan.textContent = '';
  }

  // Clear error on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });

  function validate() {
    let valid = true;
    const nom       = form.querySelector('#nom');
    const email     = form.querySelector('#email');
    const profil    = form.querySelector('#profil');
    const prestation = form.querySelector('#prestation');
    const message   = form.querySelector('#message');
    const rgpd      = form.querySelector('#rgpd');

    if (!nom.value.trim() || nom.value.trim().length < 2) {
      showError(nom, 'Veuillez saisir votre nom (min. 2 caractères).');
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      showError(email, 'Veuillez saisir une adresse email valide.');
      valid = false;
    }

    if (!profil.value) {
      showError(profil, 'Veuillez sélectionner votre profil.');
      valid = false;
    }

    if (!prestation.value) {
      showError(prestation, 'Veuillez sélectionner un type de prestation.');
      valid = false;
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      showError(message, 'Veuillez décrire votre besoin (min. 10 caractères).');
      valid = false;
    }

    if (!rgpd.checked) {
      showError(rgpd, 'Vous devez accepter la politique de confidentialité.');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    // Simulate sending (replace with actual fetch/API call)
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Envoi en cours…</span>';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Envoyer ma demande</span>';
      success.classList.add('visible');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      setTimeout(() => success.classList.remove('visible'), 8000);
    }, 1500);
  });
})();

/* ── Smooth scroll for anchor links ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
