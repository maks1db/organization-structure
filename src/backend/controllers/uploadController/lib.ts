import xlsx, { WorkSheet } from 'node-xlsx';
import { Response } from 'express';
import { FileType } from './types';

const LIST_EMPLOYEES_NAME = 'сотрудники';
const LIST_ART_POSITIONS_NAME = 'Справочники';

export const parseFile = (file: string) => {
  try {
    return xlsx.parse(file);
  } catch {
    return Error('Не удалось прочитать файл');
  }
};

const getFileType = (worksheets: WorkSheet[]): FileType | undefined => {
  if (
    worksheets?.[0].name === LIST_ART_POSITIONS_NAME &&
    worksheets.length === 1
  ) {
    return 'artPositions';
  }
  if (worksheets?.[1]?.name === LIST_EMPLOYEES_NAME && worksheets.length > 1) {
    return 'employees';
  }

  return undefined;
};

export const getRawData = (worksheets: WorkSheet[]) => {
  const fileType = getFileType(worksheets);
  if (fileType === undefined) {
    return Error('Файл не является источником данных для БД');
  }

  const result = worksheets[fileType === 'artPositions' ? 0 : 1]
    .data as unknown[][];

  if (result === undefined) {
    return Error('Не удалось прочитать содержимое файла');
  }
  return { result, fileType };
};

export const isError =
  (res: Response) =>
  <T>(data: T | Error) => {
    if (data instanceof Error) {
      res.status(500).send(data.message);
      return true;
    }

    return false;
  };

export const getFrom = (data: unknown[]) => {
  const names: Record<string, number> = Array.from('abcdefghij').reduce(
    (acc, val, index) => ({ ...acc, [val]: index }),
    {}
  );

  return (column: string) => {
    const typedData = data as string[];
    const ind = names[column];
    return typedData[ind]?.trim();
  };
};
