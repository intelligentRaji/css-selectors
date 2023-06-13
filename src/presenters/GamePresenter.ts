import { BaseComponent } from 'src/components/BaseComponent';
import { GameModel } from 'src/models/GameModel';
import { Presenter } from './Presenter';

export class GamePresenter extends Presenter {
  private readonly model = new GameModel();

  constructor() {
    super();
    this.view.insertChild();
  }

  public render(): HTMLElement {
    const wrapper = new BaseComponent({ className: 'wrapper' });
    wrapper.insertChild();
    return wrapper.getNode();
  }
}
