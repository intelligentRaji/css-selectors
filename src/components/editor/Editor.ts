import './editor.scss';
import { eventEmitter } from '@/services/EventEmitter';
import { EventName } from '@/enums/EventName';
import { gameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';
import { RedactorEditor } from '../redactor/redactorEditor/RedactorEditor';
import { RedactorHeader } from '../redactor/redactorHeader/RedactorHeader';
import { RedactorRows } from '../redactor/redactorRows/RedactorRows';
import { ButtonComponent } from '../button/ButtonComponent';

export class Editor extends BaseComponent {
  private readonly redactor: RedactorEditor;
  private readonly button: ButtonComponent;

  constructor() {
    super({ className: ['editor'] });
    const editorHeader = new RedactorHeader({
      title: 'CSS Editor',
      fileName: 'style.css',
    });
    const editorBody = new BaseComponent({ className: ['editor-body'] });
    const editorRows = new RedactorRows(20);
    const redactorBody = new BaseComponent({ className: ['redactor-body'] });
    const bodyText = new BaseComponent({ tag: 'p', className: ['comment'] });
    bodyText.setInnerHTML(
      '{<br>' +
        '/* Styles would go here. */<br>' +
        '}<br><br>' +
        '/*<br>Type a number to skip to a level.<br>' +
        'Ex → "5" for level 5<br>*/'
    );
    this.redactor = new RedactorEditor(this.validate, editorBody.getNode());
    this.redactor.input.addEvent('change', this.validate);
    this.button = new ButtonComponent({
      className: ['editor-button'],
      text: 'enter',
      callback: this.validate,
    });
    redactorBody.insertChild(this.redactor.getNode(), bodyText.getNode());
    editorBody.insertChild(
      editorRows.getNode(),
      redactorBody.getNode(),
      this.button.getNode()
    );
    this.insertChild(editorHeader.getNode(), editorBody.getNode());
  }

  private getSelectedElements(value: string): NodeList {
    try {
      return document.querySelectorAll(`.table ${value}:not(.table-edge)`);
    } catch (err) {
      return document.querySelectorAll(`.table ${'z'}:not(.table-edge)`);
    }
  }

  private validate = (): void => {
    const value = this.redactor.getValue();
    if (Number(value) <= gameModel.getLevelsExist() && Number(value) >= 1) {
      gameModel.setLevel(Number(value) - 1);
      return;
    }
    eventEmitter.emit(EventName.validate, this.getSelectedElements(value));
  };
}
