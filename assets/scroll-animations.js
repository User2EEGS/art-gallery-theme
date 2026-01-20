/**
 * SCROLL ANIMATIONS - Galería de Arte Profesional
 * Animaciones suaves y elegantes al hacer scroll
 */

(function() {
  'use strict';

  // ========================================
  // CONFIGURACIÓN
  // ========================================
  
  const config = {
    threshold: 0.1,           // Cuándo activar (10% visible)
    rootMargin: '0px 0px -50px 0px',
    animationDelay: 100,      // Delay entre elementos
    parallaxSpeed: 0.5        // Velocidad del parallax
  };

  // ========================================
  // INTERSECTION OBSERVER - SCROLL REVEAL
  // ========================================
  
  const observerOptions = {
    threshold: config.threshold,
    rootMargin: config.rootMargin
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = index * config.animationDelay;
        
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // ========================================
  // INICIALIZAR ANIMACIONES SCROLL
  // ========================================
  
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

    animatedElements.forEach((el) => {
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

    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (scrolled - elementTop) * config.parallaxSpeed;
          el.style.transform = `translateY(${offset}px)`;
        }
      });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ========================================
  // HEADER STICKY (SHOW / HIDE LOGIC)
  // ========================================
  
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;
    const scrollThreshold = 10; // Mínimo de scroll para reaccionar

    function updateHeader() {
      const currentScroll = window.pageYOffset;

      // 1. Efecto de color al bajar (Header Scrolled)
      if (currentScroll > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }

      // 2. Lógica de ESCONDER y MOSTRAR
      // Si bajamos el scroll y hemos pasado el área del hero
      if (currentScroll > lastScroll && currentScroll > 150) {
        header.classList.add('site-header--hidden');
      } 
      // Si subimos el scroll (con un pequeño margen de tolerancia)
      else if (currentScroll < lastScroll - scrollThreshold || currentScroll <= 0) {
        header.classList.remove('site-header--hidden');
      }

      lastScroll = currentScroll;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  // ========================================
  // SEARCH MODAL
  // ========================================
  
  function initSearchModal() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchDropdown = document.querySelector('.search-dropdown');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');

    if (!searchToggle || !searchDropdown) return;

    searchToggle.addEventListener('click', () => {
      searchDropdown.classList.add('search-dropdown--open');
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 300);
    });

    function closeSearch() {
      searchDropdown.classList.remove('search-dropdown--open');
    }

    if (searchClose) {
      searchClose.addEventListener('click', closeSearch);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchDropdown.classList.contains('search-dropdown--open')) {
        closeSearch();
      }
    });

    searchDropdown.addEventListener('click', (e) => {
      if (e.target === searchDropdown) {
        closeSearch();
      }
    });
  }

  // ========================================
  // MOBILE MENU
  // ========================================
  
  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.mobile-menu-close');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('mobile-menu--open');
      document.body.style.overflow = 'hidden';
    });

    function closeMenu() {
      mobileMenu.classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
    }

    if (menuClose) {
      menuClose.addEventListener('click', closeMenu);
    }

    const menuLinks = mobileMenu.querySelectorAll('.mobile-nav__link');
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ========================================
  // SMOOTH SCROLL PARA ANCHORS
  // ========================================
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ========================================
  // NÚMEROS ANIMADOS (COUNTERS)
  // ========================================
  
  function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const observerOptions = { threshold: 0.5 };

      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            };
            updateCounter();
            counterObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      counterObserver.observe(counter);
    });
  }

  // ========================================
  // INICIALIZACIÓN
  // ========================================
  
  function runInit() {
    initScrollAnimations();
    initParallax();
    initStickyHeader();
    initSearchModal();
    initMobileMenu();
    initSmoothScroll();
    initCounters();

    console.log('🎨 Animaciones de galería con Header inteligente inicializadas');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
  } else {
    runInit();
  }

})();