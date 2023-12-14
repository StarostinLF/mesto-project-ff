function showError(input, errorMessage) {
  const errorElement = input
    .closest(".popup__form")
    .querySelector(`[data-error="${input.name}"]`);

  errorElement.textContent = errorMessage;
}

function hideError(input) {
  const errorElement = input
    .closest(".popup__form")
    .querySelector(`[data-error="${input.name}"]`);

  errorElement.textContent = "";
}

function checkInputValidity(input) {
  if (input.validity.valueMissing) {
    showError(input, "Это обязательное поле");
    input.classList.add("popup__input_border-is-red");

    return false;
  }

  if (input.validity.patternMismatch) {
    showError(input, input.title);
    input.classList.add("popup__input_border-is-red");

    return false;
  }

  hideError(input);
  input.classList.remove("popup__input_border-is-red");

  return true;
}

function setEventListeners(form) {
  form.addEventListener("input", (evt) => {
    const input = evt.target;
    const isFormValid = form.checkValidity();
    const submitButton = form.querySelector(".popup__button");

    checkInputValidity(input);
    toggleButtonState(isFormValid, submitButton);
  });

  form.addEventListener("reset", function () {
    const inputs = form.querySelectorAll(".popup__input");
    const submitButton = form.querySelector(".popup__button");

    inputs.forEach((input) => hideError(input));

    toggleButtonState(false, submitButton);
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => setEventListeners(form));
}

function toggleButtonState(isValid, button) {
  if (isValid) {
    button.removeAttribute("disabled");
    button.classList.remove("popup__button_disabled");
  } else {
    button.setAttribute("disabled", true);
    button.classList.add("popup__button_disabled");
  }
}

function clearValidation(form) {
  const inputs = form.querySelectorAll(".popup__input");
  const submitButton = form.querySelector(".popup__button");

  inputs.forEach((input) => hideError(input));

  toggleButtonState(false, submitButton);
}

export { enableValidation, clearValidation };
