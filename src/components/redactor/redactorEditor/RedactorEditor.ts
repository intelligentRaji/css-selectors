import './redactorEditor.scss';
import { BaseComponent } from '@/components/BaseComponent';
import { Input } from '@/components/input/Input';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import 'highlight.js/styles/a11y-light.css';

export class RedactorEditor extends BaseComponent {
  public readonly input: Input;
  private readonly view: BaseComponent;
  private code: string = '';

  constructor(parent?: HTMLElement) {
    super({ className: [`redactor-editor`], parent });
    this.input = new Input({
      className: ['redactor-editor-input'],
      placeholder: 'Type in a CSS selector',
      parent: this.element,
    });
    this.highlightIfEmpty();
    this.view = new BaseComponent({
      tag: 'code',
      className: ['redactor-editor-view'],
      parent: this.element,
    });
    this.view.stylize('padding', '0');
    this.input.addEvent('input', this.onInput);
    hljs.registerLanguage('css', css);
  }

  private setCode(code: string): void {
    this.code = code;
  }

  private isEmpty(): boolean {
    return this.input.getValue() === '';
  }

  private highlightIfEmpty(): void {
    if (this.isEmpty()) {
      this.input.addClass('empty');
    } else {
      this.input.removeClass('empty');
    }
  }

  private onInput = (): void => {
    this.highlightIfEmpty();
    this.setCode(this.input.getValue());
    this.view.setInnerHTML(hljs.highlight(this.code, { language: 'css' }).value);
  };
}
