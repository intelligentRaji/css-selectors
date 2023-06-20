import { Game } from '@/components/game/Game';
import { IModel } from '@/interfaces/model';

interface IGamePresenter {
  view: Game;
  model: IModel;
}

export class GamePresenter {
  private readonly view: Game;
  private readonly model: IModel;

  constructor({ view, model }: IGamePresenter) {
    this.view = view;
    this.model = model;
  }
  public loadData(): void {}
}
