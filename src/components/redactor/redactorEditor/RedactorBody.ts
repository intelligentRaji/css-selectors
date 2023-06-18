import { BaseComponent } from '@/components/BaseComponent';

const defaultState = '';

export class RedactorEditor extends BaseComponent {
  constructor(blockName: string) {
    super({ className: [`${blockName}-editor`] });
  }
}
