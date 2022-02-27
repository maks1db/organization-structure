import { ArtType } from 'shared/types/api';

export const makeArtEmployeesList = (employees: ArtType['employees']) => {
  return employees.filter(x => !x.position || x.team === undefined);
};
