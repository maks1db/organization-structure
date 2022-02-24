import { combine, createEvent, createStore } from 'effector';
import { omit } from 'ramda';
import { createBaseStore } from 'shared/lib/effector';
import { SelectItem } from 'shared/types/entities-api';

import { domain } from '../shared';
import { CellType } from '../types';

type CellPosition = {
  x: number;
  y: number;
};

type ValueDnDType = SelectItem & {
  fromX?: number;
  fromY?: number;
};

export const [$valueDnD, setValueDnD] = createBaseStore<ValueDnDType | null>(
  null
);
export const [$startCell, setStartCell] = createBaseStore<CellPosition | null>(
  null
);
$startCell.watch(console.log);

export const [$activeCell, setActiveCell] =
  createBaseStore<CellPosition | null>(null);
export const [$entityPosition, setEntityPosition] = createBaseStore<null>(null);

const addCell = createEvent<CellType>();
export const $cells = domain
  .createStore<CellType[]>([])
  .on(addCell, (state, payload) => [...state, payload]);

setTimeout(() => {
  addCell({
    x: 1,
    y: 1,
    type: 'employee',
    entities: [
      {
        id: '1',
        name: 'Скворцов Максим (Ш)',
      },
      {
        id: '2',
        name: 'Камил Емилеев (Ш)',
      },
    ],
  });

  addCell({
    x: 2,
    y: 1,
    type: 'employee',
    entities: [
      {
        id: '3',
        name: 'Артемьева Елена (Ш)',
      },
    ],
  });
});
