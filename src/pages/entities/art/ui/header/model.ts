import { sample, createEffect, createEvent } from 'effector';
import { router } from 'features/routing';
import { BrowserHistory } from 'history';

export const goBack = createEvent();

const goBackFx = createEffect((history: BrowserHistory) => history.back());

sample({
  clock: goBack,
  source: router.$history,
  target: goBackFx,
});
