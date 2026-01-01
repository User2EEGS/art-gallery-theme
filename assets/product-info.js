/**
 * Product Info Custom Element - Shopify 2.0 Standards
 */

if (!customElements.get('product-info')) {
  customElements.define('product-info', class ProductInfo extends HTMLElement {
    constructor() {
      super();
      this.imageGallery = this.querySelector('product-gallery');
      this.quantitySelector = this.querySelector('quantity-selector');
    }
  });
}

if (!customElements.get('product-gallery')) {
  customElements.define('product-gallery', class ProductGallery extends HTMLElement {
    constructor() {
      super();
      this.thumbnails = this.querySelectorAll('[data-thumbnail]');
      this.mainImage = this.querySelector('[data-main-image]');
      
      if (this.thumbnails.length && this.mainImage) {
        this.initGallery();
      }
    }

    initGallery() {
      this.thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('click', (e) => {
          e.preventDefault();
          this.updateMainImage(thumbnail);
          this.updateActiveThumbnail(thumbnail);
        });
      });
    }

    updateMainImage(thumbnail) {
      const newImageSrc = thumbnail.dataset.imageUrl;
      const newImageSrcset = thumbnail.dataset.imageSrcset;
      const newImageAlt = thumbnail.dataset.imageAlt;
      
      const mainImg = this.mainImage.querySelector('img');
      
      if (mainImg && newImageSrc) {
        mainImg.src = newImageSrc;
        if (newImageSrcset) mainImg.srcset = newImageSrcset;
        if (newImageAlt) mainImg.alt = newImageAlt;
      }
    }

    updateActiveThumbnail(activeThumbnail) {
      this.thumbnails.forEach(thumb => thumb.classList.remove('active'));
      activeThumbnail.classList.add('active');
    }
  });
}

if (!customElements.get('quantity-selector')) {
  customElements.define('quantity-selector', class QuantitySelector extends HTMLElement {
    constructor() {
      super();
      this.input = this.querySelector('input[type="number"]');
      this.minusButton = this.querySelector('[data-action="minus"]');
      this.plusButton = this.querySelector('[data-action="plus"]');
      this.min = parseInt(this.input?.min) || 1;
      
      if (this.input && this.minusButton && this.plusButton) {
        this.initButtons();
      }
    }

    initButtons() {
      this.minusButton.addEventListener('click', () => {
        this.changeQuantity(-1);
      });

      this.plusButton.addEventListener('click', () => {
        this.changeQuantity(1);
      });

      this.input.addEventListener('change', () => {
        this.validateQuantity();
      });
    }

    changeQuantity(change) {
      const currentValue = parseInt(this.input.value) || this.min;
      const newValue = currentValue + change;
      
      if (newValue >= this.min) {
        this.input.value = newValue;
        this.input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    validateQuantity() {
      const value = parseInt(this.input.value) || this.min;
      if (value < this.min) {
        this.input.value = this.min;
      }
    }
  });
}