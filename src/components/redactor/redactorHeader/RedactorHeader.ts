import { BaseComponent } from '@/components/BaseComponent';

interface IRedactorHeader {
  title: string;
  fileName: string;
}

export class RedactorHeader extends BaseComponent {
  constructor({ title, fileName }: IRedactorHeader) {
    super({ className: [`redactor-header`] });
    const Title = new BaseComponent({
      tag: 'h2',
      className: [`redactor-title`],
      text: title,
    });
    const Language = new BaseComponent({
      tag: 'h2',
      className: [`redactor-language`],
      text: fileName,
    });
    this.insertChild(Title.getNode(), Language.getNode());
  }
}
