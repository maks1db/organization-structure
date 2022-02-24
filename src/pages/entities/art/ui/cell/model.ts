import { EntityType } from 'shared/types/api';
import { SelectItem } from 'shared/types/entities-api';
import { makeEmployeePreview } from 'shared/lib/entities';
import { createEvent } from 'effector';
import { domain } from './shared';
import { CellType } from './types';

const addCell = createEvent<CellType>();
const $cells = domain
  .createStore<CellType[]>([])
  .on(addCell, (state, payload) => [...state, payload]);
