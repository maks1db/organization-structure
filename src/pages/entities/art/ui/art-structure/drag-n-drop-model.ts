import { sample } from 'effector';
import { $droppedValue, DroppedValue } from 'features/drag-n-drop';

import { POSITION, TEAM } from '../../constants';
import { moveColumn, moveRow } from './model';

type DropType = DroppedValue<number, null, { index: number }>;

const prepareParams = (x: DropType) => ({
  from: x.value,
  to: x.dropParams.index,
});

sample({
  clock: $droppedValue,
  filter: x => x.type === POSITION,
  fn: x => prepareParams(x as any),
  target: moveRow,
});

sample({
  clock: $droppedValue,
  filter: x => x.type === TEAM,
  fn: x => prepareParams(x as any),
  target: moveColumn,
});
