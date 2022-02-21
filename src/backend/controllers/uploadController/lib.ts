import xlsx, { WorkSheet } from 'node-xlsx';

const LIST_NAME = 'сотрудники';
const BEGIN_DATA_ROW = 5;

export const parseFile = (file: string) => {
  try {
    return xlsx.parse(file);
  } catch {
    return Error('Не удалось прочитать файл');
  }
};

export const getEmployeesFromParsedDate = (worksheets: WorkSheet[]) => {
  if (worksheets[1].name !== LIST_NAME) {
    return Error(
      `Файл невалидный. Данные должны быть на втором листе "${LIST_NAME}"`
    );
  }

  const result = worksheets[1].data as unknown[][];
  return result;
};

const getFrom = (data: unknown[]) => {
  const names: Record<string, number> = Array.from('abcdefghij').reduce(
    (acc, val, index) => ({ ...acc, [val]: index }),
    {}
  );

  return (column: string) => {
    const typedData = data as string[];
    const ind = names[column];
    return typedData[ind].trim();
  };
};

export const prepareEmployees = (worksheets: unknown[][]) => {
  return worksheets
    .map((data, ind) => {
      if (ind < BEGIN_DATA_ROW) {
        return null;
      }

      const getFromData = getFrom(data);

      return {
        workType: getFromData('a'),
        name: getFromData('b'),
        art: getFromData('c'),
        team: getFromData('d'),
        position: getFromData('h'),
        statInitiative: getFromData('e'),
      };
    })
    .filter(x => x !== null);
};
