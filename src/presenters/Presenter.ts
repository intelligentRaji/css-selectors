import { BaseComponent } from '@/components/BaseComponent';

export class Presenter<View extends BaseComponent, Model> {
  protected readonly view: View;

  protected readonly model: Model;

  constructor(view: View, model: Model) {
    this.view = view;
    this.model = model;
  }
}
