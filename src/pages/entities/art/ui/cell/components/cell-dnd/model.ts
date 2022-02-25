/* eslint-disable @typescript-eslint/no-explicit-any */
import { combine, createEvent, createStore, sample } from 'effector';
import { always } from 'ramda';
import { createBaseStore } from 'shared/lib/effector';
import { SelectItem } from 'shared/types/entities-api';

import { CellPosition } from '../../types';
import { addItem, removeItem } from '../model';

export const valueDroppedInCell = createEvent<number>();

export const [$movedValue, setMovedValue] = createBaseStore<SelectItem | null>(
  null
);
export const [$startCell, setStartCell] = createBaseStore<CellPosition | null>(
  null
);

export const [$activeCell, setActiveCell] =
  createBaseStore<CellPosition | null>(null);
export const [$entityPosition, setEntityPosition] = createBaseStore<null>(null);

const $index = createStore<number | null>(null);

sample({
  clock: valueDroppedInCell,
  target: $index,
});

export const $storeDnD = combine({
  movedValue: $movedValue,
  startCell: $startCell,
  activeCell: $activeCell,
  index: $index,
});

sample({
  clock: valueDroppedInCell,
  source: $storeDnD,
  fn: ({ movedValue, startCell }) =>
    ({
      id: movedValue?.id,
      x: startCell?.x,
      y: startCell?.y,
    } as any),
  target: removeItem,
});

sample({
  clock: valueDroppedInCell,
  source: $storeDnD,
  fn: ({ activeCell, movedValue, index }) =>
    ({
      value: movedValue,
      x: activeCell?.x,
      y: activeCell?.y,
      index,
    } as any),
  target: addItem,
});

sample({
  clock: valueDroppedInCell,
  fn: always(null),
  target: [$movedValue, $startCell, $activeCell],
});
