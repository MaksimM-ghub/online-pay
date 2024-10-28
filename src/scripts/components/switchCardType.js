import { el, setChildren } from "redom";

import visa from "../../images/visa-logo.svg";
import mastercard from "../../images/mastercard-logo.svg";
import mir from "../../images/mir-logo.svg";

export function switchCardType(cardType, imgContainer) {
  setChildren(imgContainer, []); // Очистка контейнера

  let imgSrc;
  switch(cardType) {
    case 'mir':
      imgSrc = mir;
      break;
    case 'visa':
      imgSrc = visa;
      break;
    case 'mastercard':
      imgSrc = mastercard;
      break;
    default:
      return;
  }

  const imgPay = el('img.img-pay', {
    src: imgSrc,
    alt: 'Платежная система ${cardType}'
  });

  setChildren(imgContainer, [imgPay]);
}
