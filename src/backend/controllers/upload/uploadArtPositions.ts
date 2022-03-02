/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Position, ArtPosition } from 'backend/models';
import { isNil } from 'ramda';
import { getFrom } from './lib';

const BEGIN_DATA_ROW = 2;

const prepareItems = (worksheets: unknown[][]) => {
  return worksheets
    .filter((_, ind) => ind >= BEGIN_DATA_ROW)
    .map(data => {
      const getFromData = getFrom(data);

      return {
        group: getFromData('a'),
        name: getFromData('b'),
      };
    })
    .filter(x => !isNil(x.name));
};

const preparePositionsItem = (worksheets: unknown[][]) => {
  return worksheets
    .filter((_, ind) => ind >= BEGIN_DATA_ROW)
    .map(data => {
      const getFromData = getFrom(data);

      return {
        position: getFromData('f'),
        name: getFromData('g'),
      };
    })
    .filter(x => !isNil(x.name));
};

export const uploadArtPositions = async (worksheets: unknown[][]) => {
  const items = prepareItems(worksheets);
  const positions = preparePositionsItem(worksheets);

  const dbPositions = await Position.find({});

  for (const item of items) {
    const positionsIds = positions
      .filter(x => x.name === item.name)
      .map(x => dbPositions.find(p => p.name === x.position)?._id);

    await ArtPosition.insertMany({
      ...item,
      positions: positionsIds,
    });
  }
};
