import axios from 'axios';
import { makeApiUrl } from '../lib';

interface QueryParams {
  id: string;
}

export const getArtPositions = () =>
  axios.get(makeApiUrl('/entities/select/artPositions'));

export const getEmployees = () =>
  axios.get(makeApiUrl('/entities/select/employees'));
export const getTeams = () => axios.get(makeApiUrl('/entities/select/teams'));

export const getEntityArt = (params: QueryParams) =>
  axios.get(makeApiUrl('/entities/art'), { params });
