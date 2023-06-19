import './redactorViewer.scss';
import { BaseComponent } from '@/components/BaseComponent';

export class RedactorViewer extends BaseComponent {
  constructor() {
    super({ tag: 'code', className: ['redactor-viewer'] });
  }
}
