import './button.scss';
import { BaseComponent } from '../BaseComponent';

interface IButtonComponent {
  parent?: HTMLElement;
  className: string[];
  callback?: (e: Event) => void;
  text?: string;
}

export class ButtonComponent extends BaseComponent {
  constructor({ parent, className, callback, text }: IButtonComponent) {
    super({ tag: 'button', className: ['button', ...className], parent, text });
    if (callback) {
      this.addEvent('click', callback);
    }
  }
}
