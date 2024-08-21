//открытие модального окна
export function openModal(elem) {
    elem.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEscape);
    document.querySelectorAll('.popup').forEach((ovl) => {
        ovl.addEventListener('click', closeByOverlay);
        }
    );
    document.querySelectorAll('.popup__form').forEach((input) => {
        input.reset();
    });
};

//закрытие модального окна
export function closeModal() {
  document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEscape);
};

//закрытие по Esc
function closeModalEscape(evt) {
    if (evt.key === 'Escape') {
        closeModal();
    }
};

//закрытие по оверлею
 function closeByOverlay (evt) {
    if (evt.target === evt.currentTarget) {
        closeModal();
    }
};















