import { LocalStorage } from '@/enums/LocalStorage';
import { localStorageManager } from '@/services/LocalStorageManager';
import { Observable } from '@/services/Observable';

export class LevelModel {
  private level: Observable<number>;

  constructor(level: number) {
    this.level = new Observable(localStorageManager.getItem(LocalStorage.level, level));
  }
}
