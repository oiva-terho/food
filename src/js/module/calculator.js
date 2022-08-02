export default function calculator() {
  const result = document.querySelector('.calculating__result span');
  let gender, height, weight, age, ratio;

  calcCal();
  saveCalcData('gender', gender, 1);
  saveCalcData('ratio', ratio, 1.375);
  getStaticInfo('#gender', 'gender', gender, 'calculating__choose-item_active');
  getStaticInfo('#ratio', 'ratio', ratio, 'calculating__choose-item_active');
  getDynamicInfo('#height', 250);
  getDynamicInfo('#weight', 300);
  getDynamicInfo('#age', 125);

  function saveCalcData(attr, attrValue, defaultValue) {
    if (localStorage.getItem(attr)) {
      attrValue = localStorage.getItem(attr);
      addActive(attrValue);
    } else {
      localStorage.setItem(attr, defaultValue);
      addActive(defaultValue);
    }
    function addActive(value) {
      document
        .querySelector(`[data-${attr}="${value}"]`)
        .classList.add('calculating__choose-item_active');
    }
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

  function getStaticInfo(parent, attr, attrValue, active) {
    document.querySelector(parent).addEventListener('click', e => {
      if (e.target.getAttribute(`data-${attr}`)) {
        switch (attr) {
          case 'gender':
            gender = +e.target.getAttribute(`data-${attr}`);
            break;
          case 'ratio':
            ratio = +e.target.getAttribute(`data-${attr}`);
            break;
        }
        clearActive();
        e.target.classList.add(active);
        localStorage.setItem(attr, attrValue);
      } else {
        return;
      }
      calcCal();

      function clearActive() {
        document.querySelectorAll(`${parent} div`).forEach(e => {
          e.classList.remove(active);
        });
      }
    });
  }

  function getDynamicInfo(selector, max) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g) || input.value > max) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
        switch (selector) {
          case '#height':
            height = +input.value;
            break;
          case '#weight':
            weight = +input.value;
            break;
          case '#age':
            age = +input.value;
            break;
        }
        calcCal();
      }
    });
  }
}
