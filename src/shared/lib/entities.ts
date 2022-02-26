import { isNil, path, take } from 'ramda';
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
  const ending = makeSelectItemEnding(item);
  const name = take(2, (item?.name || '').split(' ')).join(' ');

  return `${name} (${ending})`;
};

export const getResultFromResponse = (data: any) =>
  path(['data', 'result'], data) as any;
