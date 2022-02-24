import {
  createEvent,
  createStore,
  sample,
  createEffect,
  split,
  combine,
} from 'effector';
import { SelectItem } from 'shared/types/entities-api';
import { EntityType } from 'shared/types/api';
import { getArtPositions, getEmployees } from 'shared/api/entities';
import { path, identity, always } from 'ramda';
import { filterItems, prepareItems } from './lib';

import { getEntityTitle } from '../../lib';
import { domain } from '../../shared';

export const getEntityItems = createEvent<EntityType | ''>();
export const setActiveId = createEvent<string>();
export const setFilterValue = createEvent<string>();

export const getArtPositionsFx = createEffect(getArtPositions);
export const getEmployeesFx = createEffect(getEmployees);

const $entity = createStore<EntityType | ''>('');
export const $items = createStore<SelectItem[]>([]);
export const $filter = domain
  .createStore('')
  .on(setFilterValue, (_, payload) => payload);

export const $activeId = createStore('').on(setActiveId, (state, payload) =>
  state === payload ? '' : payload
);

export const $entityTitle = $entity.map(getEntityTitle);
export const $isFetching = combine(
  [getArtPositionsFx.pending, getEmployeesFx.pending],
  data => data.some(Boolean)
);
const $modifyItems = combine([$items, $entity], ([items, entity]) =>
  prepareItems(entity, items)
);
export const $filterResult = combine(
  [$modifyItems, $filter],
  ([items, filter]) => filterItems(filter, items)
);

sample({
  clock: getEntityItems,
  target: $entity,
});

sample({
  clock: [getArtPositionsFx.doneData, getEmployeesFx.doneData],
  fn: data => path(['data', 'result'], data),
  target: $items,
});

split({
  source: sample({ clock: $entity, filter: e => e !== '' }),
  match: identity,
  cases: {
    employee: getEmployeesFx,
    artPosition: getArtPositionsFx,
  },
});

sample({
  clock: $entity,
  fn: always([]),
  target: $items,
});
