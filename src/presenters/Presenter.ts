import { BaseComponent } from '@/components/BaseComponent';

export class Presenter {
  protected readonly view!: BaseComponent<HTMLElement>;

  public getNode(): HTMLElement {
    return this.view.getNode();
  }
}
