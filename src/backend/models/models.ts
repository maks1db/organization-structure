/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from 'mongoose';

import { ArtType, EmployeeType, PositionType } from 'shared/types/api';
import { postSaveArt, postSaveEmployee } from './middlewares';

const font = {
  size: String,
  color: String,
  bold: Boolean,
  italic: Boolean,
  underline: Boolean,
};

const positionScheme = new mongoose.Schema<PositionType>({ name: String });
export const Position = mongoose.model('Position', positionScheme);

const employeeScheme = new mongoose.Schema<EmployeeType>({
  name: String,
  position: { type: mongoose.Types.ObjectId, ref: Position },
  meta: {
    telegram: String,
    email: String,
  },
  workType: String,
  serviceId: String,
  statInitiative: String,
})
  .post('save', postSaveEmployee)
  .post('insertMany', items => items.forEach(postSaveEmployee));

export const Employee = mongoose.model('Employee', employeeScheme);

const artScheme = new mongoose.Schema<ArtType>({
  name: String,
  owner: { type: mongoose.Types.ObjectId, ref: Employee },
  color: String,
  positions: [
    {
      position: { type: mongoose.Types.ObjectId, ref: Position },
      color: String,
      font,
    },
  ],
  teams: [{ name: String, color: String, font }],
  employees: [
    {
      employee: { type: mongoose.Types.ObjectId, ref: Employee },
      team: { type: mongoose.Types.ObjectId, ref: 'Art.teams' },
      color: String,
      font,
      rate: String,
    },
  ],
  unassignedEmployees: [{ type: mongoose.Types.ObjectId, ref: Employee }],
})
  .post('save', postSaveArt)
  .post('insertMany', items => items.forEach(postSaveArt));

export const Art = mongoose.model('Art', artScheme);

export const UploadDate = mongoose.model(
  'UploadDate',
  new mongoose.Schema<{ date: string }>({ date: String })
);
