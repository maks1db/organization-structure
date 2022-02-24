import { Paper } from '@abdt/ornament';
import { useStoreMap } from 'effector-react';
import { FC } from 'react';
import cn from 'classnames';

import { Entity } from './Entity';
import { $cells, setActiveCell, $activeCell, setStartCell } from './model';

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

  return (
    <Paper
      className={cn(
        'w-56 h-20 p-2 relative cursor-pointer shadow hover:shadow-2xl active:shadow-inner',
        isActiveCell && 'bg-abdt-mint200'
      )}
      onClick={() => console.log('click')}
      onDragStart={() => setStartCell({ x, y })}
      onDragOver={() => setActiveCell({ x, y })}
      onDragLeave={() => setActiveCell(null)}
      onDrop={() => setActiveCell({ x, y })}
    >
      {params?.entities?.map((item, ind) => (
        // eslint-disable-next-line react/no-array-index-key
        <Entity key={`${item.id}-${ind}`} {...item} x={x} y={y} />
      ))}
    </Paper>
  );
};
