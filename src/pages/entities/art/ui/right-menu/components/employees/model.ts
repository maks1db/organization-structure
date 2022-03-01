import {
  createEffect,
  createEvent,
  sample,
  createStore,
  combine,
} from 'effector';
import { createBaseStore } from 'shared/lib/effector';
import { EmployeeType } from 'shared/types/api';
import { SelectItem } from 'shared/types/entities-api';
import { getEmployees } from 'shared/api/entities';
import { getResultFromResponse } from 'shared/lib/entities';

export const fetchEmployees = createEvent();
const getEmployeesFx = createEffect(getEmployees);

export const [$filterIds, setFilterIds] = createBaseStore<string[]>([]);
const $employees = createStore<SelectItem[]>([]).on(
  getEmployeesFx.doneData,
  (_, payload) => getResultFromResponse(payload)
);
export const [$filter, setFilterValue] = createBaseStore('');

export const $filterEmployees = combine(
  $employees,
  $filterIds,
  $filter,
  (employees, filterIds, filter) => {
    const value = filter.toLowerCase();

    return employees
      .map(x => (x?.data || x) as EmployeeType)
      .filter(x => {
        return !filterIds.includes(x._id);
      })
      .filter(x => {
        return value === ''
          ? true
          : x.name.trim().toLowerCase().includes(value);
      });
  }
);

sample({
  clock: fetchEmployees,
  source: $employees,
  filter: employees => employees.length === 0,
  target: getEmployeesFx,
});
