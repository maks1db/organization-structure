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
import { getArtPositions, getEmployees, getTeams } from 'shared/api/entities';
import { path, identity, always } from 'ramda';
import { filterItems } from './lib';

import { getEntityTitle } from '../../lib';
import { domain } from '../../shared';

export const getEntityItems = createEvent<{
  entity: EntityType | null;
  excludeIds: string[];
}>();
export const setActiveElement = createEvent<SelectItem>();
export const setFilterValue = createEvent<string>();

export const getArtPositionsFx = createEffect(getArtPositions);
export const getEmployeesFx = createEffect(getEmployees);
export const getTeamsFx = createEffect(getTeams);

const $entity = createStore<EntityType | null>(null).on(
  getEntityItems,
  (_, { entity }) => entity
);
export const $items = createStore<SelectItem[]>([]);
export const $excludeIds = createStore<string[]>([]).on(
  getEntityItems,
  (_, { excludeIds }) => excludeIds
);
export const $filter = domain
  .createStore('')
  .on(setFilterValue, (_, payload) => payload);

export const $activeElement = createStore<SelectItem | null>(null).on(
  setActiveElement,
  (state, payload) => (state?.id === payload?.id ? null : payload)
);

export const $entityTitle = $entity.map(getEntityTitle);
export const $isFetching = combine(
  [getArtPositionsFx.pending, getEmployeesFx.pending],
  data => data.some(Boolean)
);

export const $filterResult = combine(
  [$items, $filter, $excludeIds],
  ([items, filter, excludeIds]) => filterItems({ items, filter, excludeIds })
);

sample({
  clock: [
    getArtPositionsFx.doneData,
    getEmployeesFx.doneData,
    getTeamsFx.doneData,
  ],
  fn: data => path(['data', 'result'], data),
  target: $items,
});

split({
  source: sample({ clock: $entity, filter: e => e !== null }),
  match: identity,
  cases: {
    employee: getEmployeesFx,
    artPosition: getArtPositionsFx,
    team: getTeamsFx,
  },
});

sample({
  clock: $entity,
  fn: always([]),
  target: $items,
});
