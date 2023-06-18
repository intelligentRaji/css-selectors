import { BaseComponent } from '../BaseComponent';

interface ITextarea {
  className: string;
  parent?: HTMLElement;
  placeholder?: string;
  value?: string;
}

export class Textarea extends BaseComponent<HTMLTextAreaElement> {
  constructor({ className, parent, value = '', placeholder = '' }: ITextarea) {
    super({ tag: 'textarea', className: [className, 'textarea'], parent });
    this.setValue(value);
    this.setPlaceholder(placeholder);
  }

  public setValue(value: string): void {
    this.element.value = value;
  }

  public setPlaceholder(value: string): void {
    this.element.placeholder = value;
  }

  public clear(): void {
    this.element.value = '';
  }
}
