import { SelectItem } from 'shared/types/entities-api';
import { makeEntityPreview } from 'shared/lib/entities';

interface FilterItemsParams {
  items: SelectItem[];
  excludeIds: string[];
  filter: string;
}

export const filterItems = ({
  excludeIds,
  filter,
  items,
}: FilterItemsParams) => {
  const filterValue = filter.trim().toLowerCase();

  const preparedItems = items
    .filter(
      x =>
        !excludeIds.includes(x.id) && x.name.toLowerCase().includes(filterValue)
    )
    .map(x => ({
      ...x,
      name: makeEntityPreview(x),
    }));

  return preparedItems;
};
