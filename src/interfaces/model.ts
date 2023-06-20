export interface IModel {
  getLevel(): number;
  setLevel(value: number): void;
  plusLevel(): void;
  minusLevel(): void;
  getLevelsExist(): number;
  isCompletedLevel(level: number): boolean;
  setCompletedLevel(level: number): void;
  removeCompletedLevel(level: number): void;
}
