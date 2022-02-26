import { $art } from '../../../../model';
import { makeArtEmployeesList } from './lib';

export const $employees = $art.map(art => makeArtEmployeesList(art));
