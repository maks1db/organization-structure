import { getDateLastUploadData } from 'shared/api/upload';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { isNil } from 'ramda';
import { parseDateHours } from 'shared/lib/date';

import * as routing from 'features/routing';

export const getLastUploadDate = createEvent();
export const getLastUploadDateFx = createEffect(getDateLastUploadData);

const $store = createStore('');
export const $lastUploadDate = $store.map(x =>
  x !== '' ? parseDateHours(new Date(x)) : ''
);

sample({
  clock: getLastUploadDate,
  target: getLastUploadDateFx,
});

sample({
  clock: [routing.search.$isOpened, routing.upload.$isOpened],
  source: $store,
  filter: source => source === '',
  target: getLastUploadDateFx,
});

sample({
  clock: getLastUploadDateFx.doneData,
  filter: x => !isNil(x.data.result),
  fn: res => res.data.result,
  target: $store,
});
