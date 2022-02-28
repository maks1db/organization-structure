import { combine, createEvent, createStore, sample } from 'effector';
import { omit } from 'ramda';
import {
  ArtPositionType,
  ArtType,
  BaseTeamType,
  EmployeeType,
} from 'shared/types/api';

import { pushCells, addItem, removeItem } from '../cell';
import { setIsArtModified } from '../header';
import { buildsEmployeeCells, getRange } from './lib';

type RowIdType = { _id: string };
type AddEmployeeType = {
  position: ArtPositionType;
  employee: EmployeeType;
  team: BaseTeamType;
} & RowIdType;

export const removeRow = createEvent<string>();
export const removeColumn = createEvent<string>();
export const addColumn = createEvent<{ team: BaseTeamType } & RowIdType>();
export const addRow = createEvent<{ position: ArtPositionType } & RowIdType>();
export const setArtStructure = createEvent<ArtType>();
export const setEmployeePositionTeam = createEvent<{
  team: BaseTeamType;
  position: ArtPositionType;
  id: string;
}>();
export const removeEmployeePositionTeam = createEvent<string>();
export const addEmployee = createEvent<AddEmployeeType>();

export const $positions = createStore<ArtType['positions']>([])
  .on(setArtStructure, (_, payload) => payload.positions)
  .on(removeRow, (state, id) => state.filter(x => x.position._id !== id))
  .on(addRow, (state, payload) => [...state, payload]);

export const $teams = createStore<ArtType['teams']>([])
  .on(setArtStructure, (_, payload) => payload.teams)
  .on(removeColumn, (state, id) => state.filter(x => x.team._id !== id))
  .on(addColumn, (state, payload) => [...state, payload]);

export const $employees = createStore<ArtType['employees']>([])
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

sample({
  clock: [removeRow, removeColumn, addColumn, addRow, addEmployee],
  source: $source,
  fn: ([employees, positions, teams]) =>
    buildsEmployeeCells({ employees, positions, teams }),
  target: [pushCells, setIsArtModified],
});

sample({
  clock: removeItem,
  fn: item => item.id || '',
  target: removeEmployeePositionTeam,
});

sample({
  clock: addItem,
  source: combine([$positions, $teams]),
  fn: ([positions, teams], item) => ({
    position: positions[item.y - 1].position,
    team: teams[item.x - 1].team,
    id: item.value.uid,
  }),
  target: setEmployeePositionTeam,
});
