import { sample, createEffect, createEvent, combine } from 'effector';
import { router } from 'features/routing';
import { BrowserHistory } from 'history';
import { createBaseStore } from 'shared/lib/effector';
import { makeArtTitle } from './lib';

export const goBack = createEvent();

const goBackFx = createEffect((history: BrowserHistory) => history.back());

export const [$title, setHeader] = createBaseStore('');
export const [$isModify, setIsModify] = createBaseStore(false);

export const $appHeader = combine($title, $isModify, makeArtTitle);

sample({
  clock: goBack,
  source: router.$history,
  target: goBackFx,
});
