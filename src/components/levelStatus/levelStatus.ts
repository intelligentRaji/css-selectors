import './levelStatus.scss';
import { gameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';

export class LevelStatus extends BaseComponent {
  constructor() {
    super({ className: ['level-status'] });
  }

  public displayLevelStatus = (level: number): void => {
    if (gameModel.getHintLevels().includes(level)) {
      this.removeClass('completed');
      this.setTextContent('?');
      this.addClass('hinted');
      return;
    }
    if (gameModel.getCompletedLevels().includes(level)) {
      this.removeClass('hinted');
      this.setTextContent('');
      this.addClass('completed');
      return;
    }
    this.setTextContent('');
    this.removeClass('completed', 'hinted');
  };
}
