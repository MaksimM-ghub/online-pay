import { el, mount } from "redom";

export function createCardBack() {
  const inputCVV = el("input.input-cvv", {
    type: "text",
    placeholder: "CVC/CVV",
    required: true,
  });

  const cardBack = el("form.card-back", [
    inputCVV
  ]);

  return {
    inputCVV,
    cardBack
  }
}
