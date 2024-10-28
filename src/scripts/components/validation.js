import cardValidator from "card-validator";
import { getInputValue, inputNumber, inputDate, inputEmail, inputCVV, payButton } from "../main.js";

function validateCardNumber(cardNumber) {
  const cardValue = cardValidator.number(cardNumber);
  return cardValue.isValid;
}

function validateDate(date) {
  const dateValue = cardValidator.expirationDate(inputDate.value);
  return dateValue.isValid;
}

function validateCvc(cvc) {
  const cvcValue = cardValidator.cvv(cvc);
  return cvcValue.isValid;
}

function validateEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const isValid = emailRegex.test(email);
  return isValid;
}

export function switchPayBtn() {
  const isNumberValid = validateCardNumber(getInputValue(inputNumber));
  const isDateValid = validateDate(getInputValue(inputDate));
  const isCvvValue = validateCvc(getInputValue(inputCVV));
  const isEmailValid = validateEmail(inputEmail.value);

  payButton.disabled = !(
    isNumberValid &&
    isDateValid &&
    isCvvValue &&
    isEmailValid
  );
}
