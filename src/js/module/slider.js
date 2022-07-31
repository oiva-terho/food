import { getResource } from './services';

function slider(server) {
  const prev = document.querySelector('.offer__slider-prev');
  const next = document.querySelector('.offer__slider-next');
  const current = document.querySelector('#current');
  const total = document.querySelector('#total');
  let slides;
  let slideIndex = 1;

  sliderCall();

  async function sliderCall() {
      await getResource(`${server}slides`)
      .then(data => {
          data.forEach(({img, altimg}) => {
              const slideItem = document.createElement('div');
              slideItem.classList.add('offer__slide');
              slideItem.innerHTML = `<img src="${img}" alt="${altimg}">`;
              document.querySelector('.offer__slider-inner').append(slideItem);
          });
      });
      document.querySelector('.offer__slide').classList.add('active');
      slides = document.querySelectorAll('.offer__slide');
      if (slides.length < 10) {
          total.textContent = `0${slides.length}`;
      } else {
          total.textContent = slides.length;
      }
      showSlides(slideIndex);
  }

  function showSlides(n) {
      if (n > slides.length) { slideIndex = 1; }
      if (n < 1) { slideIndex = slides.length; }
      slides.forEach(item => item.classList.remove('active'));
      slides[slideIndex -1].classList.add('active');
      if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
      } else {
          current.textContent = slideIndex;
      }
  }

  function changeSlide(n) {showSlides(slideIndex += n);}
  prev.addEventListener('click', () => { changeSlide(-1); });
  next.addEventListener('click', () => { changeSlide(1); });
}
export default slider; 