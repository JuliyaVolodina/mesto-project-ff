
// настройки валидации
export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// добавляем класс с ошибкой и выводим ошибку
function showInputError(form, element, config) {
    element.classList.add(config.inputErrorClass);
    const errorElement = form.querySelector(`.${element.id}-error`);
    errorElement.classList.add(config.errorClass);
    if (element.validity.patternMismatch) {
        const customError = element.getAttribute('data-error');
        element.setCustomValidity(customError);
        errorElement.textContent = customError;
    } else {
        element.setCustomValidity('');
        errorElement.textContent = element.validationMessage;
    }
};

// удаляем класс с ошибкой и текст ошибки
function hideInputError(form, element, config) {
    const errorElement = form.querySelector(`.${element.id}-error`);
    element.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

// Функция валидности для добавления/удаления ошибки
function checkInputValidity(form, element) {
    if (!element.validity.valid) {
       showInputError(form, element, config);
    } else {
       hideInputError(form, element, config);
    }
};

//функция валидности на каждый ввод символа
function setEventListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((element) => {
        element.addEventListener('input', function () {
            checkInputValidity(form, element);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

//функция проверки наличия невалидности полей
const hasInvalidInput = (inputList) => {                          
    return inputList.some((inputElement) => {                     
    return !inputElement.validity.valid;                            
   })
}; 
 
 //функция переключения кнопок
 const toggleButtonState = (inputList, buttonElement) => {        
        if (hasInvalidInput(inputList)) {                     
          buttonElement.disabled = true;                
          buttonElement.classList.add(config.inactiveButtonClass);     
    } else {                                                 
        buttonElement.disabled = false;                
        buttonElement.classList.remove(config.inactiveButtonClass);   
    }
};

//включить проверку 
export function enableValidation() {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((elem) => {
        setEventListeners(elem, config);
    });
};

//очистить ошибки и деактивация кнопки
export function clearValidation(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);
    inputList.forEach((element) => {
        hideInputError(form, element, config);
    });
    toggleButtonState(inputList, buttonElement, config);
}
