/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Art, Employee, Position, UploadDate } from 'backend/models';
import { isNil, uniq } from 'ramda';
import { getFrom } from './lib';

const BEGIN_DATA_ROW = 5;

const prepareEmployees = (worksheets: unknown[][]) => {
  return worksheets
    .filter((_, ind) => ind >= BEGIN_DATA_ROW)
    .map((data, ind) => {
      const getFromData = getFrom(data);

      return {
        workType: getFromData('a'),
        name: getFromData('b'),
        art: getFromData('c'),
        team: getFromData('d'),
        position: getFromData('h'),
        statInitiative: getFromData('e'),
        serviceId: ind.toString(),
      };
    });
};

export const uploadEmployees = async (result: unknown[][]) => {
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
        .map(async p => positions.find(s => s.name === p[1])?._id),
      teams: uniqArtTeams
        .filter(at => at[0] === x && !isNil(at[1]))
        .map(at => ({ name: at[1] })),
    }))
  );

  for (const art of arts) {
    const artItems = uniqArtEmployees
      .filter(x => x[0] === art.name)
      .map(x => ({
        employee: employees.find(e => e.name === x[1])?._id,
        team: art.teams.find(t => t.name === x[3])?._id,
        color: '',
        font: {},
        rate: '',
      }));

    art.isRaw = true;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    art.employees = artItems;
    await art.save();
  }

  await UploadDate.insertMany({
    date: new Date().toISOString(),
  });

  return true;
};
