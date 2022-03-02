import { isNil, take } from 'ramda';
import { SelectItem } from '../types/entities-api';

const makeSelectItemEnding = (item: Partial<SelectItem>) => {
  if ((item.workType || '').toLowerCase().includes('аут')) {
    return 'А';
  }

  if (!isNil(item.workType)) {
    return 'Ш';
  }

  return undefined;
};

export const makeEntityPreview = (item: Partial<SelectItem>) => {
  if (item.vacancy === 'outstaff') {
    return 'Вакансия (А)';
  }

  if (item.vacancy === 'state') {
    return 'Вакансия (Ш)';
  }
  const ending = makeSelectItemEnding(item);
  const name = take(2, (item?.name || '').split(' ')).join(' ');

  return ending ? `${name} (${ending})` : name;
};
