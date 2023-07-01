import './levelButton.scss';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { LevelStatus } from '../levelStatus/levelStatus';

export interface ILevelButton {
  index: number;
  text: string;
}

export class LevelButton extends BaseComponent {
  private readonly status: LevelStatus;

  constructor({ index, text }: ILevelButton) {
    super({ tag: 'div', className: ['button'] });
    this.addData('level', String(index));
    this.status = new LevelStatus();
    this.status.displayLevelStatus(index + 1);
    const number = new BaseComponent({
      tag: 'span',
      className: ['number'],
      text: String(index + 1),
    });
    const title = new BaseComponent({ tag: 'h3', className: ['title'], text });
    this.insertChild(this.status.getNode(), number.getNode(), title.getNode());
  }

  public displayLevelStatus(level: number): void {
    this.status.displayLevelStatus(level);
  }
}
