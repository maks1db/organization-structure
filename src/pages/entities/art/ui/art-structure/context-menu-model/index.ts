import { combine, createEvent, sample } from 'effector';
import {
  openContextMenu,
  setContextMenu,
} from 'features/select-from-context-menu';

import { openEntityEditor } from 'widgets/entity-editor';
import {
  getContextMenuArtPositions,
  getContextMenuEmployees,
  getContextMenuTeams,
} from './lib';
import { $positions, $teams } from '../model';
import { ActionEmployeeType, ActionType } from './types';

export const openContextMenuArtPositions = createEvent<ActionType>();
export const openContextMenuTeams = createEvent<ActionType>();
export const openContextMenuEmployees = createEvent<ActionEmployeeType>();

sample({
  clock: openContextMenuTeams,
  source: $teams,
  fn: (source, params) =>
    getContextMenuTeams({ ...params, excludeIds: source.map(x => x.team._id) }),
  target: setContextMenu,
});

sample({
  clock: openContextMenuArtPositions,
  source: $positions,
  fn: (source, params) =>
    getContextMenuArtPositions({
      ...params,
      excludeIds: source.map(x => x.position._id),
    }),
  target: setContextMenu,
});

sample({
  clock: openContextMenuEmployees,
  source: combine([$teams, $positions]),
  fn: ([teams, positions], { anchor, x, y }) =>
    getContextMenuEmployees(
      anchor,
      positions[y - 1].position,
      teams[x - 1].team
    ),
  target: openEntityEditor,
});

sample({
  clock: [openContextMenuTeams, openContextMenuArtPositions],
  fn: ({ anchor }) => anchor,
  target: openContextMenu,
});
