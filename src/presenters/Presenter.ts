import { BaseComponent } from 'src/components/BaseComponent';

export class Presenter {
  protected readonly view!: BaseComponent<HTMLElement>;

  public getNode(): HTMLElement {
    return this.view.getNode();
  }
}
