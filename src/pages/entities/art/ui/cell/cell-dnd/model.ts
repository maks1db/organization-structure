/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEvent, createStore, sample } from 'effector';
import {
  $droppedValue,
  DroppedValue,
  valueFinishDropped,
} from 'features/drag-n-drop';
import { createBaseStore } from 'shared/lib/effector';
import { always } from 'ramda';

import { addItem, removeItem } from '../model';
import { CellPosition } from '../types';
import { ART_EMPLOYEE } from '../../../constants';

export type DroppedValueType = DroppedValue<
  { id: string },
  CellPosition,
  { index: number } & CellPosition
>;

export const valueDroppedInCell = createEvent<number>();

export const [$activeCell, setActiveCell] =
  createBaseStore<CellPosition | null>(null);
export const [$entityPosition, setEntityPosition] = createBaseStore<null>(null);

const $index = createStore<number | null>(null);

sample({
  clock: valueDroppedInCell,
  target: $index,
});

sample({
  clock: $droppedValue,
  fn: (params: any) => {
    const { dragParams, value } = params as DroppedValueType;
    return {
      id: value.id,
      x: dragParams.x,
      y: dragParams.y,
    };
  },
  target: removeItem,
});

sample({
  clock: $droppedValue,
  fn: (params: any) => {
    const { dropParams, value } = params as DroppedValueType;

    return {
      value,
      x: dropParams.x,
      y: dropParams.y,
      index: dropParams.index,
    } as any;
  },
  target: addItem,
});

sample({
  clock: $droppedValue,
  filter: val => val.type === ART_EMPLOYEE,
  fn: always(null),
  target: [setActiveCell, valueFinishDropped],
});
