import './editor.scss';
import { eventEmitter } from '@/services/eventEmitter/EventEmitter';
import { EventName } from '@/enums/EventName';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { RedactorEditor } from '../redactor/redactorEditor/RedactorEditor';
import { RedactorHeader } from '../redactor/redactorHeader/RedactorHeader';
import { RedactorRows } from '../redactor/redactorRows/RedactorRows';
import { ButtonComponent } from '../button/ButtonComponent';

export class Editor extends BaseComponent {
  private readonly redactor: RedactorEditor;
  private readonly button: ButtonComponent;
  private readonly rows: RedactorRows;
  private readonly text: BaseComponent;

  constructor() {
    super({ className: ['editor'] });
    const editorHeader = new RedactorHeader({
      title: 'CSS Editor',
      fileName: 'style.css',
    });
    const editorBody = new BaseComponent({ className: ['editor-body'] });
    this.rows = new RedactorRows();
    const redactorBody = new BaseComponent({ className: ['redactor-body'] });
    this.text = new BaseComponent({ tag: 'p', className: ['comment'] });
    this.setSizeOfBody();
    this.redactor = new RedactorEditor(this.validate, editorBody.getNode());
    this.redactor.input.addEvent('keydown', (e): void => {
      if (e.key === 'Enter') {
        this.validate();
      }
    });
    this.button = new ButtonComponent({
      className: ['editor-button'],
      text: 'enter',
      callback: this.validate,
    });
    redactorBody.insertChild(this.redactor.getNode(), this.text.getNode());
    editorBody.insertChild(
      this.rows.getNode(),
      redactorBody.getNode(),
      this.button.getNode()
    );
    this.insertChild(editorHeader.getNode(), editorBody.getNode());
    eventEmitter.on(EventName.resize, this.setSizeOfBody);
  }

  private validate = (): void => {
    eventEmitter.emit(EventName.validate, this.redactor.getValue());
  };

  private setSizeOfBody = (): void => {
    const media = window.matchMedia('(max-width: 850px)');
    if (media.matches) {
      this.rows.setRows(1);
      this.text.setInnerHTML('');
    } else {
      this.rows.setRows(20);
      this.text.setInnerHTML(
        '{<br>' +
          '/* Styles would go here. */<br>' +
          '}<br><br>' +
          '/*<br>Type a number to skip to a level.<br>' +
          'Ex → "5" for level 5<br>*/'
      );
    }
  };
}
