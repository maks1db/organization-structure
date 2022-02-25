import { FC } from 'react';
import { useStore } from 'effector-react';
import { combine } from 'effector';
import { CellDnD, BaseCell, BaseEntity, DEFAULT_CELL_WIDTH } from './ui/cell';
import { $art, $columnsRange, $rowsRange } from './model';
import { Header } from './ui/header';

const $store = combine({
  art: $art,
  columnsRange: $columnsRange,
  rowsRange: $rowsRange,
});

export const Page: FC = () => {
  const { columnsRange, rowsRange, art } = useStore($store);
  return (
    <>
      <Header />
      <div className="w-full relative">
        <div className="absolute z-10">
          <BaseCell row={0} className="mb-1 mr-1 font-bold flex" />
          {art?.positions.map((x, ind) => (
            <BaseCell row={ind + 1} className="mb-1 mr-1 font-bold">
              <BaseEntity name={x.position.name} />
            </BaseCell>
          ))}
        </div>
        <div className="relative" style={{ left: `${DEFAULT_CELL_WIDTH}rem` }}>
          <div className="flex">
            {art?.teams.map(x => (
              <BaseCell row={0} className="mb-1 mr-1 font-bold flex">
                <BaseEntity name={x.team.name} />
              </BaseCell>
            ))}
          </div>
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
