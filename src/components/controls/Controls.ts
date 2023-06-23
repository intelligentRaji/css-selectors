import './controls.scss';
import { eventEmitter } from '@/services/EventEmitter';
import { EventName } from '@/enums/EventName';
import { BaseComponent } from '../BaseComponent';
import { ButtonComponent } from '../button/ButtonComponent';
import { LevelStatus } from '../levelStatus/levelStatus';

export class Controls extends BaseComponent {
  private readonly level: BaseComponent;
  private readonly status: LevelStatus;
  private readonly previous: ButtonComponent;
  private readonly next: ButtonComponent;

  constructor() {
    super({ className: ['controls'] });
    const levelInformation = new BaseComponent({ className: ['level-information'] });
    this.level = new BaseComponent({ tag: 'h1', className: ['controls-level'] });
    this.status = new LevelStatus();
    const levelNavigation = new BaseComponent({ className: ['level-navigation'] });
    this.previous = new ButtonComponent({
      className: ['controls-previous', 'level-button'],
      callback: (e: Event): void => {
        eventEmitter.emit(EventName.previousLevel);
      },
    });
    this.next = new ButtonComponent({
      className: ['controls-next', 'level-button'],
      callback: (e: Event): void => {
        eventEmitter.emit(EventName.nextLevel);
      },
    });
    levelInformation.insertChild(this.level.getNode(), this.status.getNode());
    levelNavigation.insertChild(this.previous.getNode(), this.next.getNode());
    this.insertChild(levelInformation.getNode(), levelNavigation.getNode());
  }

  public loadData(level: number, levelsExists: number): void {
    this.level.setTextContent(`Level ${level + 1} of ${levelsExists}`);
    this.status.displayLevelStatus(level);
  }
}
