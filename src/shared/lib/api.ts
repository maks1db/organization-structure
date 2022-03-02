import { path } from 'ramda';

export const getResultFromResponse = (data: any) =>
  path(['data', 'result'], data) as any;

export const getErrorFromResponse = (data: any) =>
  path(['response', 'data'], data) as any;
