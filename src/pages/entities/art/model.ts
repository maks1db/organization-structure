import { createEffect, createStore, sample, combine } from 'effector';
import { entities } from 'features/routing';
import { showAppMessage } from 'features/show-message';
import { always, isNil, pipe, T } from 'ramda';
import { getEntityArt } from 'shared/api/entities';
import { getResultFromResponse } from 'shared/lib/entities';
import { ArtType } from 'shared/types/api';

import { setHeader, makeTitle } from 'widgets/header';
import { prepareArtPositionsRawArtEmployees } from './lib';
import {
  setArtStructure,
  resetArtStructure,
  artModified,
} from './ui/art-structure';

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

export const $isModify = createStore(false);

sample({
  clock: entities.art.$isOpened,
  source: entities.art.$params,
  filter: (_, isOpened) => isOpened,
  fn: source => source,
  target: getEntityArtFx,
});

sample({
  clock: $art,
  filter: art => art !== null && art.isRaw === true,
  fn: always(OPEN_RAW_ART_MESSAGE),
  target: showAppMessage('success'),
});

sample({
  clock: getEntityArtFx.failData,
  fn: always(ERROR_LOAD_MESSAGE),
  target: showAppMessage('danger'),
});

sample({
  clock: artModified,
  fn: T,
  target: $isModify,
});

combine([$art, $isModify]).watch(console.log);

sample({
  clock: combine([$art, $isModify]),
  fn: ([art, isModify]) => makeTitle(art?.name || '', isModify),
  target: setHeader,
});

sample({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  clock: $art,
  filter: art => art !== null,
  target: setArtStructure,
});

sample({
  clock: $art,
  filter: isNil,
  target: resetArtStructure,
});
