import { sample, createEvent, combine } from 'effector';
import { always, not } from 'ramda';
import { createBaseStore } from 'shared/lib/effector';
import { domain } from '../../shared';

export const [
  $isSelectBackgroundColorOpened,
  setSelectBackgroundColorVisibility,
] = createBaseStore(false, domain);

export const [$isSelectFontColorOpened, setSelectFontColorVisibility] =
  createBaseStore(false, domain);

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

export const $font = combine({
  bold: $isBold,
  color: $textColor,
  italic: $isItalic,
  underline: $isUnderline,
});

sample({
  clock: [$textColor, $backgroundColor],
  fn: always(false),
  target: [setSelectBackgroundColorVisibility, setSelectFontColorVisibility],
});
