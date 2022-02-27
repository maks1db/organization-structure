import { range } from 'ramda';
import { ArtType } from 'shared/types/api';
import { CellType } from '../cell';

export const getRange = (data: unknown[]) => range(1, data.length + 1);

interface CellsBuildProps {
  positions: ArtType['positions'];
  teams: ArtType['teams'];
  employees: ArtType['employees'];
}

export const buildsEmployeeCells = ({
  employees,
  positions,
  teams,
}: CellsBuildProps) => {
  const cells: CellType[] = [];
  const columnsRange = getRange(teams);
  const rowsRange = getRange(positions);

  columnsRange.forEach(x => {
    rowsRange.forEach(y => {
      const cell = {} as CellType;
      cell.type = 'employee';
      cell.x = x;
      cell.y = y;

      const teamId = teams[x - 1].team._id;
      const artPosition = positions[y - 1].position;

      const artPositionId = artPosition._id;

      cell.entities = employees

        .filter(e => {
          return e.team?._id === teamId && e.position?._id === artPositionId;
        })
        .map(e => ({
          id: e.employee?._id as string,
          name: e.employee?.name as string,
          workType: e.employee?.workType as string,
          uid: e._id,
        }));

      cells.push(cell);
    });
  });

  return cells;
};
