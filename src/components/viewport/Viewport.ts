import './viewport.scss';
import { ISubject } from '@/interfaces/subject';
import elements from '@/json/elements.json';
import { gameModel } from '@/models/GameModel';
import { eventEmitter } from '@/services/eventEmitter/EventEmitter';
import { EventName } from '@/enums/EventName';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { Subject } from '../subject/Subject';
import { ViewerSubject } from '../viewerSubject/ViewerSubject';

export class Viewport extends BaseComponent {
  private readonly table: BaseComponent;
  private tag!: ViewerSubject;
  private subjects: Subject[] = [];

  constructor() {
    super({ className: ['viewport'] });
    this.table = new BaseComponent({
      tag: 'div',
      className: ['table'],
      parent: this.getNode(),
    });
    const tableEdge = new BaseComponent({
      tag: 'div',
      className: ['table-edge'],
      parent: this.getNode(),
    });
    eventEmitter.on(EventName.onWin, this.win);
    const media = window.matchMedia('(max-width: 850px)');
    media.addEventListener('change', this.onResize);
  }

  private createElements(
    subjects: ISubject[],
    parent = this.table.getNode(),
    isChild = false,
    viewParent = this.tag
  ): void {
    eventEmitter.emit(EventName.generateSubject, this.tag.getNode());
    subjects.forEach((item: ISubject, index: number) => {
      const isParent = Boolean(item.childs);
      const subject = new Subject({
        parent,
        isParent,
        isChild,
        viewParent,
        positionInParent: index,
        ...item,
      });
      this.subjects.push(subject);
      subject.placeChildInTheMiddleOfParent();
      if (isParent) {
        this.createElements(item.childs, subject.getNode(), true, subject.getTag());
      }
    });
  }

  private poseHints(): void {
    this.subjects.forEach((item) => item.poseHint());
  }

  public loadData(level: number): void {
    this.tag = new ViewerSubject({ tag: 'div', className: ['table'], isParent: true });
    this.subjects.forEach((item) => item.destroy());
    this.subjects = [];
    this.createElements(elements[level]);
    this.poseHints();
  }

  private win = (): void => {
    this.subjects.forEach((item) => item.destroy());
    const winner = new BaseComponent({
      tag: 'p',
      className: ['winner'],
      parent: this.table.getNode(),
    });
    winner.setInnerHTML('<span><strong>You did it!</strong><br>You rock at CSS</span>');
    this.subjects.push(winner as Subject);
  };

  private onResize = (): void => {
    gameModel.clearTargetElements();
    this.loadData(gameModel.getLevel());
  };
}
