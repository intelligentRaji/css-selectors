import { BaseComponent } from '../BaseComponent';
import { Input } from '../input/Input';
import { RedactorEditor } from '../redactor/redactorEditor/RedactorBody';
import { RedactorHeader } from '../redactor/redactorHeader/RedactorHeader';
import { RedactorRows } from '../redactor/redactorRows/RedactorRows';

export class Editor extends BaseComponent {
  private readonly redactor: RedactorEditor;

  constructor() {
    super({ className: ['editor'] });
    const editorHeader = new RedactorHeader({
      title: 'CSS Editor',
      fileName: 'style.css',
    });
    const editorBody = new BaseComponent({ className: ['editor-body'] });
    const editorRows = new RedactorRows(20);
    this.redactor = new Input({
      className: ['editor-redactor'],
      placeholder: 'Type in a CSS selector',
    });
    editorBody.insertChild(editorRows.getNode(), this.redactor.getNode());
    this.insertChild(editorHeader.getNode(), editorBody.getNode());
  }
}
