import { el, mount } from "redom";

import sberLogo from '../../images/sber.svg'

export function createCardFront() {
  const imgCompany = el('img.img-company', {
    src: sberLogo,
    alt: 'Логотип сбер'
  })
  const nameCompany = el('p.name-company', 'Сбер')
  const companyWrapper = el("div.card-company", [imgCompany, nameCompany]);

  const inputNumber = el('input.input-number', {
    type: 'text',
    placeholder: 'Введите номер карты',
    required: true
  });

  const imgContainer = el('div.img-container');
  const cardNumberWrapper = el('div.card-number', [inputNumber]);

  const dateText = el('span.date-text', 'Введите дату');
  const inputDate = el('input.input-date', {
    type: 'text',
    placeholder: 'ММ/ГГ',
    required: true
  });
  const dateWrapper = el('div.card-date', [dateText, inputDate]);

  const inputEmail = el('input.input-email', {
    type: 'text',
    placeholder: 'mail@mail.ru',
    required: true
  });
  const emailWrapper = el('div.card-email', [inputEmail]);

  const cardFront = el('form.card-front', [companyWrapper, cardNumberWrapper, dateWrapper, emailWrapper, imgContainer]);

  return {
    imgContainer,
    inputNumber,
    inputDate,
    inputEmail,
    cardFront,
  }
}
