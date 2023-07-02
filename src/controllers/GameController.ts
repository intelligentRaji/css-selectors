import { EventName } from '@/enums/EventName';
import { IModel } from '@/interfaces/model';
import { eventEmitter } from '@/services/eventEmitter/EventEmitter';

interface IGameController {
  model: IModel;
}

export class LevelPresenter {
  private readonly model: IModel;

  constructor({ model }: IGameController) {
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
      return document.querySelectorAll(`.table ${value}`);
    } catch (err) {
      return document.querySelectorAll(`.table z`);
    }
  }
}
