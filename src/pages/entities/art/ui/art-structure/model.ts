/* eslint-disable @typescript-eslint/member-delimiter-style */
import { combine, createEvent, sample } from 'effector';
import { omit, T } from 'ramda';
import {
  ArtPositionType,
  ArtType,
  BaseTeamType,
  EmployeeType,
  VacancyType,
} from 'shared/types/api';
import { createResetDomain } from 'shared/lib/effector';

import { pushCells, addItem, removeItem } from '../cell';
import { buildsEmployeeCells, getRange, moveItem } from './lib';

type RowIdType = { _id: string };
type AddEmployeeType = {
  position: ArtPositionType;
  employee?: EmployeeType;
  team: BaseTeamType;
  vacancy?: VacancyType;
} & RowIdType;

export const { domain, reset: resetArtStructure } = createResetDomain();

export const removeRow = createEvent<string>();
export const removeColumn = createEvent<string>();
export const addColumn = createEvent<{ team: BaseTeamType } & RowIdType>();
export const addRow = createEvent<{ position: ArtPositionType } & RowIdType>();
export const moveRow = createEvent<{ from: number; to: number }>();
export const moveColumn = createEvent<{ from: number; to: number }>();
export const setArtStructure = createEvent<ArtType>();
export const setEmployeePositionTeam = createEvent<{
  team: BaseTeamType;
  position: ArtPositionType;
  id: string;
}>();
export const removeEmployeePositionTeam = createEvent<string>();
export const addEmployee = createEvent<AddEmployeeType>();
export const artModified = createEvent();

export const $positions = domain
  .createStore<ArtType['positions']>([])
  .on(setArtStructure, (_, payload) => payload.positions)
  .on(removeRow, (state, id) => state.filter(x => x.position._id !== id))
  .on(addRow, (state, payload) => [...state, payload])
  .on(moveRow, (state, { from, to }) => moveItem(from, to, state));

export const $teams = domain
  .createStore<ArtType['teams']>([])
  .on(setArtStructure, (_, payload) => payload.teams)
  .on(removeColumn, (state, id) => state.filter(x => x.team._id !== id))
  .on(addColumn, (state, payload) => [...state, payload])
  .on(moveColumn, (state, { from, to }) => moveItem(from, to, state));

export const $employees = domain
  .createStore<ArtType['employees']>([])
  .on(setArtStructure, (_, payload) => payload.employees)
  .on(removeEmployeePositionTeam, (state, payload) =>
    state.map(x => {
      if (x.employee?._id === payload) {
        return omit(['team', 'position'], x);
      }
      return x;
    })
  )
  .on(setEmployeePositionTeam, (state, { id, position, team }) =>
    state.map(x => {
      if (x._id === id) {
        return { ...x, position, team };
      }
      return x;
    })
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
  )
  .on(addEmployee, (state, payload) => [...state, payload]);

export const $columnsRange = $teams.map(getRange);
export const $rowsRange = $positions.map(getRange);

sample({
  clock: setArtStructure,
  fn: art => buildsEmployeeCells(art as ArtType),
  target: pushCells,
});

const $source = combine([$employees, $positions, $teams]);

const updateEvents = [
  removeRow,
  removeColumn,
  addColumn,
  addRow,
  addEmployee,
  moveRow,
  moveColumn,
];

sample({
  clock: updateEvents,
  source: $source,
  fn: ([employees, positions, teams]) =>
    buildsEmployeeCells({ employees, positions, teams }),
  target: pushCells,
});

sample({
  clock: [...updateEvents, addItem, removeItem],
  fn: T,
  target: artModified,
});

sample({
  clock: removeItem,
  fn: item => item.id || '',
  target: removeEmployeePositionTeam,
});

sample({
  clock: addItem,
  source: combine([$positions, $teams]),
  // filter: (_, { x, y }) => x !== undefined && y !== undefined,
  fn: ([positions, teams], item) => ({
    position: positions[item.y - 1].position,
    team: teams[item.x - 1].team,
    id: item.value.uid,
  }),
  target: setEmployeePositionTeam,
});
