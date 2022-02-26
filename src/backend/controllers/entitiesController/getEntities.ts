/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { Art, ArtPosition } from 'backend/models';
import { omit } from 'ramda';

const omitVersion = omit(['__v']);

export const art: RequestHandler = async (req, res) => {
  const { id } = req.query;
  const result = await Art.findOne({ _id: id })
    .populate('owner')
    .populate('positions')
    .populate('teams.team')
    .populate({
      path: 'employees.employee',
      populate: {
        path: 'position',
      },
    })
    .populate('employees.team')
    .lean();

  if (result?.positions?.length === 0) {
    const artPositions = await ArtPosition.find({}).populate('positions');
    result.positions = artPositions.map(position => ({
      position: omitVersion(position),
    }));
  }

  res.json({
    result: omitVersion(result),
  });
};
