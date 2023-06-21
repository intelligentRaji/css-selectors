import { Game } from '@/components/game/Game';
import { EventName } from '@/enums/EventName';
import { IModel } from '@/interfaces/model';
import { eventEmitter } from '@/services/EventEmitter';

interface IGamePresenter {
  view: Game;
  model: IModel;
}

export class LevelPresenter {
  private readonly view: Game;
  private readonly model: IModel;

  constructor({ view, model }: IGamePresenter) {
    this.view = view;
    this.model = model;
    eventEmitter.on(EventName.nextLevel, this.nextLevel);
    eventEmitter.on(EventName.previousLevel, this.previousLevel);
  }

  private nextLevel = (): void => {
    this.model.plusLevel();
    this.view.loadData();
  };

  private previousLevel = (): void => {
    this.model.minusLevel();
    this.view.loadData();
  };
}
