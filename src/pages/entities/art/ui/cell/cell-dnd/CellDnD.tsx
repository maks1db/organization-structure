/* eslint-disable react/destructuring-assignment */
import { useStoreMap } from 'effector-react';
import { FC } from 'react';
import cn from 'classnames';
import { makeEntityPreview } from 'shared/lib/entities';
import { isCellPositionsEq } from '../lib';
import { CellPosition } from '../types';

import { Entity } from './Entity';
import { BaseCell } from '../base';
import {
  setActiveCell,
  $activeCell,
  $startCell,
  setStartCell,
  setMovedValue,
  valueDroppedInCell,
} from './model';
import { $cells, removeItem } from '../model';

export const CellDnD: FC<CellPosition> = cellPosition => {
  const params = useStoreMap($cells, state =>
    state.find(item => isCellPositionsEq(item, cellPosition))
  );

  const isActiveCell = useStoreMap($activeCell, item =>
    isCellPositionsEq(item, cellPosition)
  );

  const isStartCell = useStoreMap($startCell, item =>
    isCellPositionsEq(item, cellPosition)
  );

  return (
    <BaseCell
      row={cellPosition.y}
      className={cn(isActiveCell && 'bg-abdt-mint100')}
      onClick={() => console.log('click')}
      onDragStart={() => setStartCell(cellPosition)}
      onDragOver={e => {
        setActiveCell(cellPosition);
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
            name={makeEntityPreview(item)}
            isEntityFromStartCell={isStartCell}
            onRemove={() =>
              removeItem({
                id: item.id,
                ...cellPosition,
              })
            }
          />
        </div>
      ))}
    </BaseCell>
  );
};
