export default function calculator() {
    const result = document.querySelector('.calculating__result span');
    let gender, height, weight, age, ratio;

    calcCal();
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('#ratio div', 'calculating__choose-item_active');
    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('#ratio div', 'calculating__choose-item_active');
    getDynamicInfo('#height', 250);
    getDynamicInfo('#weight', 300);
    getDynamicInfo('#age', 125);
    
    if (localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
        localStorage.setItem('gender', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcCal() {
        if (!gender || !height || !weight || !age || !ratio) {
          return (result.textContent = '____');
        }
        if (gender == 0) {
          return (result.textContent = Math.round(
            (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) * ratio
          ));
        }
        return (result.textContent = Math.round(
          (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) * ratio
        ));
      }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('gender')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcCal();
            });
        });
    }

    function getDynamicInfo(selector, max) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g) || input.value > max) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
                switch(selector) {
                    case "#height":
                        height = +input.value;
                        break;
                    case "#weight":
                        weight = +input.value;
                        break;
                    case "#age":
                        age = +input.value;
                        break;
                }
                calcCal();
            }
        });
    }
}
