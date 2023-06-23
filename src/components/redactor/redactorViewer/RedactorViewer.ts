import './redactorViewer.scss';
import { BaseComponent } from '@/components/BaseComponent';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
// import 'highlight.js/styles/a11y-dark.css';

export class RedactorViewer extends BaseComponent {
  private readonly codeWrapper: BaseComponent;

  constructor() {
    super({ tag: 'pre', className: ['redactor-viewer'] });
    this.codeWrapper = new BaseComponent({
      tag: 'code',
      className: ['redactor-viewer-container'],
      parent: this.element,
    });
    hljs.registerLanguage('xml', xml);
    this.codeWrapper.setInnerHTML(
      `<div>${hljs.highlight('<div class="table">', { language: 'xml' }).value}</div>`
    );
  }
}
