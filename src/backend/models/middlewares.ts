/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import mongoose from 'mongoose';
import { uniq } from 'ramda';

import {
  ArtType,
  EmployeeType,
  SearchResult,
  EntityType,
} from 'shared/types/api';

const EXCLUDED_WORDS = ['вакансия'];
const searchResultItemScheme = new mongoose.Schema<SearchResult>({
  description: String,
  entityId: mongoose.Types.ObjectId,
  name: String,
  type: String,
});
export const SearchResultItem = mongoose.model(
  'SearchResultItem',
  searchResultItemScheme
);

const entityTypes: Record<string, EntityType> = {
  art: 'art',
  employee: 'employee',
  team: 'team',
};

export const postSaveEmployee = async (
  item: mongoose.Document<unknown, any, EmployeeType> & EmployeeType
) => {
  await item.populate('position');
  await SearchResultItem.deleteOne({ entityId: item._id });

  if (EXCLUDED_WORDS.includes(item.name.toLowerCase())) {
    return;
  }

  await SearchResultItem.insertMany({
    name: item.name,
    description: item.position?.name,
    entityId: item._id,
    type: entityTypes.employee,
  });
};

export const postSaveArt = async (
  item: mongoose.Document<unknown, any, ArtType> & ArtType
) => {
  await SearchResultItem.deleteMany({
    entityId: item._id,
  });

  const employeesCount = uniq(
    item.employees.map(x => x.employee?.toString())
  ).length;
  const teamsCount = item.teams.length;
  await SearchResultItem.insertMany({
    name: item.name,
    description: `Сотрудников: ${employeesCount}${
      teamsCount > 0 ? `; Команд: ${teamsCount}` : ''
    }`,
    entityId: item._id,
    type: entityTypes.art,
  });

  const employeesTeams = uniq(
    item.employees.map(x => [x.employee?.toString(), x.team?.toString()])
  );

  for (const team of item.teams) {
    await SearchResultItem.deleteMany({
      entityId: team._id,
    });

    const teamId = team._id.toString();
    await SearchResultItem.insertMany({
      name: team.name,
      description: `Сотрудников: ${
        employeesTeams.filter(([, id]) => id === teamId).length
      }`,
      entityId: team._id,
      type: entityTypes.team,
    });
  }
};
