import './game.scss';
import { GamePresenter } from '@/presenters/GamePresenter';
import { GameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';
import { Display } from '../display/Display';
import { Redactor } from '../redactor/Redactor';
import { ModalComponent } from '../ModalComponent';

export class Game extends BaseComponent {
  private readonly presenter: GamePresenter;

  constructor() {
    super({ className: ['wrapper'] });
    this.presenter = new GamePresenter(this, new GameModel());
    const aside = new ModalComponent({ className: ['aside'] });
    const container = new BaseComponent({
      className: ['container'],
    });
    const display = new Display();
    const redactor = new Redactor();
    container.insertChild(display.getNode(), redactor.getNode());
    this.insertChild(container.getNode(), aside.getNode());
  }
}
