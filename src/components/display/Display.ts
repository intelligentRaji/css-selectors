import './display.scss';
import goals from '@/json/goal.json';
import { eventEmitter } from '@/services/EventEmitter';
import { EventName } from '@/enums/EventName';
import { BaseComponent } from '../BaseComponent';
import { ButtonComponent } from '../button/ButtonComponent';
import { Viewport } from '../viewport/Viewport';

export class Display extends BaseComponent {
  private readonly goal: BaseComponent;
  private readonly hint: ButtonComponent;
  private readonly viewport: Viewport;

  constructor() {
    super({ className: ['display'] });
    this.goal = new BaseComponent({ tag: 'h2', className: ['goal'] });
    this.hint = new ButtonComponent({
      className: ['hint'],
      text: "Help, I'm stuck!",
      callback: (e: Event): void => {
        eventEmitter.emit(EventName.hint);
      },
    });
    this.viewport = new Viewport();
    this.insertChild(this.goal.getNode(), this.hint.getNode(), this.viewport.getNode());
  }

  private setGoal(level: number): void {
    this.goal.setTextContent(goals[level]);
  }

  public loadData(level: number): void {
    this.setGoal(level);
    this.viewport.loadData(level);
  }
}
