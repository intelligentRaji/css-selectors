import './style.scss';
import { Game } from './components/game/Game';

class App {
  private readonly root: HTMLElement;

  private game: Game;

  constructor(root: HTMLElement) {
    this.root = root;
    this.game = new Game();
  }

  public start(): void {
    this.root.append(this.game.getNode());
  }
}

const app = new App(document.body);
app.start();
