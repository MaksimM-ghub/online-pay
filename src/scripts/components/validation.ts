import cardValidator from "card-validator";
import { getInputValue, inputNumber, inputDate, inputEmail, inputCVV, payButton } from "../main";

// Функция для валидации номера карты
function validateCardNumber(cardNumber: string): boolean {
  const cardValue = cardValidator.number(cardNumber);
  return cardValue.isValid;
}

// Функция для валидации даты
function validateDate(): boolean {
  const dateValue = cardValidator.expirationDate(getInputValue(inputDate as HTMLInputElement)) ;
  return dateValue.isValid;
}

// Функция для валидации CVC
function validateCvc(cvc: string): boolean {
  const cvcValue = cardValidator.cvv(cvc);
  return cvcValue.isValid;
}

// Функция для валидации email
function validateEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

// Функция для переключения состояния кнопки отправки
export function switchPayBtn(): void {
  const isNumberValid = validateCardNumber(getInputValue(inputNumber as HTMLInputElement));
  const isDateValid = validateDate();
  const isCvvValue = validateCvc(getInputValue(inputCVV as HTMLInputElement));
  const isEmailValid = validateEmail((inputEmail as HTMLInputElement).value);

  payButton.disabled = !(isNumberValid && isDateValid && isCvvValue && isEmailValid);
}
