import { createEvent, sample } from 'effector';
import { entities, reports } from 'features/routing';
import { identity } from 'ramda';

export const openArt = createEvent();

sample({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  clock: openArt,
  source: reports.art.$params,
  fn: identity,
  target: entities.art.open,
});
