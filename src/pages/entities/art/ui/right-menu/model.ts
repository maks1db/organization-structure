import { createEvent, createStore } from 'effector';
import { createBaseStore } from 'shared/lib/effector';

interface ArtEmployee {
  name: string;
  id: string;
}

export const setMenuVisibility = createEvent();
export const toggleMenuVisibility = createEvent();

export const [$employees, setEmployees] = createBaseStore<ArtEmployee[]>([]);

export const $isOpened = createStore(false)
  .on(setMenuVisibility, (_, payload) => payload)
  .on(toggleMenuVisibility, state => !state);
