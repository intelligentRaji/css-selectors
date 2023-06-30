import './style.scss';
import { Game } from './components/game/Game';
import { eventEmitter } from './services/eventEmitter/EventEmitter';
import { EventName } from './enums/EventName';

class App {
  private readonly root: HTMLElement;

  private game: Game;

  constructor(root: HTMLElement) {
    this.root = root;
    this.game = new Game();
  }

  public start(): void {
    this.root.append(this.game.getNode());
    this.game.loadData();
    window.addEventListener('resize', () => {
      eventEmitter.emit(EventName.resize);
    });
  }
}

const app = new App(document.body);
app.start();
