import { CustomTags } from '@/types/customTags';

export interface BaseObject {
  tag?: keyof HTMLElementTagNameMap | CustomTags;
  parent?: HTMLElement;
  className?: string[];
  text?: string;
  type?: string;
  id?: string;
}

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  public readonly element: T;

  constructor({ tag = 'div', parent, className = [], text = '', id }: BaseObject) {
    this.element = document.createElement(tag) as T;
    this.element.classList.add(...className);
    if (parent) {
      parent.append(this.element);
    }
    if (id) {
      this.element.id = id;
    }
    this.element.textContent = text;
  }

  public getNode(): T {
    return this.element;
  }

  public addClass(...classes: string[]): void {
    this.element.classList.add(...classes);
  }

  public removeClass(...classes: string[]): void {
    this.element.classList.remove(...classes);
  }

  public getClassName(): string {
    return this.element.className;
  }

  public addData(name: string, data: string): void {
    this.element.setAttribute(`data-${name}`, data);
  }

  public setTextContent(text: string): void {
    this.element.textContent = text;
  }

  public setInnerHTML(value: string): void {
    this.element.innerHTML = value;
  }

  public setAttribute(atribute: string, value: string): void {
    this.element.setAttribute(atribute, value);
  }

  public setId(id: string): void {
    this.element.id = id;
  }

  public stylize<K extends keyof CSSStyleDeclaration>(
    prop: K,
    value: CSSStyleDeclaration[K]
  ): void {
    this.element.style[prop] = value;
  }

  public addEvent(event: string, func: (e: Event) => void): void {
    this.element.addEventListener(event, func);
  }

  public removeEvent(event: string, func: (e: Event) => void): void {
    this.element.removeEventListener(event, func);
  }

  public destroy(): void {
    this.element.remove();
  }

  public insertChild(...childs: HTMLElement[]): void {
    childs.forEach((node) => {
      this.element.append(node);
    });
  }

  public removeChildren(fromChildPostion = 0): void {
    while (this.element.children[fromChildPostion]) {
      this.element.children[fromChildPostion].remove();
    }
  }
}
