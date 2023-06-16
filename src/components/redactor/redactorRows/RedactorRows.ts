import { BaseComponent } from '@/components/BaseComponent';

export class RedactorRows extends BaseComponent {
  constructor(numberOfRows: number) {
    super({ tag: 'ol', className: ['redactor-rows'] });
    this.setRows(numberOfRows);
  }

  private setRows(numberOfRows: number): void {
    this.insertChild(
      ...Array.from({ length: numberOfRows }, (item) =>
        new BaseComponent({ tag: 'li', className: ['redactor-row'] }).getNode()
      )
    );
  }
}
