import { EntityType, VacancyType } from 'shared/types/api';
import * as Icons from './Icons';

export interface LinkButtonProps {
  icon: keyof typeof Icons;
  link: string;
  className?: string;
}

export interface Item {
  name: string;
  _id: string;
  workType?: string;
  entity: EntityType;
  vacancy?: VacancyType;
}

export interface CellProps {
  data?: Item[];
  name?: string;
  width?: number;
  height?: number;
  className?: string;
  itemsPosition?: 'right';
}
