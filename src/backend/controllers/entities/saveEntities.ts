import { RequestHandler } from 'express';
import { Art } from 'backend/models';

export const saveArt: RequestHandler = async (req, res) => {
  const { body } = req;

  try {
    await Art.findOneAndUpdate({ _id: body._id }, body);
  } catch {
    res.sendStatus(500).send('Не удалось сохранить арт');
    return;
  }

  res.send({
    result: 'ok',
  });
};
