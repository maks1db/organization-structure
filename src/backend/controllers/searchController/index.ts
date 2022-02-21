/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { SearchResultItem } from 'backend/models';
import { omit } from 'ramda';

export const searchEntities: RequestHandler = async (req, res) => {
  const { search, skip } = req.query;

  const result = await SearchResultItem.find({
    name: new RegExp(search as string, 'i'),
  })
    .skip(parseInt(skip as string, 10))
    .lean();

  res.json({
    result: result.map(omit(['_id', '__v'])),
  });
};
