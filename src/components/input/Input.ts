import './input.scss';
import { BaseComponent } from '../BaseComponent';

interface IInput {
  className?: string[];
  value?: string;
  placeholder?: string;
  parent?: HTMLElement;
  type?: string;
}

export class Input extends BaseComponent<HTMLInputElement> {
  constructor({
    className = [],
    parent,
    value = '',
    type = 'text',
    placeholder = '',
  }: IInput) {
    super({ tag: 'input', className: [...className, 'input'], parent });
    this.element.type = type;
    this.element.setAttribute('placeholder', placeholder);
    this.element.setAttribute('maxLength', '25');
    this.setValue(value);
  }

  public setValue(value: string): void {
    this.element.value = value;
  }

  public getValue(): string {
    return this.element.value;
  }

  public clearValue = (): void => {
    this.element.value = '';
  };
}
