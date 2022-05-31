function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    //Slider Complex

    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }
    presentCurrentIndex(slideIndex);
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (getStructuredWidth(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += getStructuredWidth(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        presentCurrentIndex(slideIndex);
        setOpacityToDots(slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = getStructuredWidth(width) * (slides.length - 1);
        } else {
            offset -= getStructuredWidth(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        presentCurrentIndex(slideIndex);
        setOpacityToDots(slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = getStructuredWidth(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            presentCurrentIndex(slideIndex);
            setOpacityToDots(slideIndex);
        });
    });
    function presentCurrentIndex(slideIndex){
        if (slideIndex < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    }
    function setOpacityToDots(slideIndex){
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    }
    function getStructuredWidth(str){
        return +str.replace(/\D/g , '');
    }
}
export default slider;