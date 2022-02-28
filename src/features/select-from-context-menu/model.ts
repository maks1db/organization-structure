import { createEvent, sample, createDomain } from 'effector';
import { equals, isNil, not, pipe, T } from 'ramda';
import { createBaseStore } from 'shared/lib/effector';
import { MenuItemType } from './types';

const reset = createEvent();
const domain = createDomain();
domain.onCreateStore(store => store.reset(reset));

export const openContextMenu = createEvent<HTMLElement>();
export const $anchor = domain
  .createStore<HTMLElement | null>(null)
  .on(openContextMenu, (_, anchor) => anchor);

export const [$menu, setContextMenu] = createBaseStore<MenuItemType[]>(
  [],
  domain
);

export const [$isOpened, setMenuOpened] = createBaseStore(false, domain);

sample({
  clock: $anchor,
  filter: pipe(isNil, not),
  fn: T,
  target: setMenuOpened,
});

sample({
  clock: $isOpened,
  filter: equals(false),
  target: reset,
});
