import './redactorEditor.scss';
import answers from '@/json/answer.json';
import { eventEmitter } from '@/services/eventEmitter/EventEmitter';
import { gameModel } from '@/models/GameModel';
import { BaseComponent } from '@/components/baseComponent/BaseComponent';
import { Textarea } from '@/components/textarea/textarea';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import { EventName } from '@/enums/EventName';

export class RedactorEditor extends BaseComponent {
  public readonly textarea: Textarea;
  private readonly view: BaseComponent;
  private code: string = '';
  private readonly validate: () => void;

  constructor(validate: () => void, parent?: HTMLElement) {
    super({ className: [`redactor-editor`], parent });
    this.textarea = new Textarea({
      className: ['redactor-editor-textarea'],
      placeholder: 'Type in a CSS selector',
      parent: this.element,
    });
    this.highlightIfEmpty();
    this.view = new BaseComponent({
      tag: 'div',
      className: ['redactor-editor-view'],
      parent: this.element,
    });
    this.validate = validate;
    this.view.stylize('padding', '0');
    this.textarea.addEvent('input', this.onInput);
    hljs.registerLanguage('css', css);
    eventEmitter.on(EventName.hint, this.writeHint);
    gameModel.level.subscribe(this.clearValue);
  }

  private setCode(code: string): void {
    this.code = code;
  }

  private isEmpty(): boolean {
    return this.textarea.getValue() === '';
  }

  private highlightIfEmpty(): void {
    if (this.isEmpty()) {
      this.textarea.addClass('empty');
    } else {
      this.textarea.removeClass('empty');
    }
  }

  private onInput = (): void => {
    this.highlightIfEmpty();
    this.setCode(this.textarea.getValue());
    this.view.setInnerHTML(hljs.highlight(this.code, { language: 'css' }).value);
    this.changeHeightOfTextContentOnInput();
  };

  private writeHint = (): void => {
    this.textarea.clearValue();
    const hint = answers[gameModel.getLevel()];
    let output = '';
    let index = 0;

    const text = (): void => {
      const interval = setTimeout(() => {
        output += hint[index];
        this.textarea.setValue(output);
        this.onInput();
        this.textarea.getNode().focus();

        if (++index >= hint.length) {
          clearTimeout(interval);
          gameModel.addHintLevel();
          this.validate();
          return;
        }

        text();
      }, 50);
    };

    text();
  };

  public getValue(): string {
    return this.textarea.getValue();
  }

  public clearValue = (): void => {
    this.textarea.clearValue();
    this.onInput();
  };

  private changeHeightOfTextContentOnInput = (): void => {
    const viewHeight = this.view.getNode().clientHeight;
    if (viewHeight) {
      this.textarea.stylize('height', `${this.view.getNode().clientHeight + 4}px`);
    }
  };
}
