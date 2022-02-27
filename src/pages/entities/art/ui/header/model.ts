import {
  sample,
  createEffect,
  createEvent,
  combine,
  createStore,
} from 'effector';
import { router } from 'features/routing';
import { BrowserHistory } from 'history';
import { T } from 'ramda';
import { createBaseStore } from 'shared/lib/effector';
import { makeArtTitle } from './lib';

export const goBack = createEvent();
export const setIsArtModified = createEvent();

const goBackFx = createEffect((history: BrowserHistory) => history.back());

export const [$title, setHeader] = createBaseStore('');
export const $isModify = createStore(false).on(setIsArtModified, T);

export const $appHeader = combine($title, $isModify, makeArtTitle);

sample({
  clock: goBack,
  source: router.$history,
  target: goBackFx,
});
