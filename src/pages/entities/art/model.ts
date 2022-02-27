import { createEffect, createStore, sample } from 'effector';
import { entities } from 'features/routing';
import { showAppMessage } from 'features/show-message';
import { always, pipe } from 'ramda';
import { getEntityArt } from 'shared/api/entities';
import { getResultFromResponse } from 'shared/lib/entities';
import { ArtType } from 'shared/types/api';

import { prepareArtPositionsRawArtEmployees } from './lib';
import { setHeader } from './ui/header';
import { setArtStructure } from './ui/art-structure';

const ERROR_LOAD_MESSAGE =
  'Не удалось загрузить арт. Проверьте правильность ссылки';
const OPEN_RAW_ART_MESSAGE =
  'Сотрудники были распределены автоматически по ролям. Проверьте правильность операции';

const getEntityArtFx = createEffect(getEntityArt);

const $art = createStore<ArtType | null>(null).on(
  getEntityArtFx.doneData,
  (_, payload) =>
    pipe(getResultFromResponse, prepareArtPositionsRawArtEmployees)(payload)
);

sample({
  clock: entities.art.$isOpened,
  source: entities.art.$params,
  filter: Boolean,
  fn: source => source,
  target: getEntityArtFx,
});

sample({
  clock: $art,
  filter: art => art?.isRaw === true,
  fn: always(OPEN_RAW_ART_MESSAGE),
  target: showAppMessage('success'),
});

sample({
  clock: getEntityArtFx.failData,
  fn: always(ERROR_LOAD_MESSAGE),
  target: showAppMessage('danger'),
});

sample({
  clock: $art,
  fn: art => art?.name || '',
  target: setHeader,
});

sample({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  clock: $art,
  filter: art => art !== null,
  target: setArtStructure,
});
