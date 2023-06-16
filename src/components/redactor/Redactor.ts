import { BaseComponent } from '../BaseComponent';

export class Redactor extends BaseComponent {
  private readonly editor: BaseComponent;
  private readonly viewer: BaseComponent;

  constructor() {
    super({ className: ['redactor'] });
    this.editor = new BaseComponent({ className: ['editor'] });
    this.viewer = new BaseComponent({ className: ['viewer'] });
    this.insertChild(this.editor.getNode(), this.viewer.getNode());
  }
}
