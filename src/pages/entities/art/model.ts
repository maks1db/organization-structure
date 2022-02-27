import {
  createEffect,
  sample,
  createStore,
  createEvent,
  combine,
} from 'effector';
import { entities } from 'features/routing';
import { getEntityArt } from 'shared/api/entities';
import { ArtType } from 'shared/types/api';
import { getResultFromResponse } from 'shared/lib/entities';
import { showAppMessage } from 'features/show-message';
import { always, pipe } from 'ramda';
import { pushCells } from './ui/cell';
import {
  buildsEmployeeCells,
  getRange,
  prepareArtPositionsRawArtEmployees,
} from './lib';
import { setHeader, setIsArtModified } from './ui/header';

const ERROR_LOAD_MESSAGE =
  'Не удалось загрузить арт. Проверьте правильность ссылки';
const OPEN_RAW_ART_MESSAGE =
  'Сотрудники были распределены автоматически по ролям. Проверьте правильность операции';

type SyncEventType = {
  x: number;
  y: number;
  ids: string[];
};

const getEntityArtFx = createEffect(getEntityArt);

export const $fixedArt = getEntityArtFx.doneData.map(
  pipe(getResultFromResponse, prepareArtPositionsRawArtEmployees)
);

export const removeRow = createEvent<string>();
export const removeColumn = createEvent<string>();
export const removeArtEmployeeByRowIndex = createEvent<string>();
export const syncEmployees = createEvent<SyncEventType>();
const setEmployees = createEvent<ArtType['employees']>();

export const $employees = createStore<ArtType['employees']>([])
  .on($fixedArt, (_, payload) => payload.employees)
  .on(setEmployees, (_, payload) => payload)
  .on(removeArtEmployeeByRowIndex, (state, payload) =>
    state.filter(x => x._id !== payload)
  )
  .on(removeRow, (state, id) =>
    state.map(x => {
      if (x.position?._id === id) {
        return { ...x, position: undefined };
      }
      return x;
    })
  )
  .on(removeColumn, (state, id) =>
    state.map(x => {
      if (x.team?._id === id) {
        return { ...x, team: undefined };
      }
      return x;
    })
  );

export const $positions = createStore<ArtType['positions']>([])
  .on($fixedArt, (_, payload) => payload.positions)
  .on(removeRow, (state, id) => state.filter(x => x.position._id !== id));

export const $teams = createStore<ArtType['teams']>([])
  .on($fixedArt, (_, payload) => payload.teams)
  .on(removeColumn, (state, id) => state.filter(x => x.team._id !== id));

// TODO: Мигрировать
export const $art = createStore<ArtType | null>(null).on(
  $fixedArt,
  (_, payload) => payload
);

export const $columnsRange = $teams.map(getRange);
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
  clock: [removeRow, removeColumn],
  source: combine([$employees, $positions, $teams]),
  fn: ([employees, positions, teams]) =>
    buildsEmployeeCells({ employees, positions, teams }),
  target: [pushCells, setIsArtModified],
});
