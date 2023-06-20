import './controls.scss';
import { gameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';
import { ButtonComponent } from '../button/ButtonComponent';

export class Controls extends BaseComponent {
  private readonly level: BaseComponent;
  private readonly status: BaseComponent;
  private readonly previous: ButtonComponent;
  private readonly next: ButtonComponent;
  private readonly levelListButton: ButtonComponent;

  constructor() {
    super({ className: ['controls'] });
    const levelInformation = new BaseComponent({ className: ['level-information'] });
    this.level = new BaseComponent({ tag: 'h1', className: ['controls-level'] });
    this.status = new BaseComponent({ className: ['controls-status'] });
    const levelNavigation = new BaseComponent({ className: ['level-navigation'] });
    this.previous = new ButtonComponent({
      className: ['controls-previous', 'level-button'],
    });
    this.next = new ButtonComponent({ className: ['controls-next', 'level-button'] });
    this.levelListButton = new ButtonComponent({ className: ['controls-level-list'] });
    this.levelListButton.insertChild(
      new BaseComponent({ tag: 'span', className: ['burger-row'] }).getNode()
    );
    levelInformation.insertChild(this.level.getNode(), this.status.getNode());
    levelNavigation.insertChild(
      this.previous.getNode(),
      this.next.getNode(),
      this.levelListButton.getNode()
    );
    this.insertChild(levelInformation.getNode(), levelNavigation.getNode());
  }

  private displayLevelState(level: number): void {
    if (gameModel.isCompletedLevel(level)) {
      this.status.addClass('completed');
      return;
    }
    this.status.addClass('uncompleted');
  }

  public loadData(): void {
    const level = gameModel.getLevel();
    this.level.setTextContent(`Level ${level} of ${gameModel.getLevelsExist()}`);
    this.displayLevelState(level);
  }
}
