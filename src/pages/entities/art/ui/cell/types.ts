import { EntityType } from 'shared/types/api';
import { SelectItem } from 'shared/types/entities-api';

export type CellType = {
  x: number;
  y: number;
  type: EntityType;
  entities: SelectItem[];
};
