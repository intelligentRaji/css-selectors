import { GamePresenter } from './presenters/GamePresenter';

class App {
  private readonly root: HTMLElement;

  private game: GamePresenter;

  constructor(root: HTMLElement) {
    this.root = root;
    this.game = new GamePresenter();
  }

  public start(): void {
    this.root.append(this.game.render());
  }
}

const app = new App(document.body);
app.start();
