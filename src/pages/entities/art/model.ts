import { createEffect, sample, createStore, createEvent } from 'effector';
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

const $fixedArt = getEntityArtFx.doneData.map(
  pipe(getResultFromResponse, prepareArtPositionsRawArtEmployees)
);

export const removeArtEmployee = createEvent<string>();
export const $art = createStore<ArtType | null>(null)
  .on($fixedArt, (_, payload) => payload)
  .on(removeArtEmployee, (state, payload) => {
    if (state?.employees) {
      state.employees = state?.employees.filter(x => x._id !== payload);
    }

    return state;
  });

export const $columnsRange = $art.map(getColumnsRange);
export const $rowsRange = $art.map(getRowsRange);

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
