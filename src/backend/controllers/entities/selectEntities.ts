/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { Employee, ArtPosition, Team } from 'backend/models';
import { SelectItem } from 'shared/types/entities-api';

const makeUid = () => {
  const prefix = new Date().valueOf().toString();
  return (id: string) => `${prefix}-${id}`;
};

export const getEmployees: RequestHandler = async (req, res) => {
  const result = await Employee.find({
    name: { $not: /вакансия/i },
  })
    .sort('name')
    .lean();

  const uidFrom = makeUid();

  res.json({
    result: result.map(
      x =>
        ({
          id: x._id,
          name: x.name,
          workType: x.workType,
          data: x,
          uid: uidFrom(x._id),
        } as SelectItem)
    ),
  });
};

export const getTeams: RequestHandler = async (req, res) => {
  const result = await Team.find({}).sort('name').lean();
  const uidFrom = makeUid();

  res.json({
    result: result.map(
      x =>
        ({
          id: x._id,
          name: x.name,
          uid: uidFrom(x._id),
          data: x,
        } as SelectItem)
    ),
  });
};

export const getArtPositions: RequestHandler = async (req, res) => {
  const result = await ArtPosition.find({}).sort('name').lean();
  const uidFrom = makeUid();

  res.json({
    result: result.map(
      x =>
        ({
          id: x._id.toString(),
          name: x.name,
          uid: uidFrom(x._id),
          data: x,
        } as SelectItem)
    ),
  });
};
