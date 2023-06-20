import './game.scss';
import { GamePresenter } from '@/presenters/GamePresenter';
import { gameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';
import { Display } from '../display/Display';
import { Redactor } from '../redactor/Redactor';
import { ModalComponent } from '../ModalComponent';
import { Controls } from '../controls/Controls';
import { ProgressBar } from '../progressBar/progressBar';
import { Help } from '../help/Help';

export class Game extends BaseComponent {
  private readonly presenter: GamePresenter;
  private readonly controls: Controls;
  private readonly progressBar: ProgressBar;
  private readonly help: Help;

  constructor() {
    super({ className: ['wrapper'] });
    this.presenter = new GamePresenter({ view: this, model: gameModel });
    const aside = new ModalComponent({ tag: 'aside', className: ['aside'] });
    this.controls = new Controls();
    this.progressBar = new ProgressBar();
    this.help = new Help();
    const container = new BaseComponent({
      className: ['container'],
    });
    const display = new Display();
    const redactor = new Redactor();
    aside.insertChild(
      this.controls.getNode(),
      this.progressBar.getNode(),
      this.help.getNode()
    );
    container.insertChild(display.getNode(), redactor.getNode());
    this.insertChild(container.getNode(), aside.getNode());
  }

  public loadData(): void {
    this.progressBar.loadData();
    this.help.loadData();
    this.controls.loadData();
  }
}
