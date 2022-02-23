import { createBaseStore } from 'shared/lib/effector';
import { createDomain, createEvent, combine } from 'effector';
import { not } from 'ramda';
import { EntityType } from 'shared/types/api';
import { getEntityTitle } from './lib';

const reset = createEvent();

export const domain = createDomain();
domain.onCreateStore(store => store.reset(reset));

export const [$entity, setEntityType] = createBaseStore<EntityType>(
  'art',
  domain
);
export const $entityTitle = $entity.map(getEntityTitle);

export const [$isOpened, setEntityEditorVisibility] = createBaseStore(
  false,
  domain
);

export const toggleBold = createEvent();
export const toggleUnderline = createEvent();
export const toggleItalic = createEvent();

export const $isBold = domain.createStore(false).on(toggleBold, not);
export const $isUnderline = domain.createStore(false).on(toggleUnderline, not);
export const $isItalic = domain.createStore(false).on(toggleItalic, not);

export const [$backgroundColor, setBackgroundColor] = createBaseStore(
  '',
  domain
);
export const [$textColor, setTextColor] = createBaseStore('', domain);

const $font = combine({
  bold: $isBold,
  color: $textColor,
  italic: $isItalic,
  underline: $isUnderline,
});

export const $store = combine({
  color: $backgroundColor,
  font: $font,
});
