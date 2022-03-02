import { FC } from 'react';
import { useStore } from 'effector-react';
import { CircularProgress } from '@abdt/ornament';

import { $store } from './model';

import { EditButton } from './ui/edit-button';
import { LinkButton } from './ui/elements';

export const Page: FC = () => {
  const { data, isFetching } = useStore($store);

  if (!data || isFetching) {
    return <CircularProgress size={60} className="relative top-16" />;
  }

  return (
    <div className="w-full">
      <div className="font-rubrik">
        <h1 className="bold text-2xl">{data.name}</h1>
        <div className="fixed top-8 right-8 z-10 flex">
          <LinkButton link="https://yandex.ru" icon="Jira" className="mr-2" />
          <LinkButton link="https://google.ru" icon="Confluence" />
        </div>
      </div>
      <h1>art</h1>
      <EditButton />
    </div>
  );
};
