import './game.scss';
import { LevelPresenter } from '@/presenters/LevelPresenter';
import { gameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';
import { Display } from '../display/Display';
import { Redactor } from '../redactor/Redactor';
import { ModalComponent } from '../ModalComponent';
import { ControlsAndHelpPanel } from '../controlsAndHelpPanel/controlsAndHelpPanel';

export class Game extends BaseComponent {
  private readonly presenter: LevelPresenter;
  private readonly controlsAndHelpPanel: ControlsAndHelpPanel;

  constructor() {
    super({ className: ['wrapper'] });
    this.presenter = new LevelPresenter({ view: this, model: gameModel });
    this.controlsAndHelpPanel = new ControlsAndHelpPanel();
    const container = new BaseComponent({
      className: ['container'],
    });
    const display = new Display();
    const redactor = new Redactor();
    container.insertChild(display.getNode(), redactor.getNode());
    this.insertChild(container.getNode(), this.controlsAndHelpPanel.getNode());
  }

  public loadData(): void {
    this.controlsAndHelpPanel.loadData();
  }
}
