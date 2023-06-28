import './redactorRows.scss';
import { BaseComponent } from '@/components/BaseComponent';

export class RedactorRows extends BaseComponent {
  constructor(numberOfRows?: number) {
    super({ tag: 'ol', className: ['redactor-rows'] });
    if (numberOfRows) {
      this.setRows(numberOfRows);
    }
  }

  public setRows(numberOfRows: number): void {
    this.removeChildren();
    this.insertChild(
      ...Array.from({ length: numberOfRows }, (item, index) =>
        new BaseComponent({
          tag: 'li',
          className: ['redactor-row'],
          text: `${index + 1}`,
        }).getNode()
      )
    );
  }
}
