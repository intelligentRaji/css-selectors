import { LocalStorage } from '@/enums/LocalStorage';
import { localStorageManager } from '@/services/LocalStorageManager';
import { Observable } from '@/services/Observable';

const defualtLevel = 1;

export class ExampleModel {
  private level = new Observable(
    localStorageManager.getItem(LocalStorage.LEVEL, defualtLevel)
  );
}
