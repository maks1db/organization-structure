import { FC } from 'react';
import { useStore } from 'effector-react';
import { combine } from 'effector';
import { CellDnD, BaseCell, BaseEntity, DEFAULT_CELL_WIDTH } from './ui/cell';
import {
  $columnsRange,
  $rowsRange,
  $positions,
  removeRow,
  removeColumn,
  $teams,
} from './model';
import { Header } from './ui/header';
import { RightMenu } from './ui/right-menu';

const $store = combine({
  columnsRange: $columnsRange,
  rowsRange: $rowsRange,
  positions: $positions,
  teams: $teams,
});

export const Page: FC = () => {
  const { columnsRange, rowsRange, positions, teams } = useStore($store);
  return (
    <>
      <Header />
      <div className="w-full relative top-14">
        <RightMenu />
        <div className="absolute z-10">
          <BaseCell row={0} className="mb-1 mr-1 font-bold flex" />
          {positions.map((x, ind) => (
            <BaseCell row={ind + 1} className="mb-1 mr-1 font-bold">
              <BaseEntity
                name={x.position.name}
                onRemove={() => removeRow(x.position._id)}
              />
            </BaseCell>
          ))}
        </div>
        <div className="relative" style={{ left: `${DEFAULT_CELL_WIDTH}rem` }}>
          <div className="flex">
            {teams.map(x => (
              <BaseCell row={0} className="mb-1 mr-1 font-bold flex">
                <BaseEntity
                  name={x.team.name}
                  onRemove={() => removeColumn(x.team._id)}
                />
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
