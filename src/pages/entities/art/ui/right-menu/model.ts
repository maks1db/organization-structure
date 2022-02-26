import { createEvent, createStore } from 'effector';
import { createBaseStore } from 'shared/lib/effector';

export const setMenuVisibility = createEvent();
export const toggleMenuVisibility = createEvent();

export const $isOpened = createStore(false)
  .on(setMenuVisibility, (_, payload) => payload)
  .on(toggleMenuVisibility, state => !state);
