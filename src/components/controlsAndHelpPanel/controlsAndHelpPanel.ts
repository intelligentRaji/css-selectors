import './controlsAndHelpPanel.scss';
import { gameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';
import { ButtonComponent } from '../button/ButtonComponent';
import { Controls } from '../controls/Controls';
import { ProgressBar } from '../progressBar/progressBar';
import { Help } from '../help/Help';
import { LevelsPanel } from '../levelsPanel/LevelsPanel';

export class ControlsAndHelpPanel extends BaseComponent {
  private readonly controls: Controls;
  private readonly progressBar: ProgressBar;
  private readonly help: Help;
  private readonly levelsPanel: LevelsPanel;
  private readonly levelListButton: ButtonComponent;

  constructor() {
    super({ tag: 'aside', className: ['aside'] });
    this.controls = new Controls();
    this.progressBar = new ProgressBar();
    this.help = new Help();
    this.levelsPanel = new LevelsPanel();
    this.levelListButton = new ButtonComponent({
      className: ['controls-level-list'],
      callback: this.levelsPanel.visibilityMechanic,
    });
    this.levelListButton.insertChild(
      new BaseComponent({ tag: 'span', className: ['burger-row'] }).getNode()
    );
    this.insertChild(
      this.levelsPanel.getNode(),
      this.controls.getNode(),
      this.progressBar.getNode(),
      this.help.getNode(),
      this.levelListButton.getNode()
    );
  }

  public loadData(): void {
    const level = gameModel.getLevel();
    const levelsExist = gameModel.getLevelsExist();
    this.progressBar.displayProgress(level, levelsExist);
    this.help.loadData(level);
    this.controls.loadData(level, levelsExist);
    this.levelsPanel.changeLevel(level);
  }
}
