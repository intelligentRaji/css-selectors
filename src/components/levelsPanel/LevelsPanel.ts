import './levelsPanel.scss';
import syntaxes from '@/json/syntax.json';
import { eventEmitter } from '@/services/EventEmitter';
import { EventName } from '@/enums/EventName';
import { BaseComponent } from '../BaseComponent';
import { ModalComponent } from '../ModalComponent';
import { LevelStatus } from '../levelStatus/levelStatus';
import { ButtonComponent } from '../button/ButtonComponent';

export class LevelsPanel extends ModalComponent {
  private readonly levelsContainer: BaseComponent;
  private readonly resetButton: ButtonComponent;
  private levels: BaseComponent[] = [];

  constructor() {
    super({ tag: 'div', className: ['levels-panel'] });
    const title = new BaseComponent({
      tag: 'h2',
      className: ['levels-panel-title'],
      text: 'Choose a level',
    });
    this.levelsContainer = new BaseComponent({ className: ['levels'] });
    this.levelsContainer.addEvent('click', this.selectLevel);
    this.resetButton = new ButtonComponent({
      className: ['reset-button'],
      text: 'Reset Progress',
      callback: this.reset,
    });
    this.insertChild(
      title.getNode(),
      this.levelsContainer.getNode(),
      this.resetButton.getNode()
    );
    this.generateLevelButtons();
  }

  public generateLevelButtons(): void {
    syntaxes.forEach((item: string, index: number) => {
      const level = new BaseComponent({ className: ['button'] });
      level.addData('level', String(index));
      const status = new LevelStatus();
      status.displayLevelStatus(index + 1);
      const number = new BaseComponent({
        tag: 'span',
        className: ['number'],
        text: String(index + 1),
      });
      const title = new BaseComponent({ tag: 'h3', className: ['title'], text: item });
      level.insertChild(status.getNode(), number.getNode(), title.getNode());
      this.levelsContainer.insertChild(level.getNode());
      this.levels.push(level);
    });
  }

  public changeLevel(level: number): void {
    this.levels.forEach((item) => item.removeClass('active'));
    this.levels[level].addClass('active');
  }

  private selectLevel = (e: Event): void => {
    let target = e.target as HTMLElement;
    while (target !== e.currentTarget) {
      if (target.matches('.button')) {
        eventEmitter.emit(EventName.setLevel, Number(target.getAttribute('data-level')));
        this.visibilityMechanic(e);
      }
      target = target.parentNode as HTMLElement;
    }
  };

  private reset = (e: Event): void => {
    eventEmitter.emit(EventName.reset);
    this.visibilityMechanic(e);
  };
}
