import { ArtType } from 'shared/types/api';

export const prepareArtPositionsRawArtEmployees = (art: ArtType) => {
  if (!art.isRaw) {
    return art;
  }
  /**
   * В данной операции можно выполнять поиск для raw-данных мутабельно
   * В будущем можно через линзы сделать иммутабельно.
   */
  art.employees.forEach(e => {
    if (e.position) {
      return;
    }
    const positionId = e.employee?.position?._id;
    const employeePosition = art.positions.find(x =>
      x.position?.positions?.some(a => a._id === positionId)
    );
    if (employeePosition) {
      // eslint-disable-next-line no-param-reassign
      e.position = employeePosition.position;
    }
  });

  return art;
};

interface PrepareParams {
  art: ArtType;
  employees: ArtType['employees'];
  teams: ArtType['teams'];
  positions: ArtType['positions'];
}

export const prepareArtBodyForSendBody = ({
  art,
  employees,
  teams,
  positions,
}: PrepareParams) => {
  return {
    ...art,
    employees,
    teams,
    positions,
  };
};
