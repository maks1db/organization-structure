import { FC } from 'react';
import { useStore } from 'effector-react';
import { CircularProgress } from '@abdt/ornament';

import { range } from 'ramda';
import { $store } from './model';

import { EditButton } from './ui/edit-button';
import { LinkButton, Cell } from './ui/elements';
import { prepareHelpers } from './lib';

export const Page: FC = () => {
  const { data, isFetching } = useStore($store);

  if (!data || isFetching) {
    return <CircularProgress size={60} className="relative top-16" />;
  }

  const { calcHeight, getCellData } = prepareHelpers(data);

  const teamsRange = range(0, data.teams.length);

  return (
    <div className="w-full relative flex">
      <div className="fixed top-8 right-8 z-10 flex">
        <LinkButton link="https://yandex.ru" icon="Jira" className="mr-2" />
        <LinkButton link="https://google.ru" icon="Confluence" />
      </div>
      <div>
        <Cell name="Арт" itemsPosition="right" className="font-bold" />
        <Cell
          name="Product owner"
          itemsPosition="right"
          className="font-bold"
        />
        <Cell name="Team" itemsPosition="right" className="font-bold" />
        {data.positions.map(x => (
          <Cell
            key={x.position._id}
            name={x.position.name}
            height={calcHeight(x.position)}
            itemsPosition="right"
            className="font-bold"
          />
        ))}
      </div>
      <div>
        <Cell
          name={data.name}
          width={data.teams.length}
          className="font-rubrik font-bold"
        />
        <Cell
          name="Скворцов Максим"
          width={data.teams.length}
          className="font-rubrik"
        />
        <div className="flex">
          {data.teams.map(x => (
            <Cell key={x._id} name={x.team.name} />
          ))}
        </div>
        {data.positions.map(x => (
          <div key={x.position._id} className="flex">
            {teamsRange.map(y => (
              <Cell
                key={`${x.position._id}-${y}`}
                data={getCellData(x.position, data.teams[y].team)}
                height={calcHeight(x.position)}
              />
            ))}
          </div>
        ))}
      </div>
      <EditButton />
    </div>
  );
};
