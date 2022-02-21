import { RequestHandler } from 'express';
import { Art, Employee } from 'backend/models';

export const searchEntities: RequestHandler = (req, res) => {
  const { query, skip } = req.query;

  const arts = Art.find({ name: { $regex: query, $options: 'i' } });
  const employees = Employee.find({ name: { $regex: query, $options: 'i' } });
  const teams = Art.find({ 'teams.name': { $regex: query, $options: 'i' } });

  res.send(200).json({
    result: 'ok',
  });
};
