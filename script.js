const form = document.querySelector('.form');
const floor = document.querySelector('.floor');
const floorsInput = document.querySelector('.floors-input');
const liftsInput = document.querySelector('.lifts-input');
const floorsContainer = document.querySelector('.floors-container');
const lifts = document.querySelector('.lifts');
const floorsErrorMessage = document.querySelector('.floors-input + small');
const liftsErrorMessage = document.querySelector('.lifts-input + small');

let floors = [];

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
  console.log(floorsInput.value);
  console.log(typeof liftsInput.value);
  console.log(floorsContainer);
}

function handleFloors() {
  const numberOfFloors = parseInt(floorsInput.value);

  const liftHtml = `
    <div class="floor">
      <div class="lift-buttons">
        <button class="btn-up">
          <i class="fa-solid fa-arrow-up"></i>
        </button>
        <button class="btn-down">
          <i class="fa-solid fa-arrow-down"></i>
        </button>
      </div>
    </div>
  `;

  for (let i = 0; i < numberOfFloors; i++) {
    floorsContainer.insertAdjacentHTML('beforeend', liftHtml);
  }
}

function handleLifts() {
  const numberOfLifts = parseInt(liftsInput.value);
  floors = Array(numberOfLifts).fill(0);

  floorsContainer.style.display = 'block';

  for (let i = 0; i < numberOfLifts; i++) {
    const lifts = document.createElement('div');
    lifts.classList.add('lifts');
    const lift = document.createElement('div');
    lift.classList.add('lift');
    floor.appendChild(lifts);
    lifts.appendChild(lift);
  }
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

form.addEventListener('submit', handleSubmit);
