class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        this.tracker = this.slider.querySelector('.slider-track');
        this.slides = Array.from(this.tracker.children);
        this.prevBtn = this.slider.querySelector('.prev');
        this.nextBtn = this.slider.querySelector('.next');
        this.dotsContainer = this.slider.querySelector('.slider-dots');
        this.dots = [];
        this.currentIndex = 0;
        this.autoSlide = null;
        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.updateSlidePosition();
        this.startAutoSlide();
    }

    updateSlidePosition() {
        const offset = -this.currentIndex * this.slider.offsetWidth;
        this.tracker.style.transform = `translateX(${offset}px)`;
        this.updateDots();
    }

    nextslide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlidePosition();
    }

    prevslide() {
        if (this.currentIndex > 0) {
            this.currentIndex = (this.currentIndex - 1) % this.slides.length;
        } else {
            this.currentIndex = this.slides.length - 1;
        }
        this.updateSlidePosition();
    }

    startAutoSlide() {
        // Changed to 4000ms (4 seconds) for a better user viewing experience
        this.autoSlide = setInterval(() => {
            this.nextslide();
        }, 4000);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlide);
    }

    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.nextslide());
        this.prevBtn.addEventListener('click', () => this.prevslide());

        this.slider.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });

        this.slider.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }

    createDots() {
        if (!this.dotsContainer) return;
        this.dotsContainer.innerHTML = "";
        this.dots = [];
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateSlidePosition();
            });
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new ImageSlider('.slider'));