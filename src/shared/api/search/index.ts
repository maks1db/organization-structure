import axios from 'axios';
import { makeApiUrl } from '../lib';
import { SearchParams } from '../../types/api';

export const search = (params: SearchParams) =>
  axios.get(makeApiUrl('/search'), {
    params,
  });
