import { sample } from 'effector';
import { always } from 'ramda';
import { createBaseStore } from 'shared/lib/effector';
import { domain, $textColor, $backgroundColor } from '../../model';

export const [
  $isSelectBackgroundColorOpened,
  setSelectBackgroundColorVisibility,
] = createBaseStore(false, domain);

export const [$isSelectFontColorOpened, setSelectFontColorVisibility] =
  createBaseStore(false, domain);

sample({
  clock: [$textColor, $backgroundColor],
  fn: always(false),
  target: [setSelectBackgroundColorVisibility, setSelectFontColorVisibility],
});
