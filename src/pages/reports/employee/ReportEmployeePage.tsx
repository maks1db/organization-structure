import { FC } from 'react';
import { Divider, CircularProgress } from '@abdt/ornament';
import { useStore } from 'effector-react';
import { $store } from './model';

interface InfoProps {
  label: string;
  value?: string;
  className?: string;
}

const Info: FC<InfoProps> = ({ label, value, className, children }) => {
  return (
    <div className={className}>
      <span className="font-bold mr-2">{`${label}:`}</span>
      {children || <span>{value}</span>}
    </div>
  );
};

export const Page: FC = () => {
  const { data, isFetching } = useStore($store);

  if (isFetching || !data) {
    return <CircularProgress size={60} />;
  }
  return (
    <div className="font-rubrik p-10 shadow-xl rounded-lg border border-gray-200">
      <div className="flex">
        <div className="w-72">
          <div className="flex items-center justify-center w-full">
            <div
              className="bg-cover bg-center w-48 h-48 rounded-full shadow"
              style={{
                backgroundImage: `url(https://source.unsplash.com/random/200x200?sig=1)`,
              }}
            />
          </div>

          <div className="font-bold mt-3 text-xl ">{data?.name}</div>
          <Info className="mt-4" label="Tel" value="+7 XXX XXX-XX-XX" />
          <Info className="mt-1" label="Mail">
            <span className="text-blue-600 cursor-pointer">
              my.mail@akbars.ru
            </span>
          </Info>
          <Info className="mt-1" label="Telegram">
            <span className="text-blue-600 cursor-pointer">@hello.world</span>
          </Info>
        </div>

        <div className="ml-10">
          <Info label="Должность">
            <span className="text-gray-700">{data.position.name}</span>
            <span className="mx-1">/</span>
            <span className="text-blue-600 cursor-pointer font-bold">
              Здесь будет имя арта
            </span>
          </Info>
          <Info label="Инициатива" className="mt-2">
            <span className="text-gray-700">{data.statInitiative}</span>
          </Info>
          <Info label="Компания" className="mt-2">
            <span className="text-gray-700">{data.workType}</span>
          </Info>
          <Divider className="my-2" />
          <div className="my-2">Участвует в:</div>
          <Info label="АРТы" className="mt-2">
            <span className="text-blue-600 cursor-pointer font-bold">АРТ1</span>
            <span className="mx-1">/</span>
            <span className="text-blue-600 cursor-pointer font-bold">АРТ2</span>
          </Info>
          <Info label="Команды" className="mt-2">
            <span className="text-blue-600 cursor-pointer font-bold">
              Flash
            </span>
            <span className="mx-1">/</span>
            <span className="text-blue-600 cursor-pointer font-bold">
              CoreTeam
            </span>
          </Info>
          <Info label="Кланы" className="mt-2">
            <span className="cursor-pointer text-gray-500">
              Тут будут кланы
            </span>
          </Info>
          <Info label="Хабы" className="mt-2">
            <span className="cursor-pointer text-gray-500">Тут будут хабы</span>
          </Info>
        </div>
      </div>
    </div>
  );
};
