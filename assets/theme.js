/**
 * Theme JavaScript - Shopify Online Store 2.0
 * Modular and standards-compliant
 */

class ThemeCore {
  constructor() {
    this.init();
  }

  init() {
    this.mobileMenu = new MobileMenu();
    this.searchOverlay = new SearchOverlay();
  }
}

// Mobile Menu Handler
class MobileMenu {
  constructor() {
    this.menuToggle = document.querySelector('.mobile-menu-toggle');
    this.menuClose = document.querySelector('.mobile-menu-close');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.body = document.body;
    
    if (this.menuToggle && this.mobileMenu) {
      this.bindEvents();
    }
  }

  bindEvents() {
    this.menuToggle.addEventListener('click', () => this.open());
    
    if (this.menuClose) {
      this.menuClose.addEventListener('click', () => this.close());
    }

    // Close on link click
    const links = this.mobileMenu.querySelectorAll('.mobile-nav__link');
    links.forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    // Close on outside click
    this.mobileMenu.addEventListener('click', (e) => {
      if (e.target === this.mobileMenu) {
        this.close();
      }
    });
  }

  open() {
    this.mobileMenu.classList.add('mobile-menu--open');
    this.body.style.overflow = 'hidden';
  }

  close() {
    this.mobileMenu.classList.remove('mobile-menu--open');
    this.body.style.overflow = '';
  }
}

// Search Overlay Handler
class SearchOverlay {
  constructor() {
    this.searchToggle = document.querySelector('.search-toggle');
    this.searchClose = document.querySelector('.search-close');
    this.searchDropdown = document.querySelector('.search-dropdown');
    this.searchInput = document.querySelector('.search-input');

    if (this.searchToggle && this.searchDropdown) {
      this.bindEvents();
    }
  }

  bindEvents() {
    this.searchToggle.addEventListener('click', () => this.open());
    
    if (this.searchClose) {
      this.searchClose.addEventListener('click', () => this.close());
    }

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.searchDropdown.classList.contains('search-dropdown--open')) {
        this.close();
      }
    });

    // Close on outside click
    this.searchDropdown.addEventListener('click', (e) => {
      if (e.target === this.searchDropdown) {
        this.close();
      }
    });
  }

  open() {
    this.searchDropdown.classList.add('search-dropdown--open');
    setTimeout(() => {
      if (this.searchInput) this.searchInput.focus();
    }, 100);
  }

  close() {
    this.searchDropdown.classList.remove('search-dropdown--open');
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeCore();
  });
} else {
  new ThemeCore();
}