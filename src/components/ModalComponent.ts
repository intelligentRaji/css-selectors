import { BaseComponent } from '@/components/BaseComponent';

interface IModalComponent {
  tag?: keyof HTMLElementTagNameMap;
  parent?: HTMLElement;
  className?: string[];
}

export class ModalComponent extends BaseComponent {
  constructor({ tag = 'div', parent, className = [] }: IModalComponent) {
    super({ tag, parent, className: [...className] });
  }

  protected showElement = (e: Event): void => {
    this.addClass('open');
    document.addEventListener('click', this.closeElementOnDocumentClick);
    e.stopPropagation();
  };

  protected closeElement = (e: Event): void => {
    this.removeClass('open');
    document.removeEventListener('click', this.closeElementOnDocumentClick);
  };

  protected closeElementOnDocumentClick = (e: Event): void => {
    if (!e.composedPath().includes(this.element)) {
      this.removeClass('open');
    }
  };

  public visibilityMechanic = (e: Event): void => {
    if (this.element.classList.contains('open')) {
      this.closeElement(e);
    } else {
      this.showElement(e);
    }
  };
}
