import { ISubject } from '@/interfaces/subject';
import { gameModel } from '@/models/GameModel';
import { BaseComponent } from '../BaseComponent';
import { ViewerSubject } from '../viewerSubject/ViewerSubject';

export interface SubjectConstructor extends Omit<ISubject, 'childs'> {
  viewParent?: ViewerSubject;
  parent: HTMLElement;
  isParent: boolean;
}

export class Subject extends BaseComponent {
  private readonly hint: BaseComponent;
  private readonly tag: ViewerSubject;

  constructor({
    tag,
    className,
    id,
    parent,
    target,
    isParent,
    viewParent,
  }: SubjectConstructor) {
    super({ tag, className, id, parent });
    this.hint = new BaseComponent({
      tag: 'div',
      className: ['subject-hint'],
      text: `<${tag}></${tag}>`,
      parent: document.body,
    });
    if (target) {
      this.addClass('target');
      gameModel.addTargetElement(this.getNode());
    }
    this.tag = new ViewerSubject({ tag, className, id, isParent, parent: viewParent });
    this.addEvent('mouseenter', this.highlightSubject);
    this.addEvent('mouseleave', this.dimSubject);
    this.addTagEvents(this.tag.openTag);
    if (this.tag.closeTag) {
      this.addTagEvents(this.tag.closeTag);
    }
  }

  public placeChildInTheMiddleOfParent(childPostion: number): void {
    this.stylize(
      'bottom',
      `calc(50% - ${this.getNode().clientHeight / 2 + 5 + 30 * childPostion}px)`
    );
    this.stylize('position', 'absolute');
  }

  public getTag(): ViewerSubject {
    return this.tag;
  }

  private highlightSubject = (e: Event): void => {
    this.highlight(e);
    this.addEvent('mousemove', this.removeEventIfChildHovered);
  };

  private dimSubject = (): void => {
    this.dim();
    this.removeEvent('mousemove', this.removeEventIfChildHovered);
  };

  public poseHint(): void {
    const coordinates = this.getNode().getBoundingClientRect();
    this.hint.stylize('left', `${coordinates.left + coordinates.width / 2}px`);
    this.hint.stylize('top', `${coordinates.top - 70}px`);
  }

  public destroy(): void {
    this.element.remove();
    this.hint.destroy();
  }

  private highlight = (e: Event): void => {
    this.addClass('highlighted');
    this.hint.addClass('highlighted');
    this.tag.addClass('highlighted');
  };

  private dim = (): void => {
    this.removeClass('highlighted');
    this.hint.removeClass('highlighted');
    this.tag.removeClass('highlighted');
  };

  private removeEventIfChildHovered = (e: Event): void => {
    if (e.target !== this.element) {
      this.dim();
    } else {
      this.highlight(e);
    }
  };

  public addTagEvents(tag: BaseComponent): void {
    tag.addEvent('mouseenter', this.highlight);
    tag.addEvent('mouseleave', this.dim);
  }
}
