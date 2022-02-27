import { ArtType } from 'shared/types/api';
import { range } from 'ramda';
import { CellType } from './ui/cell';

export const getRange = (data: unknown[]) => range(1, data.length + 1);
export const getColumnsRange = (art: ArtType | null) =>
  art ? getRange(art.teams) : [];
export const getRowsRange = (art: ArtType | null) =>
  art ? getRange(art.positions) : [];

export const prepareArtPositionsRawArtEmployees = (art: ArtType) => {
  if (!art.isRaw) {
    return art;
  }
  /**
   * В данной операции можно выполнять поиск для raw-данных мутабельно
   * В будущем можно через линзы сделать иммутабельно.
   */
  art.employees.forEach(e => {
    if (e.position) {
      return;
    }
    const positionId = e.employee?.position?._id;
    const employeePosition = art.positions.find(x =>
      x.position?.positions?.some(a => a._id === positionId)
    );
    if (employeePosition) {
      // eslint-disable-next-line no-param-reassign
      e.position = employeePosition.position;
    }
  });

  return art;
};

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
          id: e._id,
          name: e.employee?.name as string,
          workType: e.employee?.workType as string,
        }));

      cells.push(cell);
    });
  });

  return cells;
};
