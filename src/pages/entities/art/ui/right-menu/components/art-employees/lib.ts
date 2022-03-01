import { ArtType } from 'shared/types/api';

export const makeArtEmployeesList = (employees: ArtType['employees']) => {
  return employees
    .reduce((acc, item) => {
      if (!acc.some(x => x.employee?._id === item._id)) {
        acc.push(item);
      }
      return acc;
    }, [] as ArtType['employees'])
    .filter(x => x.position === undefined || x.team === undefined)
    .sort((a, b) => {
      if (!a.employee || !b.employee) {
        return 0;
      }
      return a.employee.name > b.employee.name ? 1 : -1;
    });
};
