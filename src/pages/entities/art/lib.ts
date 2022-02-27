import { ArtType } from 'shared/types/api';
import { range } from 'ramda';
import { CellType } from './ui/cell';

export const getColumnsRange = (art: ArtType | null) =>
  art ? range(1, art.teams.length + 1) : [];
export const getRowsRange = (art: ArtType | null) =>
  art ? range(1, art.positions.length + 1) : [];

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
