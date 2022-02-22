import { UploadDate } from 'backend/models';
import { RequestHandler } from 'express';
import { WorkSheet } from 'node-xlsx';

import { isError, parseFile, getRawData } from './lib';
import { uploadEmployees } from './uploadEmployees';
import { uploadArtPositions } from './uploadArtPositions';
import { FileType } from './types';

export const uploadXlsx: RequestHandler = async (req, res) => {
  const filePath = `${process.cwd()}/${req.file?.path}`;

  const isErrorWhenSend = isError(res);
  const worksheets = parseFile(filePath);
  if (isErrorWhenSend(worksheets)) {
    return;
  }

  const rawData = getRawData(worksheets as WorkSheet[]);
  if (isErrorWhenSend(worksheets)) {
    return;
  }

  const { result, fileType } = rawData as {
    result: unknown[][];
    fileType: FileType;
  };

  const fn = fileType === 'employees' ? uploadEmployees : uploadArtPositions;
  await fn(result);

  res.status(200).json({
    result: 'ok',
  });
};

export const getLastUploadDate: RequestHandler = async (req, res) => {
  const item = await UploadDate.findOne();

  res.status(200).json({
    result: item?.date,
  });
};
