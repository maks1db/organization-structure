import { SelectItem } from 'shared/types/entities-api';
import { EntityType } from 'shared/types/api';
import { makeEntityPreview } from 'shared/lib/entities';

export const prepareItems = (entity: EntityType | '', items: SelectItem[]) => {
  const result =
    entity === 'employee'
      ? items.map(x => ({ id: x.id, name: makeEntityPreview(x) }))
      : items;

  return result;
};

export const filterItems = (filter: string, items: SelectItem[]) => {
  if (filter === '') {
    return items;
  }

  const filterValue = filter.trim().toLowerCase();

  return items.filter(x => x.name.toLowerCase().includes(filterValue));
};