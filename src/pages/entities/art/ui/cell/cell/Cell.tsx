import { Paper } from '@abdt/ornament';
import { useStoreMap } from 'effector-react';
import { FC } from 'react';
import cn from 'classnames';

import { Entity } from './Entity';
import {
  $cells,
  setActiveCell,
  $activeCell,
  $startCell,
  setStartCell,
  setMovedValue,
  valueDroppedInCell,
  removeItem,
} from './model';

interface CellProps {
  x: number;
  y: number;
}

export const Cell: FC<CellProps> = ({ x, y }) => {
  const params = useStoreMap($cells, state =>
    state.find(item => item.x === x && item.y === y)
  );

  const isActiveCell = useStoreMap(
    $activeCell,
    item => item?.x === x && item?.y === y
  );

  const isStartCell = useStoreMap(
    $startCell,
    item => item?.x === x && item?.y === y
  );

  return (
    <Paper
      className={cn(
        'w-56 h-20 p-2 relative cursor-pointer shadow hover:shadow-2xl active:shadow-inner',
        isActiveCell && 'bg-abdt-mint200'
      )}
      onClick={() => console.log('click')}
      onDragStart={() => setStartCell({ x, y })}
      onDragOver={e => {
        setActiveCell({ x, y });
        e.preventDefault();
      }}
      onDragLeave={() => setActiveCell(null)}
      onDrop={e => {
        e.stopPropagation();
        valueDroppedInCell(params?.entities?.length || 0);
      }}
    >
      {params?.entities?.map((item, ind) => (
        <div
          draggable
          onDragStart={() => setMovedValue(item)}
          onDrop={e => {
            e.stopPropagation();

            const { top, height } = (
              e.target as HTMLElement
            ).getBoundingClientRect();
            const move = top + height / 2 > e.clientY ? 1 : -1;
            const insertIndex = ind - move;
            valueDroppedInCell(insertIndex < 0 ? 0 : insertIndex);
          }}
          onDragOver={e => {
            e.preventDefault();
          }}
          key={item.id}
        >
          <Entity
            {...item}
            isEntityFromStartCell={isStartCell}
            onRemove={() =>
              removeItem({
                id: item.id,
                x,
                y,
              })
            }
          />
        </div>
      ))}
    </Paper>
  );
};
