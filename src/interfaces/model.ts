import { Observable } from '@/services/Observable';

export interface IModel {
  level: Observable<number>;
  getLevel(): number;
  setLevel(value: number): void;
  plusLevel(): void;
  minusLevel(): void;
  getLevelsExist(): number;
  isCompletedLevel(level: number): boolean;
  setCompletedLevel(level: number): void;
  removeCompletedLevel(level: number): void;
  addTargetElement(element: Node): void;
  getTargetElements(): Node[];
  addHintLevel(level: number): void;
  getHintLevels(): number[];
}
