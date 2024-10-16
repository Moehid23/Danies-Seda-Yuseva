// Fungsi untuk membuat popup gallery
function createGalleryPopup() {
    // Membuat container utama
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'gallery-popup-container';
    
    // Membuat content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'gallery-popup-content';
    
    // Membuat close button
    const closeButton = document.createElement('button');
    closeButton.className = 'gallery-popup-close';
    closeButton.innerHTML = '&times;';
    
    // Membuat image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'gallery-popup-image-container';
    
    // Membuat image element
    const popupImage = document.createElement('img');
    popupImage.className = 'gallery-popup-image';
    
    // Membuat navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'gallery-popup-nav prev';
    prevButton.innerHTML = '&#10094;';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'gallery-popup-nav next';
    nextButton.innerHTML = '&#10095;';
    
    // Menyusun elements
    imageContainer.appendChild(popupImage);
    contentWrapper.appendChild(closeButton);
    contentWrapper.appendChild(prevButton);
    contentWrapper.appendChild(nextButton);
    contentWrapper.appendChild(imageContainer);
    galleryContainer.appendChild(contentWrapper);
    
    return {
        container: galleryContainer,
        image: popupImage,
        close: closeButton,
        prev: prevButton,
        next: nextButton
    };
}

// Menambahkan styles untuk popup gallery
const styles = `
    .gallery-popup-container {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        justify-content: center;
        align-items: center;
    }
    
    .gallery-popup-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
        margin: auto;
    }
    
    .gallery-popup-image-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .gallery-popup-image {
        max-width: 100%;
        max-height: 85vh;
        object-fit: contain;
    }
    
    .gallery-popup-close {
        position: absolute;
        top: -40px;
        right: -40px;
        color: #fff;
        font-size: 35px;
        font-weight: bold;
        cursor: pointer;
        background: none;
        border: none;
        padding: 10px;
        z-index: 1000;
    }
    
    .gallery-popup-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
        padding: 16px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .gallery-popup-nav:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .gallery-popup-nav.prev {
        left: -60px;
    }
    
    .gallery-popup-nav.next {
        right: -60px;
    }
    
    @media (max-width: 768px) {
        .gallery-popup-nav {
            padding: 12px;
            width: 40px;
            height: 40px;
        }
        
        .gallery-popup-nav.prev {
            left: 10px;
        }
        
        .gallery-popup-nav.next {
            right: 10px;
        }
        
        .gallery-popup-close {
            top: -40px;
            right: 10px;
        }
    }
`;

// Menambahkan style ke head
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Inisialisasi Gallery
class Gallery {
    constructor(sliderImages) {
        this.images = Array.from(sliderImages);
        this.currentIndex = 0;
        this.popup = createGalleryPopup();
        
        document.body.appendChild(this.popup.container);
        this.bindEvents();
    }
    
    bindEvents() {
        // Click events untuk gambar slider
        this.images.forEach((img, index) => {
            img.addEventListener('click', () => this.openGallery(index));
        });
        
        // Close button
        this.popup.close.addEventListener('click', () => this.closeGallery());
        
        // Navigation buttons
        this.popup.prev.addEventListener('click', () => this.showPrevImage());
        this.popup.next.addEventListener('click', () => this.showNextImage());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.popup.container.style.display === 'flex') {
                if (e.key === 'Escape') this.closeGallery();
                if (e.key === 'ArrowLeft') this.showPrevImage();
                if (e.key === 'ArrowRight') this.showNextImage();
            }
        });
        
        // Click outside to close
        this.popup.container.addEventListener('click', (e) => {
            if (e.target === this.popup.container) {
                this.closeGallery();
            }
        });
    }
    
    openGallery(index) {
        this.currentIndex = index;
        this.popup.container.style.display = 'flex';
        this.updateImage();
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    closeGallery() {
        this.popup.container.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    showPrevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }
    
    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }
    
    updateImage() {
        const currentImage = this.images[this.currentIndex];
        this.popup.image.src = currentImage.src;
        this.popup.image.alt = currentImage.alt;
    }
    
}