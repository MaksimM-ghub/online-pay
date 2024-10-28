import "../index.html";
import "../scss/main.scss";
import { createCardBack } from "./components/cardBack.js";
import { createCardFront } from "./components/cardFront.js";
import { iconValid, iconInValid } from "./components/svg-icon.js";
import { switchCardType } from "./components/switchCardType.js";
import { switchPayBtn } from "./components/validation.js";

import { el, mount } from "redom";
import Inputmask from "inputmask";
import cardValidator from "card-validator";

export const { imgContainer, inputNumber, inputDate, inputEmail, cardFront } =
  createCardFront();
export const { inputCVV, cardBack } = createCardBack();

const title = el("h1.title", "Форма для онлайн оплаты");

export const payButton = el(
  "button.pay-btn",
  {
    disabled: true,
  },
  "Отправить"
);

const app = el("div.app-wrapper", [title, cardFront, cardBack, payButton]);
const container = el("div.container", app);

mount(document.body, container);

Inputmask("9999 9999 9999 9999 [99]").mask(inputNumber);
Inputmask("99/99").mask(inputDate);
Inputmask("999").mask(inputCVV);


const arrInputNumner = [inputNumber, inputDate, inputCVV];

arrInputNumner.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });
});

inputEmail.addEventListener("blur", () => {
  const emailValue = inputEmail.value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailWrapper = document.querySelector(".card-email");

  const svgIcon = document.querySelector(".card-email svg");

  if (svgIcon) {
    svgIcon.remove();
  }

  if (regex.test(emailValue)) {
    inputEmail.classList.remove('error');
    emailWrapper.insertAdjacentHTML("beforeend", iconValid);
  } else {
    inputEmail.classList.add('error');
    emailWrapper.insertAdjacentHTML("beforeend", iconInValid);
  }

  switchPayBtn();
});

inputNumber.addEventListener("input", () => {
  const numberValue = getInputValue(inputNumber);
  const numberValidation = cardValidator.number(numberValue);

  if (numberValidation.card && numberValidation.card.type) {
    switchCardType(
      numberValidation.card.type.toLocaleLowerCase(),
      imgContainer
    );
  } else {
    switchCardType("", imgContainer);
  }
});

export function getInputValue(input) {
  return input.value.replace(/\D/g, "");
}

inputNumber.addEventListener("blur", () => {
  switchPayBtn();
  const numberValue = getInputValue(inputNumber);
  const numberValidation = cardValidator.number(numberValue);
  
  if (numberValidation.isValid) {
    inputNumber.classList.remove('error');
  } else {
    inputNumber.classList.add('error');
  }
});

inputDate.addEventListener("blur", () => {
  const dateValue = getInputValue(inputDate);
    const formattedDate = dateValue.slice(0, 2) + "/" + dateValue.slice(2);
    const dateValidation = cardValidator.expirationDate(formattedDate);

    if (dateValidation.isValid) {
      inputDate.classList.remove('error');
    } else {
      inputDate.classList.add('error');
    }
});

inputCVV.addEventListener("blur", () => {
  const cvvValue = getInputValue(inputCVV);
  const cvvValidation = cardValidator.cvv(cvvValue);

  if (cvvValidation.isValid) {
    inputCVV.classList.remove('error');
  } else {
    inputCVV.classList.add('error');
  }
});
