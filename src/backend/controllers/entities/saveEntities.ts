import { RequestHandler } from 'express';
import { Art } from 'backend/models';
import { ArtType } from 'shared/types/api';
import { omit } from 'ramda';

const omitId = omit(['_id']);

export const saveArt: RequestHandler = async (req, res) => {
  const typedBody: ArtType = req.body;

  try {
    const doc = await Art.findOne({ _id: typedBody._id });
    doc?.set({
      ...typedBody,
      isRaw: false,
      positions: typedBody.positions.map(omitId),
      employees: typedBody.employees.map(omitId),
      teams: typedBody.teams.map(omitId),
    });

    await doc?.save();
  } catch {
    res.sendStatus(500).send('Не удалось сохранить арт');
    return;
  }

  res.send({
    result: 'ok',
  });
};
