import { LocalStorage } from '@/enums/LocalStorage';
import { localStorageManager } from '@/services/LocalStorageManager';
import { Observable } from '@/services/Observable';

const defualtLevel = 1;

export class GameModel {
  private level: Observable<number>;

  constructor() {
    this.level = new Observable(
      localStorageManager.getItem(LocalStorage.LEVEL, defualtLevel)
    );
  }

  public getLevel(): number {
    return this.level.getValue();
  }

  public setLevel = (value: number): void => {
    this.level.notify(value);
  };

  public plusLevel = (): void => {
    this.level.notify((value) => value + 1);
  };

  public minusLevel = (): void => {
    this.level.notify((value) => value - 1);
  };
}
