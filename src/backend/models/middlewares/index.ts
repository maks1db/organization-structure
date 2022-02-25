/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import mongoose from 'mongoose';

import { SearchResult, EntityType } from 'shared/types/api';
import { ArtDbType, EmployeeDbType } from './types';
import { getArtDescription, getTeamDescription } from './lib';

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

export const postSaveEmployee = async (item: EmployeeDbType) => {
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

export const postSaveArt = async (item: ArtDbType) => {
  await SearchResultItem.deleteMany({
    entityId: item._id,
  });

  await SearchResultItem.insertMany({
    name: item.name,
    description: getArtDescription(item),
    entityId: item._id,
    type: entityTypes.art,
  });

  const getTeamDescriptionById = getTeamDescription(item);
  for (const { team } of item.teams) {
    await SearchResultItem.deleteMany({
      entityId: team._id,
    });

    const teamId = team._id.toString();
    await SearchResultItem.insertMany({
      name: team.name,
      description: getTeamDescriptionById(teamId),
      entityId: team._id,
      type: entityTypes.team,
    });
  }
};
