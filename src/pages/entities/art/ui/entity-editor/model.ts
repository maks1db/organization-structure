import { sample, createEvent } from 'effector';
import { createBaseStore } from 'shared/lib/effector';
import { EntityType } from 'shared/types/api';
import { always } from 'ramda';
import { getEntityTitle } from './lib';
import { domain } from './shared';

import { getEntityItems } from './components/table';

export const [$entity, setEntityType] = createBaseStore<EntityType | ''>(
  '',
  domain
);
export const $entityTitle = $entity.map(getEntityTitle);

export const [$isOpened, setEntityEditorVisibility] = createBaseStore(
  false,
  domain
);

export const entityIdSelected = createEvent<string>();

sample({
  clock: $entity,
  filter: e => e !== '',
  target: getEntityItems,
});

sample({
  clock: entityIdSelected,
  fn: always(false),
  target: setEntityEditorVisibility,
});

// TODO:  Временно!!!
setTimeout(() => {
  setEntityType('employee');
}, 10);
