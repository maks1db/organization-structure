import { RequestHandler } from 'express';
import { UploadDate, Art, Employee, Position } from 'backend/models';
import { WorkSheet } from 'node-xlsx';
import { isNil, uniq } from 'ramda';
import {
  getEmployeesFromParsedDate,
  parseFile,
  prepareEmployees,
  isError,
} from './lib';

export const uploadXlsx: RequestHandler = async (req, res) => {
  const filePath = `${process.cwd()}/${req.file?.path}`;

  const isErrorWhenSend = isError(res);
  const data = parseFile(filePath);
  if (isErrorWhenSend(data)) {
    return;
  }

  const result = getEmployeesFromParsedDate(data as WorkSheet[]);
  if (isErrorWhenSend(result)) {
    return;
  }

  const parsedEmployees = prepareEmployees(result as unknown[][]);

  const uniqPositions = uniq(
    parsedEmployees.map(x => x.position).filter(Boolean)
  );
  const uniqArts = uniq(parsedEmployees.map(x => x.art).filter(Boolean));
  const uniqArtTeams = uniq(
    parsedEmployees.map(x => [x?.art, x?.team]).filter(Boolean)
  );
  const uniqArtPositions = uniq(
    parsedEmployees.map(x => [x?.art, x?.position]).filter(Boolean)
  );
  const uniqEmployees = uniq(
    parsedEmployees.map(x => [x.name, x.position, x.workType, x.statInitiative])
  );
  const uniqArtEmployees = uniq(
    parsedEmployees.map(x => [x.art, x.name, x.position, x.team])
  );

  const positions = await Position.insertMany(
    uniqPositions.map(x => ({ name: x }))
  );
  const employees = await Employee.insertMany(
    uniqEmployees.map(x => ({
      name: x[0],
      position: positions.find(p => p.name === x[1])?._id,
      workType: x[2],
      statInitiative: x[3],
    }))
  );

  const arts = await Art.insertMany(
    uniqArts.map(x => ({
      name: x,
      positions: uniqArtPositions
        .filter(p => p[0] === x)
        .map(p => positions.find(s => s.name === p[1])?._id),
      teams: uniqArtTeams
        .filter(at => at[0] === x && !isNil(at[1]))
        .map(at => ({ name: at[1] })),
    }))
  );

  arts.forEach(art => {
    const artItems = uniqArtEmployees
      .filter(x => x[0] === art.name)
      .map(x => ({
        employee: employees.find(e => e.name === x[1])?._id,
        position: positions.find(p => p.name === x[2])?._id,
        team: art.teams.find(t => t.name === x[3])?._id,
        color: '',
        font: {},
        rate: '',
      }));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    art.employees = artItems;
    art.save();
  });

  res.status(200).json({
    result: uniqEmployees,
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
