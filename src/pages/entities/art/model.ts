import {
  createEffect,
  createStore,
  sample,
  combine,
  createEvent,
} from 'effector';
import { entities } from 'features/routing';
import { showAppMessage } from 'features/show-message';
import { always, equals, F, identity, isNil, pipe, T } from 'ramda';
import * as api from 'shared/api/entities';
import { getResultFromResponse, getErrorFromResponse } from 'shared/lib/api';
import { ArtType } from 'shared/types/api';
import { setHeader, makeTitle } from 'widgets/header';
import { ERROR_LOAD_MESSAGE, OPEN_RAW_ART_MESSAGE } from './constants';

import {
  prepareArtPositionsRawArtEmployees,
  prepareArtBodyForSendBody,
} from './lib';
import {
  setArtStructure,
  resetArtStructure,
  artModified,
  $employees,
  $teams,
  $positions,
} from './ui/art-structure';
import { $cells } from './ui/cell';
import { setFilterIds } from './ui/right-menu';

const getEntityArtFx = createEffect(api.getEntityArt);
const saveArtFx = createEffect(api.saveArt);

export const saveArt = createEvent();

const $art = createStore<ArtType | null>(null).on(
  getEntityArtFx.doneData,
  (_, payload) =>
    pipe(getResultFromResponse, prepareArtPositionsRawArtEmployees)(payload)
);

export const $isModify = createStore(false);

export const $artIsPendingSave = saveArtFx.pending.map(identity);

sample({
  clock: entities.art.$isOpened,
  source: entities.art.$params,
  filter: (_, isOpened) => isOpened,
  fn: source => source,
  target: getEntityArtFx,
});

sample({
  clock: entities.art.$isOpened,
  filter: equals(false),
  fn: always(null),
  target: [$art, $isModify],
});

sample({
  clock: $art,
  filter: art => art !== null && art.isRaw === true,
  fn: always(OPEN_RAW_ART_MESSAGE),
  target: showAppMessage('success'),
});

sample({
  clock: getEntityArtFx.failData,
  fn: always(ERROR_LOAD_MESSAGE),
  target: showAppMessage('danger'),
});

sample({
  clock: artModified,
  fn: T,
  target: $isModify,
});

sample({
  clock: combine([$art, $isModify]),
  fn: ([art, isModify]) => makeTitle(art?.name || '', isModify),
  target: setHeader,
});

sample({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  clock: $art,
  filter: art => art !== null,
  target: setArtStructure,
});

sample({
  clock: $art,
  filter: isNil,
  target: resetArtStructure,
});

sample({
  clock: $cells,
  source: $employees,
  fn: (employees, cells) => [
    ...cells.map(x => x.entities.map(e => e.id)).flat(),
    ...employees.map(x => x.employee?._id || ''),
  ],
  target: setFilterIds,
});

sample({
  clock: saveArt,
  source: combine([$art, $employees, $positions, $teams]),
  fn: ([art, employees, positions, teams]) =>
    art
      ? prepareArtBodyForSendBody({
          art,
          employees,
          positions,
          teams,
        })
      : {},
  target: saveArtFx,
});

sample({
  clock: saveArtFx.doneData,
  fn: F,
  target: $isModify,
});

sample({
  clock: saveArtFx.failData,
  fn: getErrorFromResponse,
  target: showAppMessage('danger'),
});
