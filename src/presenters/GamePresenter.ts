import { BaseComponent } from '@/components/BaseComponent';
import { GameModel } from '@/models/GameModel';
import { Presenter } from '@/presenters/Presenter';

export class GamePresenter extends Presenter {
  private readonly model = new GameModel();

  public render(): HTMLElement {
    const wrapper = new BaseComponent({ className: 'wrapper' });
    wrapper.insertChild();
    return wrapper.getNode();
  }
}
