import { getResource } from "./services";

export default function slider(server) {
    const sliderBox = document.querySelector('.offer__slider'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width,
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        dotsList = [];
    let slides,
        offset = 0,
        slideIndex = 1;

    sliderCall(server);

    function toNumber(str) { return +str.replace(/\D/g, ''); }
    function dotMark() { dotsList[slideIndex - 1].style.opacity = 1; }
    function slidesFieldTransform() { slidesField.style.transform = `translateX(-${offset}px)`; }
    function addZero() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    async function sliderCall(server) {
        await getResource(`${server}slides`)
        .then(data => {
            data.forEach(({img, altimg}) => {
                const slideItem = document.createElement('div');
                slideItem.classList.add('offer__slide', 'active');
                slideItem.innerHTML = `<img src="${img}" alt="${altimg}">`;
                document.querySelector('.offer__slider-inner').append(slideItem);
            });
        });
        slides = document.querySelectorAll('.offer__slide');

        sliderConstruct();
        dots();
        next.addEventListener('click', forward);
        prev.addEventListener('click', previous);
        slidesField.addEventListener('onScroll', forward);
        clickOnDots();
    }

    function sliderConstruct() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent =  `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent =  slideIndex;
        }
        slidesField.style.cssText = `
            width: ${100 * slides.length}%;
            display: flex;
            transition: 0.6s all;
            `;
        slidesWrapper.style.overflow = 'hidden';
        slides.forEach(slide => slide.style.width = width);
    }

    function forward() {
        
        if (offset == toNumber(width) * (slides.length -1)) { 
            offset = 0; 
        } else {
            offset += toNumber(width);
        }
        slidesFieldTransform();

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        addZero(); 

        if (slideIndex == 1) {
            dotsList[slides.length - 1].style.opacity = 0.6;
        } else {
            dotsList[slideIndex - 2].style.opacity = 0.6;
        }
        dotMark();
    }

    function previous() {
        
        if (offset == 0) { 
            offset = toNumber(width) * (slides.length -1); 
        } else {
            offset -= toNumber(width);
        }
        slidesFieldTransform();

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        addZero(); 

        if (slideIndex == slides.length) {
            dotsList[0].style.opacity = 0.6;
        } else {
            dotsList[slideIndex].style.opacity = 0.6;
        }
        dotMark();
    }

    function dots() {
        sliderBox.style.position = 'relative';
        const dotsWrapper = document.createElement('ol');
        dotsWrapper.classList.add('carousel-indicators');
        slidesWrapper.append(dotsWrapper);
        
        
        slides.forEach((element, i) => {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.classList.add('dot');
            if (i == 0) { dot.style.opacity = 1; }
            dotsWrapper.append(dot);
            dotsList.push(dot);
        });
    }
    function clickOnDots() {
        dotsList.forEach(dot => {
            dot.addEventListener('click', e => {
                const slideTo = e.target.getAttribute('data-slide-to');
                slideIndex = slideTo;
                offset = toNumber(width) * (slideTo - 1); 
                slidesFieldTransform();
                addZero();
                dotsList.forEach(dot => dot.style.opacity = 0.6);
                dotMark();
            });
        });
    }
}
