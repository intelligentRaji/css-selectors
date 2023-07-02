import './textarea.scss';
import { BaseComponent } from '../baseComponent/BaseComponent';

interface IInput {
  className?: string[];
  value?: string;
  placeholder?: string;
  parent?: HTMLElement;
}

export class Textarea extends BaseComponent<HTMLTextAreaElement> {
  constructor({ className = [], parent, value = '', placeholder = '' }: IInput) {
    super({ tag: 'textarea', className: [...className, 'textarea'], parent });
    this.element.setAttribute('placeholder', placeholder);
    this.setValue(value);
  }

  public setValue(value: string): void {
    this.element.value = value;
  }

  public getValue(): string {
    return this.element.value;
  }

  public clearValue = (): void => {
    this.stylize('height', '25px');
    this.element.value = '';
  };
}
