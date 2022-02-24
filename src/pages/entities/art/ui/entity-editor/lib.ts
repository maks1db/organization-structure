import { EntityType } from 'shared/types/api';

export const getEntityTitle = (entity: EntityType | '') => {
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
