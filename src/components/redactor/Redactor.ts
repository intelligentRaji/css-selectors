import './redactor.scss';
import { BaseComponent } from '../BaseComponent';
import { Editor } from '../editor/Editor';
import { Viewer } from '../viewer/Viewer';

export class Redactor extends BaseComponent {
  private readonly editor: Editor;
  private readonly viewer: Viewer;

  constructor() {
    super({ className: ['redactor'] });
    this.editor = new Editor();
    this.viewer = new Viewer();
    this.insertChild(this.editor.getNode(), this.viewer.getNode());
  }
}
