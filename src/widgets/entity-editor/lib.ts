import { EntityType } from 'shared/types/api';

export const getEntityTitle = (entity: EntityType | null) => {
  if (entity === 'art') {
    return 'Арты';
  }
  if (entity === 'employee') {
    return 'Сотрудники';
  }
  if (entity === 'team') {
    return 'Команды';
  }
  if (entity === 'artPosition') {
    return 'Роли арта';
  }

  return undefined;
};
