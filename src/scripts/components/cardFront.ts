import { el, mount } from "redom";

import sberLogo from '../../images/sber.svg'

interface CardFrontElements {
  imgContainer: HTMLElement;
  inputNumber: HTMLInputElement;
  inputDate: HTMLInputElement;
  inputEmail: HTMLInputElement;
  cardFront: HTMLElement;
};

export function createCardFront():CardFrontElements {
  const imgCompany = el('img.img-company', {
    src: sberLogo,
    alt: 'Логотип сбер'
  }) as HTMLElement;
  const nameCompany = el('p.name-company', {}, 'Сбер') as HTMLElement;
  const companyWrapper = el("div.card-company", [imgCompany, nameCompany]) as HTMLElement;

  const inputNumber = el('input.input-number', {
    type: 'text',
    placeholder: 'Введите номер карты',
    required: true
  }) as HTMLInputElement;

  const imgContainer = el('div.img-container') as HTMLElement;
  const cardNumberWrapper = el('div.card-number', [inputNumber]) as HTMLElement;

  const dateText = el('span.date-text', {}, 'Введите дату') as HTMLElement;
  const inputDate = el('input.input-date', {
    type: 'text',
    placeholder: 'ММ/ГГ',
    required: true
  }) as HTMLInputElement;
  const dateWrapper = el('div.card-date', [dateText, inputDate]) as HTMLElement;

  const inputEmail = el('input.input-email', {
    type: 'text',
    placeholder: 'mail@mail.ru',
    required: true
  }) as HTMLInputElement;
  const emailWrapper = el('div.card-email', [inputEmail]) as HTMLElement;

  const cardFront = el('form.card-front', [companyWrapper, cardNumberWrapper, dateWrapper, emailWrapper, imgContainer]) as HTMLElement;

  return {
    imgContainer,
    inputNumber,
    inputDate,
    inputEmail,
    cardFront,
  }
}
