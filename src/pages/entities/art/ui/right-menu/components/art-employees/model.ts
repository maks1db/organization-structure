import { $droppedValue } from 'features/drag-n-drop';
import { sample } from 'effector';
import { $employees, removeArtEmployeeByRowIndex } from '../../../../model';
import { makeArtEmployeesList } from './lib';
import { ART_EMPLOYEE } from '../../../../constants';

export const $list = $employees.map(art => makeArtEmployeesList(art));

sample({
  clock: $droppedValue,
  filter: x => x.type === ART_EMPLOYEE,
  fn: x => x?.dragParams?.rowId as any,
  target: removeArtEmployeeByRowIndex,
});
