import { EntityType } from 'shared/types/api';

export interface EditorParams {
  anchor: HTMLElement | null;
  entity: EntityType;
  onUpdateProps?: () => void;
  onSelectValue?: (entity: any) => void;
  excludeIds?: string[];
}
