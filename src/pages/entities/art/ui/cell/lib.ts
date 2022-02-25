import { range } from 'ramda';
import { CellPosition, CellType } from './types';

export const isCellPositionsEq = (
  a: CellPosition | null,
  b: CellPosition | null
) => a?.x === b?.x && a?.y === b?.y;

export const calculateCellsHeights = (cells: CellType[]) => {
  const maxRow = cells.reduce((acc, item) => Math.max(item.y, acc), 1);
  const rows = range(1, maxRow + 1);

  return rows.map(y => {
    const items = cells.filter(c => c.y === y);
    const height = items.reduce(
      (acc, { entities }) => Math.max(acc, entities.length),
      0
    );

    return { y, height: Math.max(height - 1, 0) };
  });
};
