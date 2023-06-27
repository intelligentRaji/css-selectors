import { LocalStorage } from '@/enums/LocalStorage';
import { localStorageManager } from '@/services/LocalStorageManager';
import answers from '@/json/answer.json';
import { IModel } from '@/interfaces/model';

const defaultValues = {
  level: 0,
  completedLevels: [],
};

class GameModel implements IModel {
  private level: number;
  private levelsExist: number;
  private completedLevels: number[];
  private targetElements: HTMLElement[] = [];

  constructor() {
    this.level = localStorageManager.getItem(LocalStorage.level, defaultValues.level);
    this.completedLevels = localStorageManager.getItem(
      LocalStorage.completedLevels,
      defaultValues.completedLevels
    );
    this.levelsExist = answers.length;
  }

  public getLevel(): number {
    return this.level;
  }

  public setLevel(value: number): void {
    if (value <= this.levelsExist && value >= 0) {
      this.level = value;
    }
  }

  public plusLevel(): void {
    if (this.level + 1 <= this.levelsExist - 1) {
      this.level += 1;
    }
  }

  public minusLevel(): void {
    if (this.level - 1 >= 0) {
      this.level -= 1;
    }
  }

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

  public addTargetElement(element: HTMLElement): void {
    this.targetElements.push(element);
  }

  public getTargetElements(): HTMLElement[] {
    return this.targetElements;
  }
}

export const gameModel = new GameModel();
