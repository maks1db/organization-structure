/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';

import { ArtType, EmployeeType } from 'shared/types/api';

export type ArtDbType = mongoose.Document<unknown, any, ArtType> & ArtType;

export type EmployeeDbType = mongoose.Document<unknown, any, EmployeeType> &
  EmployeeType;
