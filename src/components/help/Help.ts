import './help.scss';
import examples from '@/json/examples.json';
import titles from '@/json/title.json';
import syntaxes from '@/json/syntax.json';
import hints from '@/json/hint.json';
import selectorNames from '@/json/selectorName.json';
import { BaseComponent } from '../BaseComponent';

export class Help extends BaseComponent {
  private readonly selectorName: BaseComponent;
  private readonly title: BaseComponent;
  private readonly syntax: BaseComponent;
  private readonly hint: BaseComponent;
  private readonly examples: BaseComponent;

  constructor() {
    super({ className: ['help'] });
    this.selectorName = new BaseComponent({ tag: 'h2', className: ['selector-name'] });
    this.title = new BaseComponent({ tag: 'h3', className: ['title'] });
    this.syntax = new BaseComponent({ tag: 'h3', className: ['syntax'] });
    this.hint = new BaseComponent({ className: ['hint'] });
    const examplesTitle = new BaseComponent({
      tag: 'h3',
      className: ['examples-title'],
      text: 'Examples',
    });
    this.examples = new BaseComponent({ className: ['examples'] });
    this.insertChild(
      this.selectorName.getNode(),
      this.title.getNode(),
      this.syntax.getNode(),
      this.hint.getNode(),
      examplesTitle.getNode(),
      this.examples.getNode()
    );
  }

  private clearExamples(): void {
    while (this.examples.getNode().children[0]) {
      this.examples.getNode().children[0].remove();
    }
  }

  private setExamples(level: number): void {
    this.clearExamples();
    examples[level].forEach((item: string) => {
      const example = new BaseComponent({ className: ['example'] });
      example.setInnerHTML(item);
      this.examples.insertChild(example.getNode());
    });
  }

  private setSlectorName(level: number): void {
    this.selectorName.setTextContent(selectorNames[level]);
  }

  private setTitle(level: number): void {
    this.title.setTextContent(titles[level]);
  }

  private setSyntax(level: number): void {
    this.syntax.setTextContent(syntaxes[level]);
  }

  private setHint(level: number): void {
    this.hint.setInnerHTML(hints[level]);
  }

  public loadData(level: number): void {
    this.setExamples(level);
    this.setSlectorName(level);
    this.setTitle(level);
    this.setSyntax(level);
    this.setHint(level);
  }
}
