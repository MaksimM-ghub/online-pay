declare module 'redom' {
  export function el(tag: string, attributes?: { [key: string]: any }, ...children: Array<any>): Element;
  export function mount(parent: Element, child: Element): void;
  export function setChildren(parent: Element, children: Array<Element>): void;
}
