/* Объект СSS-классов */

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

/* Функции показа/скрытия ошибок валидации */

function showError(input, errorMessage) {
  const errorElement = input
    .closest(validationConfig.formSelector)
    .querySelector(`[data-error="${input.name}"]`);

  input.classList.add(validationConfig.inputErrorClass);

  errorElement.textContent = errorMessage;
}

function hideError(input) {
  const errorElement = input
    .closest(validationConfig.formSelector)
    .querySelector(`[data-error="${input.name}"]`);

  errorElement.textContent = "";
}

/* Проверка валидации полей ввода */

function checkInputValidity(input) {
  if (input.validity.valueMissing) {
    showError(input, "Это обязательное поле");
    return false;
  }

  if (input.validity.patternMismatch) {
    showError(input, input.dataError);
    return false;
  }

  if (input.minLength > 0 && input.value.length < input.minLength) {
    showError(input, `Минимальная длина: ${input.minLength} символов`);
    return false;
  }

  hideError(input);
  input.classList.remove(validationConfig.inputErrorClass);

  return true;
}

/* Обработчик события для валидации */

function setEventListeners(form) {
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  form.addEventListener("input", (evt) => {
    const input = evt.target;
    const isFormValid = form.checkValidity();

    checkInputValidity(input);
    toggleButtonState(isFormValid, submitButton);
  });

  form.addEventListener("reset", function () {
    clearValidation(form);
  });
}

/* Подключение валидации к формам */

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => setEventListeners(form));
}

/* Переключение кнопки в попапах */

function toggleButtonState(isValid, button) {
  if (isValid) {
    button.removeAttribute("disabled");
    button.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  }
}

/* Сбросить валидацию */

function clearValidation(form) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  inputs.forEach((input) => hideError(input));

  toggleButtonState(false, submitButton);
}

export { enableValidation, clearValidation, validationConfig };
