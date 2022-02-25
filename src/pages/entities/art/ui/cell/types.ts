import { EntityType } from 'shared/types/api';
import { SelectItem } from 'shared/types/entities-api';

export type CellPosition = {
  x: number;
  y: number;
};

export type CellType = {
  type: EntityType;
  entities: SelectItem[];
} & CellPosition;
