import { BaseComponent } from '../BaseComponent';
import { RedactorHeader } from '../redactor/redactorHeader/RedactorHeader';
import { RedactorRows } from '../redactor/redactorRows/RedactorRows';

export class Editor extends BaseComponent {
  constructor() {
    super({ className: ['editor'] });
    const editorHeader = new RedactorHeader({
      title: 'CSS Editor',
      fileName: 'style.css',
    });
    const editorBody = new BaseComponent({ className: ['editor-body'] });
    const editorRows = new RedactorRows(20);
    this.insertChild(editorHeader.getNode(), editorBody.getNode());
  }
}
