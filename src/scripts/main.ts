import "../index.html";
import "../scss/main.scss";

import { createCardBack } from "./components/cardBack";
import { createCardFront } from "./components/cardFront";
import { iconValid, iconInValid } from "./components/svg-icon";
import { switchCardType } from "./components/switchCardType";
import { switchPayBtn } from "./components/validation";

import { el, mount } from "redom";
import Inputmask from "inputmask";
import cardValidator from "card-validator";

function isSVGElement(element: SVGElement | null): element is SVGAElement {
  return element instanceof SVGElement
}

export const { imgContainer, inputNumber, inputDate, inputEmail, cardFront } =
  createCardFront();

export const { inputCVV, cardBack } = createCardBack();

const title = el("h1.title", {}, "Форма для онлайн оплаты") as HTMLElement;

export const payButton = el(
  "button.pay-btn",
  { disabled: true },
  "Отправить"
) as HTMLButtonElement;

const app = el("div.app-wrapper", [title, cardFront, cardBack, payButton]) as HTMLButtonElement;
const container = el("div.container", app) as HTMLButtonElement;

mount(document.body, container);

// Применяем маски
Inputmask("9999 9999 9999 9999 [99]").mask(inputNumber as HTMLInputElement);
Inputmask("99/99").mask(inputDate as HTMLInputElement);
Inputmask("999").mask(inputCVV as HTMLInputElement);

// Обработка ввода
const arrInputNumner: HTMLInputElement[] = [inputNumber, inputDate, inputCVV];

arrInputNumner.forEach((input) => {
  input.addEventListener("input", () => {
    (input as HTMLInputElement).value = (input as HTMLInputElement).value.replace(/\D/g, "");
  });
});

// Проверка Email
inputEmail.addEventListener("blur", () => {
  const emailValue: string = (inputEmail as HTMLInputElement).value;
  const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailWrapper = document.querySelector(".card-email");

  if (emailWrapper instanceof HTMLElement) {
    const svgIcon = emailWrapper.querySelector("svg");
    if (isSVGElement(svgIcon)) {
      svgIcon.remove();
  }
  }

  if (regex.test(emailValue)) {
    inputEmail.classList.remove('error');
    emailWrapper?.insertAdjacentHTML("beforeend", iconValid);
  } else {
    inputEmail.classList.add('error');
    emailWrapper?.insertAdjacentHTML("beforeend", iconInValid);
  }

  switchPayBtn();
});

// Валидация номера карты
inputNumber.addEventListener("input", () => {
  const numberValue: string = getInputValue(inputNumber as HTMLInputElement);
  const numberValidation = cardValidator.number(numberValue);

  if (numberValidation.card && numberValidation.card.type) {
    switchCardType(numberValidation.card.type.toLowerCase(), imgContainer);
  } else {
    switchCardType("", imgContainer);
  }
});

// Получение значения поля
export function getInputValue(input: HTMLInputElement): string {
  return input.value.replace(/\D/g, "");
}

// Валидация номера карты при потере фокуса
inputNumber.addEventListener("blur", () => {
  const numberValue: string = getInputValue(inputNumber as HTMLInputElement);
  const numberValidation = cardValidator.number(numberValue);

  if (numberValidation.isValid) {
    inputNumber.classList.remove('error');
  } else {
    inputNumber.classList.add('error');
  }

  switchPayBtn();
});

// Валидация даты
inputDate.addEventListener("blur", () => {
  const dateValue: string = getInputValue(inputDate as HTMLInputElement);
  const formattedDate: string = dateValue.slice(0, 2) + "/" + dateValue.slice(2);
  const dateValidation = cardValidator.expirationDate(formattedDate);

  if (dateValidation.isValid) {
    inputDate.classList.remove('error');
  } else {
    inputDate.classList.add('error');
  }

  switchPayBtn();
});

// Валидация CVV
inputCVV.addEventListener("blur", () => {
  const cvvValue: string = getInputValue(inputCVV);
  const cvvValidation = cardValidator.cvv(cvvValue);

  if (cvvValidation.isValid) {
    inputCVV.classList.remove('error');
  } else {
    inputCVV.classList.add('error');
  }

  switchPayBtn();
});
