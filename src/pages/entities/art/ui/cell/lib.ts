import { CellPosition } from './types';

export const isCellPositionsEq = (
  a: CellPosition | null,
  b: CellPosition | null
) => a?.x === b?.x && a?.y === b?.y;
