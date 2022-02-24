import axios from 'axios';
import { makeApiUrl } from '../lib';

export const getArtPositions = () =>
  axios.get(makeApiUrl('/entities/select/artPositions'));

export const getEmployees = () =>
  axios.get(makeApiUrl('/entities/select/employees'));
