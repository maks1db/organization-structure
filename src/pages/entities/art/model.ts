import { createEffect, sample } from 'effector';
import { entities } from 'features/routing';
import { getEntityArt } from 'shared/api/entities';

const getEntityArtFx = createEffect(getEntityArt);

sample({
  clock: entities.art.$isOpened,
  source: entities.art.$params,
  filter: Boolean,
  fn: source => source,
  target: getEntityArtFx,
});

getEntityArtFx.doneData.watch(s => console.log(s.data.result));
