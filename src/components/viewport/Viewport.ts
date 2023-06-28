import './viewport.scss';
import { ISubject } from '@/interfaces/subject';
import elements from '@/json/elements.json';
import { eventEmitter } from '@/services/EventEmitter';
import { EventName } from '@/enums/EventName';
import { BaseComponent } from '../BaseComponent';
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
      parent: this.table.getNode(),
    });
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
        viewParent,
        onWin: this.win,
        ...item,
      });
      this.subjects.push(subject);
      if (isChild) {
        subject.placeChildInTheMiddleOfParent(index);
      }
      if (item.childs) {
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
      text: `You did it! 
      You rock at CSS.`,
    });
    this.subjects.push(winner as Subject);
  };
}
