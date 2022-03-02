import { reports } from 'features/routing';
import { getEntityArt } from 'shared/api/entities';
import { combine, createEffect, createStore, sample } from 'effector';
import { ArtType } from 'shared/types/api';
import { showAppMessage } from 'features/show-message';
import { always } from 'ramda';
import { getResultFromResponse } from 'shared/lib/api';

const ERROR_MESSAGE = 'Не удалось загрузить данные арта. Попробуйте позднее';

const getEntityArtFx = createEffect(getEntityArt);

export const $art = createStore<ArtType | null>(null).on(
  getEntityArtFx.doneData,
  (_, payload) => getResultFromResponse(payload)
);
export const $enablePlaceholder = createStore(true).on(
  $art,
  (_, art) => art?.isRaw !== true
);

export const $store = combine({
  data: $art,
  isFetching: getEntityArtFx.pending,
});

sample({
  clock: reports.art.$isOpened,
  source: reports.art.$params,
  filter: (_, isOpened) => isOpened === true,
  target: getEntityArtFx,
});

sample({
  clock: reports.art.$isOpened,
  filter: isOpened => isOpened === false,
  fn: always(null),
  target: $art,
});

sample({
  clock: getEntityArtFx.fail,
  fn: always(ERROR_MESSAGE),
  target: showAppMessage('danger'),
});
