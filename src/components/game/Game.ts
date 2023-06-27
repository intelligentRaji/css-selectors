import './game.scss';
import { LevelPresenter } from '@/presenters/GamePresenter';
import { gameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';
import { Display } from '../display/Display';
import { Redactor } from '../redactor/Redactor';
import { ControlsAndHelpPanel } from '../controlsAndHelpPanel/controlsAndHelpPanel';

export class Game extends BaseComponent {
  private readonly presenter: LevelPresenter;
  private readonly controlsAndHelpPanel: ControlsAndHelpPanel;
  private readonly display: Display;

  constructor() {
    super({ className: ['wrapper'] });
    this.presenter = new LevelPresenter({ view: this, model: gameModel });
    this.controlsAndHelpPanel = new ControlsAndHelpPanel();
    const container = new BaseComponent({
      className: ['container'],
    });
    this.display = new Display();
    const redactor = new Redactor();
    container.insertChild(this.display.getNode(), redactor.getNode());
    this.insertChild(container.getNode(), this.controlsAndHelpPanel.getNode());
    gameModel.level.subscribe(this.loadData);
  }

  public loadData = (): void => {
    const level = gameModel.getLevel();
    this.controlsAndHelpPanel.loadData();
    this.display.loadData(level);
  };
}
