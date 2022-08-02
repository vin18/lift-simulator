const form = document.querySelector('.form');
const floor = document.querySelector('.floor');
const floorsInput = document.querySelector('.floors-input');
const liftsInput = document.querySelector('.lifts-input');
const floorsContainer = document.querySelector('.floors-container');
const lifts = document.querySelector('.lifts');
const lift = document.querySelector('.lift');
const floorsErrorMessage = document.querySelector('.floors-input + small');
const liftsErrorMessage = document.querySelector('.lifts-input + small');

let currentFloorCalled = 0;

function handleNumericKeyPress(event) {
  const inputValidationChecks =
    !/[0-9]/.test(event.key) ||
    event.charCode === 8 ||
    event.charCode === 0 ||
    event.charCode === 13;

  if (inputValidationChecks) {
    event.preventDefault();
  }
}

function handleSubmit(event) {
  event?.preventDefault();
  floorsContainer.innerHTML = '';
  handleFormValidation();
  handleFloors();
  handleLifts();
}

function handleFloors() {
  const numberOfFloors = parseInt(floorsInput.value);
  const numberOfLifts = parseInt(liftsInput.value);
  const lastFloor = numberOfFloors === 1 ? 1 : numberOfFloors - 1;

  for (let i = lastFloor; i >= 0; i--) {
    const floorHtml = `
    <div class="floor" data-current-floor=${i}>
      <div class="lift-buttons">
        ${
          i !== 0
            ? `
          <button data-current-floor="${i}" data-move-up="true" class="btn-up btn-up-${i}">
            <i data-current-floor="${i}" data-move-up="true" class="fa-solid fa-arrow-up"></i>
          </button>`
            : ''
        }

        ${
          i !== lastFloor
            ? `
          <button data-current-floor="${i}" data-move-down="true" class="btn-down btn-down-${i}">
            <i data-current-floor="${i}" data-move-down="true" class="fa-solid fa-arrow-down"></i>
          </button>
        `
            : ''
        }
      </div>

      <div class="lifts">
        ${numberOfLifts >= 1 && i === 0 ? handleLifts() : ''}
      </div>
    </div>
  `;

    floorsContainer.insertAdjacentHTML('beforeend', floorHtml);
  }
}

function handleLifts() {
  const numberOfLifts = parseInt(liftsInput.value);

  let innerHTML = '';
  for (let i = 0; i < numberOfLifts; i++) {
    innerHTML += `
      <div class="lift" data-current-floor=${0}>
        <div class="lift-left-door-container">
          <div class="lift-left-door"></div>
        </div>
        <div class="lift-right-door-container">
          <div class="lift-right-door"></div>
        </div>
      </div>
    `;
  }
  return innerHTML;
}

function handleFormValidation() {
  if (floorsInput.value.trim() === '') {
    handleError(floorsInput, floorsErrorMessage, 'Floors value is required');
  } else if (floorsInput.value > 5) {
    alert('Please enter maximum 5 floors');
  } else {
    handleSuccess(floorsInput, floorsErrorMessage);
  }

  if (liftsInput.value.trim() === '') {
    handleError(liftsInput, liftsErrorMessage, 'Lifts value is required');
  } else if (liftsInput.value > 5) {
    alert('Please enter maximum 5 lifts');
  } else {
    handleSuccess(liftsInput, liftsErrorMessage);
  }
}

function handleSuccess(element, errorElement) {
  element.parentElement.classList.add('success');
  element.parentElement.classList.remove('error');
  errorElement.style.display = 'none';
}

function handleError(element, errorElement, errorMessage = '') {
  element.parentElement.classList.add('error');
  element.parentElement.classList.remove('success');
  errorElement.textContent = errorMessage;
  errorElement.style.display = 'block';
}

document.addEventListener('click', function (event) {
  const element = event.target;
  const floorClicked = Number(element.dataset.currentFloor);
  const liftMoveUp = element.dataset.moveUp === 'true';
  const liftMoveDown = element.dataset.moveDown === 'true';

  if (liftMoveUp) {
    const lifts = Array.from(document.getElementsByClassName('lift'));
    for (let i = 0; i < lifts.length; i++) {
      const lift = lifts[i];
      const currentFloor = Number(lift.dataset.currentFloor);
      if (currentFloor < floorClicked && currentFloor !== floorClicked) {
        lift.style.transition = `all ${2 * floorClicked}s`;
        lift.style.transform = `translateY(-${250 * floorClicked}px)`;
        lift.dataset.currentFloor = floorClicked;

        setTimeout(() => {
          lift.children[0].children[0].classList.add(
            'lift-left-door-open-close'
          );
          lift.children[1].children[0].classList.add(
            'lift-right-door-open-close'
          );
        }, 2000);

        setTimeout(() => {
          lift.children[0].children[0].classList.remove(
            'lift-left-door-open-close'
          );
          lift.children[1].children[0].classList.remove(
            'lift-right-door-open-close'
          );
        }, 7000);

        break;
      } else if (currentFloor === floorClicked) {
        if (lift.dataset.busy === 'true') {
          continue;
        }
        lift.children[0].children[0].classList.add('lift-left-door-open-close');
        lift.children[1].children[0].classList.add(
          'lift-right-door-open-close'
        );
        lift.dataset.busy = true;

        setTimeout(() => {
          lift.children[0].children[0].classList.remove(
            'lift-left-door-open-close'
          );
          lift.children[1].children[0].classList.remove(
            'lift-right-door-open-close'
          );
          lift.dataset.busy = false;
        }, 5000);
        break;
      }
    }
  } else if (liftMoveDown) {
    const lifts = Array.from(document.getElementsByClassName('lift'));
    for (let i = 0; i < lifts.length; i++) {
      const lift = lifts[i];
      const currentFloor = Number(lift.dataset.currentFloor);

      if (currentFloor > floorClicked && currentFloor !== floorClicked) {
        if (floorClicked !== 0) {
          lift.style.transform = `translateY(-${250 * floorClicked - 1}px)`;
          lift.style.transition = `all ${2 * floorClicked}s`;
        } else {
          lift.style.transform = `translateY(0px)`;
          lift.style.transition = `all ${2}s`;
        }
        lift.dataset.currentFloor = floorClicked;

        setTimeout(() => {
          lift.children[0].children[0].classList.add(
            'lift-left-door-open-close'
          );
          lift.children[1].children[0].classList.add(
            'lift-right-door-open-close'
          );
        }, 2000);

        setTimeout(() => {
          lift.children[0].children[0].classList.remove(
            'lift-left-door-open-close'
          );
          lift.children[1].children[0].classList.remove(
            'lift-right-door-open-close'
          );
        }, 7000);

        break;
      } else if (currentFloor === floorClicked) {
        if (lift.dataset.busy === 'true') {
          continue;
        }
        lift.children[0].children[0].classList.add('lift-left-door-open-close');
        lift.children[1].children[0].classList.add(
          'lift-right-door-open-close'
        );
        lift.dataset.busy = true;

        setTimeout(() => {
          lift.children[0].children[0].classList.remove(
            'lift-left-door-open-close'
          );
          lift.children[1].children[0].classList.remove(
            'lift-right-door-open-close'
          );
          lift.dataset.busy = false;
        }, 5000);
        break;
      }
    }
  }
});

form.addEventListener('submit', handleSubmit);
