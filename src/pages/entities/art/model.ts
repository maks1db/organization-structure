import { createEffect, sample, createStore } from 'effector';
import { entities } from 'features/routing';
import { getEntityArt } from 'shared/api/entities';
import { ArtType } from 'shared/types/api';
import { getResultFromResponse } from 'shared/lib/entities';
import { showAppMessage } from 'features/show-message';
import { always, pipe } from 'ramda';
import { pushCells } from './ui/cell';
import {
  buildsEmployeeCells,
  getColumnsRange,
  getRowsRange,
  prepareArtPositionsRawArtEmployees,
} from './lib';
import { setHeader } from './ui/header';

const ERROR_LOAD_MESSAGE =
  'Не удалось загрузить арт. Проверьте правильность ссылки';
const OPEN_RAW_ART_MESSAGE =
  'Сотрудники были распределены автоматически по ролям. Проверьте правильность операции';

const getEntityArtFx = createEffect(getEntityArt);
export const $art = createStore<ArtType | null>(null).on(
  getEntityArtFx.doneData,
  (_, payload) =>
    pipe(getResultFromResponse, prepareArtPositionsRawArtEmployees)(payload)
);

export const $columnsRange = $art.map(art => (art ? getColumnsRange(art) : []));
export const $rowsRange = $art.map(art => (art ? getRowsRange(art) : []));

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
  filter: art => art !== null,
  fn: art => buildsEmployeeCells(art as ArtType),
  target: pushCells,
});

sample({
  clock: $art,
  fn: art => art?.name || '',
  target: setHeader,
});
