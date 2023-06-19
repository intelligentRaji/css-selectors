import './redactor.scss';
import { BaseComponent } from '../BaseComponent';
import { Editor } from '../editor/Editor';

export class Redactor extends BaseComponent {
  private readonly editor: BaseComponent;
  private readonly viewer: BaseComponent;

  constructor() {
    super({ className: ['redactor'] });
    this.editor = new Editor();
    this.viewer = new BaseComponent({ className: ['viewer'] });
    this.insertChild(this.editor.getNode(), this.viewer.getNode());
  }
}
