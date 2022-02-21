import { createBaseStore } from 'shared/lib/effector';
import { SearchResult } from 'shared/types/api';
import * as api from 'shared/api/search';

import { sample, createEffect } from 'effector';
import { always, path } from 'ramda';
import { searchValueUpdated } from './ui/search-input/model';

export const searchFx = createEffect(api.search);

export const [$searchResult, setSearchResult] = createBaseStore<SearchResult[]>(
  []
);

sample({
  clock: searchValueUpdated,
  source: $searchResult,
  filter: (_, clock) => clock?.length > 0,
  fn: (_, clock) => ({ search: clock, skip: 0 }),
  target: searchFx,
});

sample({
  clock: searchValueUpdated,
  filter: clock => clock?.length === 0,
  fn: always([]),
  target: setSearchResult,
});

sample({
  clock: searchFx.doneData,
  fn: data => path(['data', 'result'], data),
  target: setSearchResult,
});
