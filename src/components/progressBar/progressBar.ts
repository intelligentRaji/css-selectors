import './progressBar.scss';
import { gameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';

export class ProgressBar extends BaseComponent {
  private readonly progress: BaseComponent;

  constructor() {
    super({ className: ['progress-bar'] });
    this.progress = new BaseComponent({
      className: ['progress-bar-progress'],
      parent: this.getNode(),
    });
  }

  private displayProgress(currentLevel: number, levelsExist: number): void {
    const progress = (currentLevel / levelsExist) * 100;
    this.progress.stylize('width', `${progress}%`);
  }

  public loadData(): void {
    this.displayProgress(gameModel.getLevel(), gameModel.getLevelsExist());
  }
}
