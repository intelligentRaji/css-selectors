import { EventName } from '@/enums/EventName';
import { LocalStorage } from '@/enums/LocalStorage';
import { eventEmitter } from '@/services/EventEmitter';
import { localStorageManager } from '@/services/LocalStorageManager';
import { Observable, isCallable } from '@/services/Observable';

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
