import { ArtType } from 'shared/types/api';
import { makeEntityPreview } from 'shared/lib/entities';

export const makeArtEmployeesList = (art: ArtType | null) => {
  return (
    art?.employees
      .filter(x => !x.position || x.team === undefined)
      .map(x => ({
        id: x?.employee?._id || '',
        name: makeEntityPreview({
          name: x?.employee?.name,
          workType: x?.employee?.workType,
        }),
      })) || []
  );
};
