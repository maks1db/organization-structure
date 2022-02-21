import { createBaseStore } from 'shared/lib/effector';
import { SearchResult } from 'shared/types/api';
import * as api from 'shared/api/search';

import { sample, createEffect } from 'effector';
import { always } from 'ramda';
import { searchValueUpdated } from './ui/search-input/model';

searchValueUpdated.watch(s => console.log('query', s));

export const searchFx = createEffect(api.search);

export const [$searchResults, setSearchResults] = createBaseStore<
  SearchResult[]
>([]);

sample({
  clock: searchValueUpdated,
  source: $searchResults,
  filter: (_, clock) => clock !== '',
  fn: (source, clock) => ({ search: clock, skip: source.length }),
  target: searchFx,
});

sample({
  clock: searchValueUpdated,
  filter: clock => clock === '',
  fn: always([]),
  target: setSearchResults,
});
