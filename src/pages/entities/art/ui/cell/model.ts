/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEvent } from 'effector';
import { insert } from 'ramda';
import { SelectItem } from 'shared/types/entities-api';

import { isCellPositionsEq, calculateCellsHeights } from './lib';
import { domain } from './shared';
import { CellPosition, CellType } from './types';

export const addCell = createEvent<CellType>();
export const pushCells = createEvent<CellType[]>();
export const removeItem = createEvent<CellPosition & { id?: string }>();

interface AddItemType extends CellPosition {
  value: SelectItem;
  index: number;
}
export const addItem = createEvent<AddItemType>();

export const $cells = domain
  .createStore<CellType[]>([])
  .on(pushCells, (_, payload) => payload)
  .on(addCell, (state, payload) => [...state, payload])
  .on(removeItem, (state, payload) =>
    state.map(item => {
      if (isCellPositionsEq(item, payload)) {
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
      if (isCellPositionsEq(item, payload)) {
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

export const $cellHeights = $cells.map(calculateCellsHeights);
