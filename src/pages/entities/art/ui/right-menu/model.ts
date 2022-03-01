import { createEvent, createStore, sample } from 'effector';
import { equals } from 'ramda';

import { fetchEmployees } from './components/employees';

export const setMenuVisibility = createEvent();
export const toggleMenuVisibility = createEvent();

export const $isOpened = createStore(false)
  .on(setMenuVisibility, (_, payload) => payload)
  .on(toggleMenuVisibility, state => !state);

sample({
  clock: $isOpened,
  filter: equals(true),
  target: fetchEmployees,
});
