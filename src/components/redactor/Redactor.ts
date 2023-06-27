import './redactor.scss';
import { eventEmitter } from '@/services/EventEmitter';
import { EventName } from '@/enums/EventName';
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
    this.addEvent('animationend', () => {
      this.removeClass('loose');
    });
    eventEmitter.on(EventName.loose, this.loose);
  }

  private loose = (): void => {
    this.addClass('loose');
  };
}
