import { isNil, take } from 'ramda';
import { SelectItem } from '../types/entities-api';

const makeSelectItemEnding = (item: SelectItem) => {
  if ((item.workType || '').toLowerCase().includes('аут')) {
    return 'А';
  }

  if (!isNil(item.workType)) {
    return 'Ш';
  }

  return undefined;
};

export const makeEmployeePreview = (item: SelectItem) => {
  const ending = makeSelectItemEnding(item);
  const name = take(2, item.name.split(' ')).join(' ');

  return `${name} (${ending})`;
};
