import { combine, createEvent, sample } from 'effector';
import {
  openContextMenu,
  setContextMenu,
  MenuItemType,
  $anchor,
} from 'features/select-from-context-menu';
import { ArtPositionType, BaseTeamType } from 'shared/types/api';
import {
  removeColumn,
  removeRow,
  addRow,
  addColumn,
  $teams,
  $positions,
  addEmployee,
} from './model';
import { openEntityEditor, EditorParams } from '../entity-editor';

interface ActionType {
  uid: string;
  anchor: HTMLElement;
}

interface ActionEmployeeType {
  x: number;
  y: number;
  anchor: HTMLElement;
}

export const openContextMenuArtPositions = createEvent<ActionType>();
export const openContextMenuTeams = createEvent<ActionType>();
export const openContextMenuEmployees = createEvent<ActionEmployeeType>();

const makeId = () => new Date().valueOf().toString();

const getContextMenuTeams = (
  anchor: HTMLElement | null,
  id?: string
): MenuItemType[] => {
  return [
    {
      name: 'Добавить',
      action: () =>
        openEntityEditor({
          anchor,
          entity: 'team',
          onSelectValue: ({ data }) => addColumn({ team: data, _id: makeId() }),
        }),
    },
    {
      name: 'Удалить',
      action: () => id && removeColumn(id),
      props: {
        disabled: !id,
      },
    },
  ];
};

const getContextMenuArtPositions = (
  anchor: HTMLElement | null,
  id?: string
): MenuItemType[] => {
  return [
    {
      name: 'Добавить',
      action: () =>
        openEntityEditor({
          anchor,
          entity: 'artPosition',
          onSelectValue: ({ data }) => {
            addRow({ position: data, _id: makeId() });
          },
        }),
    },
    {
      name: 'Удалить',
      action: () => id && removeRow(id),
      props: {
        disabled: !id,
      },
    },
  ];
};

const getContextMenuEmployees = (
  anchor: HTMLElement | null,
  position: ArtPositionType,
  team: BaseTeamType
): EditorParams => {
  return {
    anchor,
    entity: 'employee',
    onSelectValue: ({ data }) =>
      addEmployee({
        _id: makeId(),
        employee: data,
        position,
        team,
      }),
  };
};

sample({
  clock: openContextMenuTeams,
  fn: ({ uid, anchor }) => getContextMenuTeams(anchor, uid),
  target: setContextMenu,
});

sample({
  clock: openContextMenuArtPositions,
  fn: ({ uid, anchor }) => getContextMenuArtPositions(anchor, uid),
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
