/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEvent, createStore, sample } from 'effector';
import {
  $droppedValue,
  DroppedValue,
  valueFinishDropped,
} from 'features/drag-n-drop';
import { createBaseStore } from 'shared/lib/effector';
import { always } from 'ramda';
import { keyboard } from 'features/dom-events';

import { addItem, removeItem } from '../model';
import { CellPosition } from '../types';
import { CELL_ENTITY, ART_EMPLOYEE, EMPLOYEE } from '../../../constants';

export type DroppedValueType = DroppedValue<
  { id: string; uid?: string },
  CellPosition,
  { index: number } & CellPosition
>;

export const possibleDropEntities = [ART_EMPLOYEE, CELL_ENTITY, EMPLOYEE];

export const valueDroppedInCell = createEvent<number>();

export const [$activeCell, setActiveCell] =
  createBaseStore<CellPosition | null>(null);
export const [$entityPosition, setEntityPosition] = createBaseStore<null>(null);

const $index = createStore<number | null>(null);

sample({
  clock: valueDroppedInCell,
  target: $index,
});

keyboard.$ctrlKeyEnabled.watch(console.log);
sample({
  clock: $droppedValue,
  source: keyboard.$ctrlKeyEnabled,
  filter: (isCtrlEnabled, value) =>
    !isCtrlEnabled && value.type === CELL_ENTITY,
  fn: (_, params: any) => {
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
      value: { ...value, uid: value?.uid || new Date().valueOf().toString() },
      x: dropParams.x,
      y: dropParams.y,
      index: dropParams.index,
    } as any;
  },
  target: addItem,
});

sample({
  clock: $droppedValue,
  filter: val => val.type === CELL_ENTITY,
  fn: always(null),
  target: [setActiveCell, valueFinishDropped],
});
