import { uniq } from 'ramda';
import { ArtDbType } from './types';

export const getArtDescription = (item: ArtDbType) => {
  const employeesCount = uniq(
    item.employees.map(x => x.employee?.toString())
  ).length;
  const teamsCount = item.teams.length;
  return `Сотрудников: ${employeesCount}${
    teamsCount > 0 ? `; Команд: ${teamsCount}` : ''
  }`;
};

export const getTeamDescription = (item: ArtDbType) => {
  const employeesTeams = uniq(
    item.employees.map(x => [x.employee?.toString(), x.team?.toString()])
  );

  return (teamId: string) => {
    return `Сотрудников: ${
      employeesTeams.filter(([, id]) => id === teamId).length
    }; Арт: ${item.name}`;
  };
};
