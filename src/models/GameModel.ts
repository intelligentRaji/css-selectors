import { LocalStorage } from '@/enums/LocalStorage';
import { localStorageManager } from '@/services/LocalStorageManager';
import answers from '@/json/answer.json';
import { IModel } from '@/interfaces/model';
import { Observable } from '@/services/Observable';

const defaultValues = {
  level: 0,
  completedLevels: [],
  hintLevels: [],
};

class GameModel implements IModel {
  public level: Observable<number>;
  private levelsExist: number;
  private completedLevels: number[];
  private hintLevels: number[];
  private targetElements: Node[] = [];

  constructor() {
    this.level = new Observable(
      localStorageManager.getItem(LocalStorage.level, defaultValues.level)
    );
    this.completedLevels = localStorageManager.getItem(
      LocalStorage.completedLevels,
      defaultValues.completedLevels
    );
    this.hintLevels = localStorageManager.getItem(
      LocalStorage.hintLevels,
      defaultValues.hintLevels
    );
    this.levelsExist = answers.length;
    this.level.subscribe(this.clearTargetElements);
  }

  public getLevel(): number {
    return this.level.getValue();
  }

  public setLevel = (value: number): void => {
    if (value <= this.levelsExist - 1 && value >= 0) {
      this.clearTargetElements();
      this.level.notify(value);
    }
  };

  public plusLevel = (): void => {
    this.setLevel(this.getLevel() + 1);
  };

  public minusLevel = (): void => {
    this.setLevel(this.getLevel() - 1);
  };

  public getLevelsExist(): number {
    return this.levelsExist;
  }

  public isCompletedLevel(level: number): boolean {
    return this.completedLevels.includes(level);
  }

  public setCompletedLevel(level: number): void {
    this.completedLevels.push(level);
  }

  public removeCompletedLevel(level: number): void {
    this.completedLevels.filter((item) => item !== level);
  }

  public addTargetElement(element: Node): void {
    this.targetElements.push(element);
  }

  public getTargetElements(): Node[] {
    return this.targetElements;
  }

  public addHintLevel(level: number): void {
    this.hintLevels.push(level);
  }

  public getHintLevels(): number[] {
    return this.hintLevels;
  }

  public clearTargetElements = (): void => {
    this.targetElements = [];
  };

  public reset(): void {
    this.hintLevels = [];
    this.completedLevels = [];
  }
}

export const gameModel = new GameModel();
