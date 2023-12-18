/* Функции показа/скрытия ошибок валидации */

function showError(input, errorMessage, validationConfig) {
  const errorElement = input
    .closest(validationConfig.formSelector)
    .querySelector(`.popup__input_type_error-${input.name}`);

  input.classList.add(validationConfig.inputErrorClass);

  errorElement.textContent = errorMessage;
}

function hideError(input, validationConfig) {
  const errorElement = input
    .closest(validationConfig.formSelector)
    .querySelector(`.popup__input_type_error-${input.name}`);

  input.classList.remove(validationConfig.inputErrorClass);

  errorElement.textContent = "";
}

/* Проверка валидации полей ввода */

function checkInputValidity(input, validationConfig) {
  if (input.validity.valueMissing) {
    showError(input, "Это обязательное поле", validationConfig);

    return false;
  }

  if (input.validity.patternMismatch)
    input.setCustomValidity(input.dataset.error);
  else input.setCustomValidity("");

  if (input.validity.valid) hideError(input, validationConfig);
  else showError(input, input.validationMessage, validationConfig);

  return true;
}

/* Обработчик события для валидации */

function setEventListeners(form, validationConfig) {
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  form.addEventListener("input", (evt) => {
    const input = evt.target;
    const isFormValid = form.checkValidity();

    checkInputValidity(input, validationConfig);
    toggleButtonState(isFormValid, submitButton, validationConfig);
  });

  form.addEventListener("reset", () => clearValidation(form));
}

/* Подключение валидации к формам */

function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);

  forms.forEach((form) => setEventListeners(form, validationConfig));
}

/* Переключение кнопки в попапах */

function toggleButtonState(isValid, button, validationConfig) {
  if (isValid) {
    button.removeAttribute("disabled");
    button.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  }
}

/* Сбросить валидацию */

function clearValidation(form, validationConfig) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  inputs.forEach((input) => hideError(input, validationConfig));

  toggleButtonState(false, submitButton, validationConfig);
}

export { enableValidation, clearValidation };
