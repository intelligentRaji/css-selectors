import { eventEmitter } from '@/services/EventEmitter';
import './redactorViewer.scss';
import { BaseComponent } from '@/components/BaseComponent';
import { EventName } from '@/enums/EventName';

export class RedactorViewer extends BaseComponent {
  constructor() {
    super({ tag: 'code', className: ['redactor-viewer'] });
    eventEmitter.on(EventName.generateSubject, (...childs: HTMLElement[]): void => {
      this.removeChildren();
      this.insertChild(...childs);
    });
  }
}
