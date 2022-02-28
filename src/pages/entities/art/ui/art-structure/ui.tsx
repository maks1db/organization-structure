import { combine } from 'effector';
import { useStore } from 'effector-react';
import { FC } from 'react';
import { BaseCell, BaseEntity, CellDnD } from '../cell';
import {
  $columnsRange,
  $positions,
  $rowsRange,
  $teams,
  removeColumn,
  removeRow,
} from './model';
import {
  openContextMenuTeams,
  openContextMenuArtPositions,
  openContextMenuEmployees,
} from './context-menu-model';

export const Teams: FC = () => {
  const teams = useStore($teams);
  return (
    <>
      {teams.map(x => (
        <BaseCell
          row={0}
          className="mb-1 mr-1 font-bold flex"
          key={x.team._id}
          onContextMenu={e => {
            e.preventDefault();
            openContextMenuTeams({
              anchor: e.target as HTMLElement,
              uid: x.team._id,
            });
          }}
        >
          <BaseEntity
            name={x.team.name}
            onRemove={() => removeColumn(x.team._id)}
          />
        </BaseCell>
      ))}
    </>
  );
};

export const Positions: FC = () => {
  const positions = useStore($positions);
  return (
    <>
      {positions.map((x, ind) => (
        <BaseCell
          row={ind + 1}
          className="mb-1 mr-1 font-bold"
          key={x.position._id}
          onContextMenu={e => {
            e.preventDefault();
            e.stopPropagation();
            openContextMenuArtPositions({
              anchor: e.target as HTMLElement,
              uid: x.position._id,
            });
          }}
        >
          <BaseEntity
            name={x.position.name}
            onRemove={() => removeRow(x.position._id)}
          />
        </BaseCell>
      ))}
    </>
  );
};

const $store = combine({
  rowsRange: $rowsRange,
  columnsRange: $columnsRange,
});

export const Employees: FC = () => {
  const { columnsRange, rowsRange } = useStore($store);
  return (
    <>
      {rowsRange.map(y => (
        <div className="flex" key={y}>
          {columnsRange.map(x => (
            <div
              key={x}
              className="mb-1 mr-1"
              onContextMenu={e => {
                e.preventDefault();
                e.stopPropagation();
                openContextMenuEmployees({
                  anchor: e.target as HTMLElement,
                  x,
                  y,
                });
              }}
            >
              <CellDnD x={x} y={y} />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
