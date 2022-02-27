import { $employees } from '../../../art-structure';
import { makeArtEmployeesList } from './lib';

export const $list = $employees.map(art => makeArtEmployeesList(art));
