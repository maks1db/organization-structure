import { ArtType } from 'shared/types/api';

export const makeArtEmployeesList = (art: ArtType | null) => {
  return art?.employees.filter(x => !x.position || x.team === undefined) || [];
};
