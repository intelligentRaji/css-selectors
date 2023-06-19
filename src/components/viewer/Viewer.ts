import './viewer.scss';
import { BaseComponent } from '../BaseComponent';
import { RedactorHeader } from '../redactor/redactorHeader/RedactorHeader';
import { RedactorRows } from '../redactor/redactorRows/RedactorRows';
import { RedactorViewer } from '../redactor/redactorViewer/RedactorViewer';

export class Viewer extends BaseComponent {
  public readonly viewer: RedactorViewer;

  constructor() {
    super({ className: ['viewer'] });
    const header = new RedactorHeader({
      title: 'HTML Viewer',
      fileName: 'table.html',
    });
    const body = new BaseComponent({ className: ['viewer-body'] });
    const rows = new RedactorRows(20);
    this.viewer = new RedactorViewer();
    body.insertChild(rows.getNode(), this.viewer.getNode());
    this.insertChild(header.getNode(), body.getNode());
  }
}
