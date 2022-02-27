import { createEffect, sample, createStore, createEvent } from 'effector';
import { entities } from 'features/routing';
import { getEntityArt } from 'shared/api/entities';
import { ArtType } from 'shared/types/api';
import { getResultFromResponse } from 'shared/lib/entities';
import { showAppMessage } from 'features/show-message';
import { always, pipe } from 'ramda';
import { pushCells, removeItemsByRow } from './ui/cell';
import {
  buildsEmployeeCells,
  getColumnsRange,
  getRange,
  prepareArtPositionsRawArtEmployees,
} from './lib';
import { setHeader } from './ui/header';

const ERROR_LOAD_MESSAGE =
  'Не удалось загрузить арт. Проверьте правильность ссылки';
const OPEN_RAW_ART_MESSAGE =
  'Сотрудники были распределены автоматически по ролям. Проверьте правильность операции';

const getEntityArtFx = createEffect(getEntityArt);

export const $fixedArt = getEntityArtFx.doneData.map(
  pipe(getResultFromResponse, prepareArtPositionsRawArtEmployees)
);

export const removeArtEmployeeByRowIndex = createEvent<string>();
export const $employees = createStore<ArtType['employees']>([])
  .on($fixedArt, (_, payload) => payload.employees)
  .on(removeArtEmployeeByRowIndex, (state, payload) =>
    state.filter(x => x._id !== payload)
  );

type RowEventType = {
  row: number;
  id: string;
};
export const removeRow = createEvent<RowEventType>();
export const $positions = createStore<ArtType['positions']>([])
  .on($fixedArt, (_, payload) => payload.positions)
  .on(removeRow, (state, { id }) => state.filter(x => x.position._id !== id));

export const $teams = createStore<ArtType['teams']>([]).on(
  $fixedArt,
  (_, payload) => payload.teams
);

// TODO: Мигрировать
export const $art = createStore<ArtType | null>(null).on(
  $fixedArt,
  (_, payload) => payload
);

export const $columnsRange = $art.map(getColumnsRange);
export const $rowsRange = $positions.map(getRange);

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
  clock: $fixedArt,
  filter: art => art !== null,
  fn: art => buildsEmployeeCells(art as ArtType),
  target: pushCells,
});

sample({
  clock: $art,
  fn: art => art?.name || '',
  target: setHeader,
});

sample({
  clock: removeRow,
  fn: params => params.row,
  target: removeItemsByRow,
});
