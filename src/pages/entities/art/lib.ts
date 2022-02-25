import { ArtType } from 'shared/types/api';
import { range } from 'ramda';
import { CellType } from './ui/cell';

export const getColumnsRange = (art: ArtType) => range(1, art.teams.length + 1);
export const getRowsRange = (art: ArtType) =>
  range(1, art.positions.length + 1);

export const buildsEmployeeCells = (art: ArtType) => {
  const cells: CellType[] = [];
  const columnsRange = getColumnsRange(art);
  const rowsRange = getRowsRange(art);

  columnsRange.forEach(x => {
    rowsRange.forEach(y => {
      const cell = {} as CellType;
      cell.type = 'employee';
      cell.x = x;
      cell.y = y;

      const teamId = art.teams[x - 1].team._id;
      const artPosition = art.positions[y - 1].position;

      const artPositionId = artPosition._id;

      cell.entities = art.employees
        .filter(e => {
          return !e.position
            ? artPosition.positions.some(
                p => p._id === String(e.employee?.position)
              )
            : e.position._id === artPositionId;
        })
        .filter(e => {
          return e.team?._id === teamId;
        })
        .map(e => ({
          id: e._id,
          name: e.employee?.name as string,
          workType: e.employee?.workType as string,
        }));

      cells.push(cell);
    });
  });

  return cells;
};
