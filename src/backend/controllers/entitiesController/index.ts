/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { Employee, ArtPosition } from 'backend/models';
import { SelectItem } from 'shared/types/entities-api';

export const getEmployees: RequestHandler = async (_, res) => {
  const result = await Employee.find({ name: { $not: /вакансия/i } })
    .sort('name')
    .lean();

  res.json({
    result: result.map(
      x =>
        ({
          id: x._id.toString(),
          name: x.name,
          workType: x.workType,
        } as SelectItem)
    ),
  });
};

export const getArtPositions: RequestHandler = async (_, res) => {
  const result = await ArtPosition.find({}).sort('name').lean();

  res.json({
    result: result.map(
      x =>
        ({
          id: x._id.toString(),
          name: x.name,
        } as SelectItem)
    ),
  });
};
