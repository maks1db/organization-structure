import { reports } from 'features/routing';
import { getEntityEmployee } from 'shared/api/entities';
import { combine, createEffect, createStore, sample } from 'effector';
import { EmployeeType } from 'shared/types/api';
import { showAppMessage } from 'features/show-message';
import { always } from 'ramda';
import { getResultFromResponse } from 'shared/lib/api';

const ERROR_MESSAGE =
  'Не удалось загрузить данные по сотруднику. Попробуйте позднее';

const getEntityEmployeeFx = createEffect(getEntityEmployee);

export const $employee = createStore<EmployeeType | null>(null).on(
  getEntityEmployeeFx.doneData,
  (_, payload) => getResultFromResponse(payload)
);

export const $store = combine({
  data: $employee,
  isFetching: getEntityEmployeeFx.pending,
});

sample({
  clock: reports.employee.$isOpened,
  source: reports.employee.$params,
  filter: (_, isOpened) => isOpened === true,
  target: getEntityEmployeeFx,
});

sample({
  clock: reports.art.$isOpened,
  filter: isOpened => isOpened === false,
  fn: always(null),
  target: $employee,
});

sample({
  clock: getEntityEmployeeFx.fail,
  fn: always(ERROR_MESSAGE),
  target: showAppMessage('danger'),
});
