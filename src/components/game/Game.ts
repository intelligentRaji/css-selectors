import { GamePresenter } from '@/presenters/GamePresenter';
import { GameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';
import { Display } from '../display/Display';
import { Redactor } from '../redactor/Redactor';

export class Game extends BaseComponent {
  private readonly presenter: GamePresenter;

  constructor() {
    super({ className: ['wrapper'] });
    this.presenter = new GamePresenter(this, new GameModel());
    const container = new BaseComponent({
      className: ['container'],
      parent: this.element,
    });
    const display = new Display();
    const redactor = new Redactor();
    container.insertChild(display.getNode(), redactor.getNode());
  }
}
