import { PORT } from '../constants';

export const makeApiUrl = (controller: string) =>
  `http://localhost:${PORT}/api/v1${controller}`;
