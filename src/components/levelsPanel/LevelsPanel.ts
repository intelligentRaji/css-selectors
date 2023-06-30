import './levelsPanel.scss';
import syntaxes from '@/json/syntax.json';
import { gameModel } from '@/models/GameModel';
import { eventEmitter } from '@/services/eventEmitter/EventEmitter';
import { EventName } from '@/enums/EventName';
import { BaseComponent } from '../BaseComponent';
import { ModalComponent } from '../ModalComponent';
import { ButtonComponent } from '../button/ButtonComponent';
import { LevelButton } from '../levelButton/LevelButton';

export class LevelsPanel extends ModalComponent {
  private readonly levelsContainer: BaseComponent;
  private readonly resetButton: ButtonComponent;
  private levels: LevelButton[] = [];

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
    eventEmitter.on(EventName.onWin, () => {
      this.levels.forEach((item, index) => {
        item.displayLevelStatus(index);
      });
    });
  }

  public generateLevelButtons(): void {
    syntaxes.forEach((item: string, index: number) => {
      const level = new LevelButton({ index, text: item });
      this.levelsContainer.insertChild(level.getNode());
      this.levels.push(level);
    });
  }

  public changeLevel(level: number): void {
    this.levels.forEach((item, index) => {
      item.removeClass('active');
      item.displayLevelStatus(index);
    });
    this.levels[level].addClass('active');
  }

  private selectLevel = (e: Event): void => {
    let target = e.target as HTMLElement;
    while (target !== e.currentTarget) {
      if (target.matches('.button')) {
        gameModel.setLevel(Number(target.getAttribute('data-level')));
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
