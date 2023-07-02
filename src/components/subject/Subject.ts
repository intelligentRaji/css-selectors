import './subject.scss';
import { ISubject } from '@/interfaces/subject';
import { gameModel } from '@/models/GameModel';
import { eventEmitter } from '@/services/eventEmitter/EventEmitter';
import { EventName } from '@/enums/EventName';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { ViewerSubject } from '../viewerSubject/ViewerSubject';

export interface SubjectConstructor extends Omit<ISubject, 'childs'> {
  viewParent?: ViewerSubject;
  parent: HTMLElement;
  isParent: boolean;
  positionInParent: number;
  isChild: boolean;
}

export class Subject extends BaseComponent {
  private readonly hint: BaseComponent;
  private readonly tag: ViewerSubject;
  private readonly positionInParent: number;
  private readonly isChild: boolean;

  constructor({
    tag,
    className,
    id,
    parent,
    target,
    isParent,
    isChild,
    viewParent,
    positionInParent,
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
      eventEmitter.on(EventName.win, this.selectTargetElement);
    }
    this.tag = new ViewerSubject({ tag, className, id, isParent, parent: viewParent });
    this.positionInParent = positionInParent;
    this.isChild = isChild;
    this.addEvent('mouseenter', this.highlightSubject);
    this.addEvent('mouseleave', this.dimSubject);
    this.addTagEvents(this.tag.openTag);
    if (this.tag.closeTag) {
      this.addTagEvents(this.tag.closeTag);
    }
    eventEmitter.on(EventName.resize, this.poseHint);
  }

  public placeChildInTheMiddleOfParent(): void {
    if (this.isChild) {
      const elementHeigth = this.getNode().clientHeight;
      this.stylize(
        'bottom',
        `calc(50% - ${elementHeigth / 2 + 5 - 15 * this.positionInParent}px)`
      );
      this.stylize('position', 'absolute');
    }
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

  public poseHint = (): void => {
    const coordinates = this.getNode().getBoundingClientRect();
    if (window.innerWidth >= 600) {
      this.hint.stylize('left', `${coordinates.left + coordinates.width / 2}px`);
    } else {
      this.hint.stylize('left', `${coordinates.left - coordinates.width}px`);
    }
    this.hint.stylize('top', `${coordinates.top - 70}px`);
  };

  public destroy(): void {
    this.element.remove();
    this.hint.destroy();
  }

  public addTagEvents(tag: BaseComponent): void {
    tag.addEvent('mouseenter', this.highlight);
    tag.addEvent('mouseleave', this.dim);
  }

  private selectTargetElement = (): void => {
    this.removeClass('target');
    this.addClass('selected');
  };
}
