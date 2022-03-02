/* eslint-disable no-param-reassign */
import { uniq } from 'ramda';
import { ArtType, ArtPositionType, BaseTeamType } from 'shared/types/api';
import { Item } from './ui/elements';

export const prepareHelpers = (art: ArtType) => {
  const cashSizes: Record<string, number> = {};
  return {
    calcHeight: (position: ArtPositionType) => {
      const size = cashSizes[position._id];
      if (size) {
        return size;
      }
      const positionTeams = art.employees.filter(
        x => x.position?._id === position._id
      );

      const uidTeams = uniq(positionTeams.map(x => x.team?._id || null));

      const calcSize = uidTeams.reduce((acc, id) => {
        const count = positionTeams.filter(x => x.team?._id === id).length;
        return count > acc ? count : acc;
      }, 1);

      cashSizes[position._id] = calcSize;

      return calcSize;
    },
    getCellData: (position: ArtPositionType, team?: BaseTeamType) => {
      return art.employees
        .filter(
          x => x.position?._id === position._id && x.team?._id === team?._id
        )
        .map(({ employee }) => ({ ...employee, entity: 'employee' } as Item));
    },
  };
};
