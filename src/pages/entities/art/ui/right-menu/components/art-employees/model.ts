import { $employees } from '../../../../model';
import { makeArtEmployeesList } from './lib';

export const $list = $employees.map(art => makeArtEmployeesList(art));
