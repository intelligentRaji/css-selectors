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
    eventEmitter.on(EventName.setLevel, this.setLevel);
    eventEmitter.on(EventName.reset, this.resetProgress);
  }

  private nextLevel = (): void => {
    this.model.plusLevel();
    this.view.loadData();
  };

  private previousLevel = (): void => {
    this.model.minusLevel();
    this.view.loadData();
  };

  private setLevel = (level: number): void => {
    this.model.setLevel(level);
    this.view.loadData();
  };

  private resetProgress = (): void => {
    this.model.setLevel(0);
    this.view.loadData();
  };
}
