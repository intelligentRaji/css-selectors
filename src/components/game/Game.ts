import { GamePresenter } from '@/presenters/GamePresenter';
import { GameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';
import { Display } from '../display/Display';

export class Game extends BaseComponent {
  private readonly presenter: GamePresenter;

  constructor() {
    super({ className: ['wrapper'] });
    this.presenter = new GamePresenter(this, new GameModel());
    const container = new BaseComponent({ className: ['container'] });
    const display = new Display();
    const redactor = new BaseComponent({ className: ['redactor'] });
    container.insertChild(display.getNode(), redactor.getNode());
  }
}
