import { Observable } from '@/services/Observable';

export interface IModel {
  level: Observable<number>;
  getLevel(): number;
  setLevel(value: number): void;
  plusLevel(): void;
  minusLevel(): void;
  getLevelsExist(): number;
  getCompletedLevels(): number[];
  setCompletedLevel(level: number): void;
  removeCompletedLevel(level: number): void;
  addTargetElement(element: Node): void;
  getTargetElements(): Node[];
  addHintLevel(): void;
  getHintLevels(): number[];
  reset(): void;
}
