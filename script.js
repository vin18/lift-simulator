const form = document.querySelector('.form');
const floor = document.querySelector('.floor');
const floorsInput = document.querySelector('.floors-input');
const liftsInput = document.querySelector('.lifts-input');
const floorsContainer = document.querySelector('.floors-container');
const lifts = document.querySelector('.lifts');
const floorsErrorMessage = document.querySelector('.floors-input + small');
const liftsErrorMessage = document.querySelector('.lifts-input + small');

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
  event.preventDefault();
  handleFormValidation();
  handleFloors();
  handleLifts();
}

function handleFloors() {
  const numberOfFloors = 3 || parseInt(floorsInput.value);
  const numberOfLifts = 3 || parseInt(liftsInput.value);
  const lastFloor = numberOfFloors - 1;

  for (let i = lastFloor; i >= 0; i--) {
    const floorHtml = `
    <div class="floor" data-current-floor=${i}>
      <div class="lift-buttons">
        ${
          i !== lastFloor
            ? `
          <button onclick="handleLiftUpMove(${i})" class="btn-up ${i}">
            <i class="fa-solid fa-arrow-up"></i>
          </button>`
            : ''
        }
       
        ${
          i !== 0
            ? `
          <button onclick="handleLiftDownMove(${i})" class="btn-down ${i}">
            <i class="fa-solid fa-arrow-down"></i>
          </button>
        `
            : ''
        }
      </div>

      ${numberOfLifts > 1 && i === 0 ? handleLifts() : ''}
    </div>
  `;

    floorsContainer.insertAdjacentHTML('beforeend', floorHtml);
  }
}

function handleLifts() {
  const divElement = document.createElement('div');
  divElement.classList.add('lifts');
  const numberOfLifts = 3 || parseInt(liftsInput.value);

  for (let i = 0; i < numberOfLifts; i++) {
    const liftHtml = `
      <div class="lift">
        <div class="lift-left-door-container">
          <div class="lift-left-door"></div>
        </div>
        <div class="lift-right-door-container">
          <div class="lift-right-door"></div>
        </div>
      </div>
    `;

    divElement.insertAdjacentHTML('beforeend', liftHtml);
  }

  return divElement.innerHTML;
}

function handleFormValidation() {
  if (floorsInput.value.trim() === '') {
    handleError(floorsInput, floorsErrorMessage, 'Floors value is required');
  } else {
    handleSuccess(floorsInput, floorsErrorMessage);
  }

  if (liftsInput.value.trim() === '') {
    handleError(liftsInput, liftsErrorMessage, 'Lifts value is required');
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

function handleLiftDownMove(floorNumber) {
  console.log(floorNumber);
}

function handleLiftUpMove(floorNumber) {
  console.log(floorNumber);
}

handleFloors();
handleLifts();
form.addEventListener('submit', handleSubmit);
