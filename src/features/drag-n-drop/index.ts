import { createEvent, createStore, sample } from 'effector';
import { always } from 'ramda';
import React from 'react';

export interface DroppedValue<
  V,
  B = Record<string, unknown>,
  E = Record<string, unknown>
> {
  type: string;
  value: V;
  dragParams: B;
  dropParams: E;
}

type DragValue = {
  type: string;
  value: any;
  dragParams?: Record<string, unknown>;
};

export const valueDragged = createEvent<DragValue>();
export const valueDropped =
  createEvent<{ dropParams: Record<string, unknown> }>();
export const valueFinishDropped = createEvent();

export const $value = createStore<DragValue | null>(null).on(
  valueDragged,
  (_, payload) => payload
);

export const isValueCanDrop =
  (types: string[], fn?: () => void) => (e: React.DragEvent<HTMLElement>) => {
    const state = $value.getState();
    if (types.includes(state?.type || '')) {
      e.preventDefault();
      fn?.();
    }
  };

export const $droppedValue = sample({
  clock: valueDropped,
  source: $value,
  fn: (value, params) => ({ ...value, ...params }),
});

sample({
  clock: valueFinishDropped,
  fn: always(null),
  target: $value,
});
