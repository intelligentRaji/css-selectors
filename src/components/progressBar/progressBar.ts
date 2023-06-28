import './progressBar.scss';
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

  public displayProgress(currentLevel: number, levelsExist: number): void {
    const progress = ((currentLevel + 1) / levelsExist) * 100;
    this.progress.stylize('width', `${progress}%`);
  }
}
