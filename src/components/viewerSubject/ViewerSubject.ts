import { ISubject } from '@/interfaces/subject';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { BaseComponent } from '../BaseComponent';

interface IViewerSubject extends Omit<ISubject, 'childs' | 'tag'> {
  tag: string;
  parent?: ViewerSubject;
  isParent?: boolean;
}

export class ViewerSubject extends BaseComponent {
  public openTag!: BaseComponent;
  public closeTag!: BaseComponent;

  constructor({ tag, className, id, parent, isParent }: IViewerSubject) {
    super({ tag: 'div', className: ['element'] });
    if (parent) {
      parent.insertChildren(this.getNode());
    }
    hljs.registerLanguage('xml', xml);
    this.createTags({ tag, className, id, isParent });
  }

  private createTags({
    tag,
    className,
    id,
    isParent,
  }: Omit<IViewerSubject, 'parent'>): void {
    const slash = isParent ? '' : ' /';
    const classAtribute = className ? ` class="${className}"` : '';
    const idAttribute = id ? ` id="${id}"` : '';
    this.openTag = new BaseComponent({
      tag: 'div',
      className: ['open-tag'],
      parent: this.getNode(),
    });
    this.openTag.setInnerHTML(
      hljs.highlight(`<${tag}${idAttribute}${classAtribute}${slash}>`, {
        language: 'xml',
      }).value
    );
    if (isParent) {
      this.closeTag = new BaseComponent({
        tag: 'div',
        className: ['close-tag'],
        parent: this.getNode(),
      });
      this.closeTag.setInnerHTML(
        hljs.highlight(`</${tag}>`, {
          language: 'xml',
        }).value
      );
    }
  }

  public insertChildren(...childs: HTMLElement[]): void {
    this.closeTag.getNode().before(...childs);
  }
}
