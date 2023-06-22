import { IListProps } from './IListProps';

export interface IRenderItem extends Omit<IListProps, 'data'> {
  item: any;
}
