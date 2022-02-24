/* eslint-disable @typescript-eslint/no-explicit-any */
import { combine, createEvent, createStore, sample } from 'effector';
import { always, insert } from 'ramda';
import { createBaseStore } from 'shared/lib/effector';
import { SelectItem } from 'shared/types/entities-api';

import { domain } from '../shared';
import { CellType } from '../types';

type CellPosition = {
  x: number;
  y: number;
};

export const valueDroppedInRoot = createEvent<number>();
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

const addCell = createEvent<CellType>();
export const removeItem = createEvent<CellPosition & { id?: string }>();

interface AddItemType extends CellPosition {
  value: SelectItem;
  index: number;
}
const addItem = createEvent<AddItemType>();

export const $cells = domain
  .createStore<CellType[]>([])
  .on(addCell, (state, payload) => [...state, payload])
  .on(removeItem, (state, payload) =>
    state.map(item => {
      if (item.x === payload.x && item.y === payload.y) {
        return {
          ...item,
          entities: item.entities.filter(f => f.id !== payload.id),
        };
      }
      return item;
    })
  )
  .on(addItem, (state, payload) =>
    state.map(item => {
      if (item.x === payload.x && item.y === payload.y) {
        return {
          ...item,
          entities: insert(
            payload?.index || 0,
            payload.value as any,
            item.entities
          ),
        };
      }
      return item;
    })
  );

const $index = createStore<number | null>(null);

sample({
  clock: valueDroppedInCell,
  source: combine([$movedValue, $startCell]),
  fn: ([movedValue, startCell]) =>
    ({
      id: movedValue?.id,
      x: startCell?.x,
      y: startCell?.y,
    } as any),
  target: removeItem,
});

sample({
  clock: valueDroppedInCell,
  source: combine([$movedValue, $activeCell, $index]),
  fn: ([movedValue, activeCell, index]) =>
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
  addCell({
    x: 3,
    y: 1,
    type: 'employee',
    entities: [
      {
        id: '4',
        name: 'Путин Владимир (Ш)',
      },
    ],
  });
});
