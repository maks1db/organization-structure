/* eslint-disable react/destructuring-assignment */
import { useStoreMap } from 'effector-react';
import { FC } from 'react';
import cn from 'classnames';

import {
  valueDragged,
  valueDropped,
  isValueCanDrop,
  $value,
} from 'features/drag-n-drop';
import { makeEntityPreview } from 'shared/lib/entities';
import { isCellPositionsEq } from '../lib';
import { CellPosition } from '../types';

import { Entity } from './Entity';
import { BaseCell } from '../base';

import { setActiveCell, $activeCell, possibleDropEntities } from './model';
import { $cells, removeItem } from '../model';
import { CELL_ENTITY } from '../../../constants';

export const CellDnD: FC<CellPosition> = cellPosition => {
  const params = useStoreMap($cells, state =>
    state.find(item => isCellPositionsEq(item, cellPosition))
  );

  const isActiveCell = useStoreMap($activeCell, item =>
    isCellPositionsEq(item, cellPosition)
  );

  const isStartCell = useStoreMap($value, item =>
    isCellPositionsEq(item?.dragParams, cellPosition)
  );

  return (
    <BaseCell
      row={cellPosition.y}
      className={cn(isActiveCell && 'bg-abdt-mint100')}
      onDragOver={isValueCanDrop(possibleDropEntities, () =>
        setActiveCell(cellPosition)
      )}
      onDragLeave={() => setActiveCell(null)}
      onDrop={e => {
        e.stopPropagation();
        valueDropped({
          dropParams: {
            index: params?.entities?.length || 0,
            ...cellPosition,
          },
        });
      }}
    >
      {params?.entities?.map((item, ind) => (
        <div
          draggable
          onDragStart={() => {
            valueDragged({
              type: CELL_ENTITY,
              value: item,
              dragParams: cellPosition,
            });
            setActiveCell(cellPosition);
          }}
          onDrop={e => {
            e.stopPropagation();

            const { top, height } = (
              e.target as HTMLElement
            ).getBoundingClientRect();
            const move = top + height / 2 > e.clientY ? 1 : -1;
            const insertIndex = ind - move;
            valueDropped({
              dropParams: {
                index: insertIndex < 0 ? 0 : insertIndex,
                ...cellPosition,
              },
            });
          }}
          onDragOver={isValueCanDrop(possibleDropEntities)}
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
