import { CustomTags } from '@/types/customTags';

export interface ISubject {
  tag: CustomTags;
  id?: string;
  target?: true;
  className?: string[];
  childs: ISubject[];
}
