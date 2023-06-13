import { LocalStorage } from 'src/enums/LocalStorage';
import { localStorageManager } from 'src/services/LocalStorageManager';
import { Observable } from 'src/services/Observable';

export class GameModel {
  private currentLevel: Observable<number>;

  constructor() {
    this.currentLevel = new Observable(
      localStorageManager.getItem(LocalStorage.LEVEL, 1)
    );
  }

  public getCurrentLevel(): number {
    return this.currentLevel.getValue();
  }

  public setCurrentLevel(number: number): void {
    this.currentLevel.notify(number);
  }
}
