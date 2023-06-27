import './levelStatus.scss';
import { gameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';

export class LevelStatus extends BaseComponent {
  constructor() {
    super({ className: ['level-status'] });
  }

  public displayLevelStatus(level: number): void {
    if (gameModel.isCompletedLevel(level)) {
      this.addClass('completed');
      return;
    }
    if (gameModel.getHintLevels().includes(level)) {
      this.addClass('hinted');
      return;
    }
    this.addClass('uncompleted');
  }
}
