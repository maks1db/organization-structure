/* eslint-disable @typescript-eslint/no-unused-vars */
import { createEffect, createEvent, sample } from 'effector';
import { createBaseStore } from 'shared/lib/effector';
import { search as searchRoute } from 'features/routing';

export const [$search, setSearchValue] = createBaseStore('');
export const searchValueUpdated = createEvent<string>();

let updateTimer: ReturnType<typeof setTimeout>;
const updateQueryFx = createEffect((value: string) => {
  clearTimeout(updateTimer);
  updateTimer = setTimeout(() => {
    searchRoute.navigate({
      params: {},
      query: {
        ...(value && { query: value }),
      },
    });
    searchValueUpdated(value);
  }, 500);
});

sample({
  clock: searchRoute.$isOpened,
  source: [searchRoute.$query, $search],
  filter: ([query, searchValue], isOpened) =>
    isOpened === true && query.search !== searchValue,
  fn: ([query]) => query.search,
  target: [$search, searchValueUpdated],
});

sample({
  clock: setSearchValue,
  target: updateQueryFx,
});
