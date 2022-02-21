import { RequestHandler } from 'express';
import { UploadDate } from 'backend/models';
import { WorkSheet } from 'node-xlsx';
import { getEmployeesFromParsedDate, parseFile, prepareEmployees } from './lib';

export const uploadXlsx: RequestHandler = async (req, res) => {
  const filePath = `${process.cwd()}/${req.file?.path}`;
  const data = parseFile(filePath);
  if (data instanceof Error) {
    res.status(500).send({ error: data.message });
    return;
  }

  const result = getEmployeesFromParsedDate(data as WorkSheet[]);
  if (result instanceof Error) {
    res.status(500).send(result.message);
    return;
  }

  const parsedEmployees = prepareEmployees(result);

  console.log(parsedEmployees);
  res.status(200).json({
    result: parsedEmployees,
  });

  // await UploadDate.insertMany({
  //   date: new Date().toISOString(),
  // });
};

export const getLastUploadDate: RequestHandler = async (req, res) => {
  const item = await UploadDate.findOne();

  res.status(200).json({
    result: item?.date,
  });
};
