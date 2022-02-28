import { sample, createEvent, createStore, createEffect } from 'effector';
import { EntityType } from 'shared/types/api';
import { always, equals, F, T } from 'ramda';
import { SelectItem } from 'shared/types/entities-api';
import { getEntityTitle } from './lib';
import { reset } from './shared';

import { getEntityItems, setActiveElement } from './components/table';
import { EditorParams } from './types';

interface EventRunnerProps {
  event: any;
  data: any;
}

export const openEntityEditor = createEvent<EditorParams>();
export const closeEditor = createEvent();

export const runEventFx = createEffect(({ data, event }: EventRunnerProps) => {
  event?.(data);
});

export const $entity = createStore<EntityType | null>(null).on(
  openEntityEditor,
  (_, { entity }) => entity
);
export const $isOpened = createStore(false)
  .on(openEntityEditor, T)
  .on(closeEditor, F);

export const $anchor = createStore<HTMLElement | null>(null).on(
  openEntityEditor,
  (_, { anchor }) => anchor
);
export const $selectEvent = createStore<((item: any) => void) | null>(null).on(
  openEntityEditor,
  (_, { onSelectValue }) => onSelectValue
);

export const $selectEntityEnabled = createStore(true);
export const $modifyParamsEnabled = createStore(true);

export const $entityTitle = $entity.map(getEntityTitle);

export const entitySelected = createEvent<SelectItem>();

sample({
  clock: $entity,
  filter: e => e !== null,
  target: getEntityItems,
});

sample({
  clock: entitySelected,
  source: $selectEvent,
  fn: (event, data) => ({ event, data }),
  target: [runEventFx, closeEditor],
});

sample({
  clock: $isOpened,
  filter: equals(false),
  fn: always(null),
  target: [$anchor, $selectEvent, setActiveElement, reset],
});
