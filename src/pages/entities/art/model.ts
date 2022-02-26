import { createEffect, sample, createStore } from 'effector';
import { entities } from 'features/routing';
import { getEntityArt } from 'shared/api/entities';
import { ArtType } from 'shared/types/api';
import { getResultFromResponse } from 'shared/lib/entities';
import { showAppMessage } from 'features/show-message';
import { always } from 'ramda';
import { pushCells } from './ui/cell';
import {
  buildsEmployeeCells,
  getColumnsRange,
  getRowsRange,
  makeArtEmployeesList,
} from './lib';
import { setEmployees } from './ui/right-menu';

const ERROR_LOAD_MESSAGE =
  'Не удалось загрузить арт. Проверьте правильность ссылки';

const getEntityArtFx = createEffect(getEntityArt);
export const $art = createStore<ArtType | null>(null).on(
  getEntityArtFx.doneData,
  (_, payload) => getResultFromResponse(payload)
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
  fn: art => makeArtEmployeesList(art),
  target: setEmployees,
});
