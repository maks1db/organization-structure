import { ArtPositionType, BaseTeamType } from 'shared/types/api';
import { MenuItemType } from 'features/select-from-context-menu';
import { EditorParams, openEntityEditor } from '../../entity-editor';
import { ActionType, ExcludeIds } from './types';
import {
  removeColumn,
  removeRow,
  addRow,
  addColumn,
  addEmployee,
} from '../model';

const makeId = () => new Date().valueOf().toString();

export const getContextMenuTeams = ({
  anchor,
  id,
  excludeIds,
}: ActionType & ExcludeIds): MenuItemType[] => {
  return [
    {
      name: 'Добавить',
      action: () =>
        openEntityEditor({
          anchor,
          entity: 'team',
          onSelectValue: ({ data }) => addColumn({ team: data, _id: makeId() }),
          excludeIds,
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

export const getContextMenuArtPositions = ({
  anchor,
  id,
  excludeIds,
}: ActionType & ExcludeIds): MenuItemType[] => {
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
          excludeIds,
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

export const getContextMenuEmployees = (
  anchor: HTMLElement | null,
  position: ArtPositionType,
  team: BaseTeamType
): EditorParams => {
  return {
    anchor,
    entity: 'employee',
    onSelectValue: ({ data }) => {
      addEmployee({
        _id: makeId(),
        employee: data,
        position,
        team,
      });
    },
  };
};
