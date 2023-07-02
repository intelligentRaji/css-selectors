import { Game } from '@/components/game/Game';
import { EventName } from '@/enums/EventName';
import { IModel } from '@/interfaces/model';
import { eventEmitter } from '@/services/eventEmitter/EventEmitter';

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
    eventEmitter.on(EventName.reset, this.resetProgress);
    eventEmitter.on(EventName.validate, this.validate);
  }

  private resetProgress = (): void => {
    this.model.reset();
    this.model.setLevel(0);
  };

  private validate = (value: string): void => {
    if (value === '.target' || !value) {
      eventEmitter.emit(EventName.loose);
      return;
    }

    if (Number(value) <= this.model.getLevelsExist() && Number(value) >= 1) {
      this.model.setLevel(Number(value) - 1);
      return;
    }

    const target = this.model.getTargetElements();
    const selectElements = Array.from(this.getSelectedElements(value));
    console.log(selectElements);

    if (
      selectElements.length === target.length &&
      selectElements.every((item) => target.includes(item))
    ) {
      const currentLevel = this.model.getLevel();
      this.model.setCompletedLevel(currentLevel);
      eventEmitter.emit(EventName.win);
      setTimeout(() => {
        if (currentLevel === this.model.getLevelsExist() - 1) {
          eventEmitter.emit(EventName.onWin, currentLevel);
          return;
        }
        this.model.plusLevel();
      }, 1000);
      return;
    }
    eventEmitter.emit(EventName.loose);
  };

  private getSelectedElements(value: string): NodeList {
    try {
      return document.querySelectorAll(`.table ${value}:not(.table-edge)`);
    } catch (err) {
      return document.querySelectorAll(`.table z:not(.table-edge)`);
    }
  }
}
