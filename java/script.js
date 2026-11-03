const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

function getCarouselState(carousel) {
    if (!carousel) return null;

    const slides = Array.from(carousel.querySelectorAll('img'));
    if (!slides.length) return null;

    return {
        carousel,
        slides,
        currentSlide: Number(carousel.dataset.currentSlide || 0)
    };
}

function updateCarousel(carousel) {
    const state = getCarouselState(carousel);
    if (!state) return;

    const slideWidth = state.slides[0].getBoundingClientRect().width;
    state.carousel.style.transition = 'transform 0.5s ease-in-out';
    state.carousel.style.transform = `translateX(-${state.currentSlide * slideWidth}px)`;
}

function moveSlide(step, carousel) {
    const state = getCarouselState(carousel);
    if (!state) return;

    state.currentSlide = (state.currentSlide + step + state.slides.length) % state.slides.length;
    state.carousel.dataset.currentSlide = String(state.currentSlide);
    updateCarousel(state.carousel);
}

function moveSlideMobile(step) {
    const button = (typeof event !== 'undefined' && event.target)
        ? event.target.closest('.prev, .next')
        : document.activeElement && document.activeElement.closest('.prev, .next');
    const carousel = button
        ? button.closest('.carousel-container')?.querySelector('.carousel')
        : document.querySelector('.carousel');

    moveSlide(step, carousel);
}

document.querySelectorAll('.carousel').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('img'));

    slides.forEach((img, index) => {
        if (img.parentElement?.tagName === 'FIGURE') return;

        const figure = document.createElement('figure');
        const caption = document.createElement('figcaption');
        const label = (img.alt && img.alt.trim()) || `Screen ${index + 1}`;

        figure.className = 'project-slide';
        caption.textContent = label;

        img.parentNode.insertBefore(figure, img);
        figure.appendChild(img);
        figure.appendChild(caption);
    });

    carousel.dataset.currentSlide = '0';
    updateCarousel(carousel);
});

document.querySelectorAll('.prev, .next').forEach((button) => {
    button.onclick = null;

    button.addEventListener('click', () => {
        const carousel = button.closest('.carousel-container')?.querySelector('.carousel');
        const direction = button.classList.contains('next') ? 1 : -1;
        moveSlide(direction, carousel);
    });
});

window.addEventListener('resize', () => {
    document.querySelectorAll('.carousel').forEach(updateCarousel);
});

document.addEventListener('DOMContentLoaded', () => {
    const storyPicker = document.querySelector('.story-picker');
    if (!storyPicker) return;

    const inputs = Array.from(storyPicker.querySelectorAll('input[type="radio"]'));
    inputs.forEach((input) => {
        input.addEventListener('change', () => {
            inputs.forEach((otherInput) => {
                const label = storyPicker.querySelector(`label[for="${otherInput.id}"]`);
                if (label) label.setAttribute('aria-selected', otherInput.checked ? 'true' : 'false');
            });
        });
    });
});

window.addEventListener('load', () => {
    document.querySelectorAll('.carousel').forEach(updateCarousel);
});


