import { RequestHandler } from 'express';
import { UploadDate } from '../models';

export const uploadXlsx: RequestHandler = async (req, res) => {
  res.status(200).json({
    result: 'ok',
  });

  await UploadDate.insertMany({
    date: new Date().toISOString(),
  });
};

export const getLastUploadDate: RequestHandler = async (req, res) => {
  const item = await UploadDate.findOne();

  res.status(200).json({
    result: item?.date,
  });
};
