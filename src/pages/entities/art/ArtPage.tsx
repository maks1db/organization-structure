import { FC } from 'react';
import { useStore } from 'effector-react';
import { combine } from 'effector';
import { Grid } from '@abdt/ornament';
import { CellDnD, BaseCell, BaseEntity } from './ui/cell';
import { $art, $columnsRange, $rowsRange } from './model';

const $store = combine({
  art: $art,
  columnsRange: $columnsRange,
  rowsRange: $rowsRange,
});

export const Page: FC = () => {
  const { columnsRange, rowsRange, art } = useStore($store);
  return (
    <>
      <h1>{art?.name}</h1>

      <div className="flex flex-col">
        <div>
          {art?.positions.map((x, ind) => (
            <BaseCell row={ind + 1} className="mb-1 mr-1">
              <BaseEntity name={x.position.name} />
            </BaseCell>
          ))}
        </div>
        <div>
          {rowsRange.map(y => (
            <div className="flex" key={y}>
              {columnsRange.map(x => (
                <div key={x} className="mb-1 mr-1">
                  <CellDnD x={x} y={y} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
