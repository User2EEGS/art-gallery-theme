/**
 * SCROLL ANIMATIONS - Galería de Arte Profesional
 * v2 - Eliminado initStickyHeader (gestionado por Custom Element en header.liquid)
 */

(function() {
  'use strict';

  const config = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    animationDelay: 100,
    parallaxSpeed: 0.5
  };

  // ========================================
  // INTERSECTION OBSERVER - SCROLL REVEAL
  // ========================================

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * config.animationDelay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: config.threshold,
    rootMargin: config.rootMargin
  });

  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(`
      .product-card,
      .hero-content,
      .section-title,
      .feature-item,
      .testimonial-card,
      .image-with-text,
      .rich-text-block,
      .collection-item
    `);
    animatedElements.forEach(el => {
      el.classList.add('fade-in-up');
      observer.observe(el);
    });
  }

  // ========================================
  // PARALLAX SUTIL EN IMÁGENES
  // ========================================

  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-image');
    if (parallaxElements.length === 0) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              el.style.transform = `translateY(${(scrolled - elementTop) * config.parallaxSpeed}px)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ========================================
  // SEARCH MODAL
  // ========================================

  function initSearchModal() {
    const searchToggle  = document.querySelector('.search-toggle');
    const searchDropdown = document.querySelector('.search-dropdown');
    const searchClose   = document.querySelector('.search-close');
    const searchInput   = document.querySelector('.search-input');

    if (!searchToggle || !searchDropdown) return;

    searchToggle.addEventListener('click', () => {
      searchDropdown.classList.add('search-dropdown--open');
      setTimeout(() => { if (searchInput) searchInput.focus(); }, 300);
    });

    function closeSearch() {
      searchDropdown.classList.remove('search-dropdown--open');
    }

    if (searchClose) searchClose.addEventListener('click', closeSearch);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && searchDropdown.classList.contains('search-dropdown--open')) {
        closeSearch();
      }
    });

    searchDropdown.addEventListener('click', e => {
      if (e.target === searchDropdown) closeSearch();
    });
  }

  // ========================================
  // MOBILE MENU
  // ========================================

  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose  = document.querySelector('.mobile-menu-close');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('mobile-menu--open');
      document.body.style.overflow = 'hidden';
    });

    function closeMenu() {
      mobileMenu.classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
    }

    if (menuClose) menuClose.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ========================================
  // SMOOTH SCROLL
  // ========================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
          window.scrollTo({ top: target.offsetTop - headerHeight - 20, behavior: 'smooth' });
        }
      });
    });
  }

  // ========================================
  // NÚMEROS ANIMADOS
  // ========================================

  function initCounters() {
    document.querySelectorAll('.counter-number').forEach(counter => {
      const target    = parseInt(counter.getAttribute('data-target'));
      const duration  = 2000;
      const increment = target / (duration / 16);
      let current     = 0;

      new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const update = () => {
              current += increment;
              if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
              } else {
                counter.textContent = target;
              }
            };
            update();
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 }).observe(counter);
    });
  }

  // ========================================
  // INICIALIZACIÓN
  // ========================================

  function runInit() {
    initScrollAnimations();
    initParallax();
    // ⚠️ initStickyHeader() ELIMINADO — lo gestiona el Custom Element
    // sticky-header en sections/header.liquid
    initSearchModal();
    initMobileMenu();
    initSmoothScroll();
    initCounters();
    console.log('🎨 Animaciones de galería inicializadas (v2)');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
  } else {
    runInit();
  }

})();