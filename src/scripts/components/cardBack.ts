import { el, mount } from "redom";

interface CardBackElements {
  inputCVV: HTMLInputElement,
  cardBack: HTMLElement
}

export function createCardBack(): CardBackElements {
  const inputCVV = el("input.input-cvv", {
    type: "text",
    placeholder: "CVC/CVV",
    required: true,
  }) as HTMLInputElement;

  const cardBack = el("form.card-back", [
    inputCVV
  ]) as HTMLElement;

  return {
    inputCVV,
    cardBack
  }
}
