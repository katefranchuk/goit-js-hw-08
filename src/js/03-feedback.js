
import localStorageService from "./localStorage";
import throttle from "lodash.throttle";

const formEl = document.querySelector('.feedback-form');
const FORM_KEY = 'feedback-form-state';

function onFormFieldInput({ target }) {
  const email = formEl.elements.email.value;
  const message = formEl.elements.message.value;

  const userData = {
    email,
    message,
  };

  localStorageService.save(FORM_KEY, userData);
}

function fillContactFormFields() {
  const userDataFromLS = localStorageService.load(FORM_KEY);
  if (userDataFromLS === null) {
    return;
  }
  for (const key in userDataFromLS) {
    formEl.elements[key].value = userDataFromLS[key];
  }
}

fillContactFormFields();

function onFormSubmit(event) {
  event.preventDefault();
  console.log(localStorageService.load(FORM_KEY));

  formEl.reset();
  localStorageService.remove(FORM_KEY);
}

formEl.addEventListener('input', throttle(onFormFieldInput, 500));
formEl.addEventListener('submit', onFormSubmit);

