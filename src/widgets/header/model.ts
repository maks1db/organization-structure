import { sample, createEffect, createEvent } from 'effector';
import { router } from 'features/routing';
import { BrowserHistory } from 'history';

import { createBaseStore } from 'shared/lib/effector';

export const goBack = createEvent();

const goBackFx = createEffect((history: BrowserHistory) => history.back());

export const [$title, setHeader] = createBaseStore('');

sample({
  clock: goBack,
  source: router.$history,
  target: goBackFx,
});
