import { FC } from 'react';
import { ArrowLeft } from '@abdt/icons';
import { useStore } from 'effector-react';
import { goBack, $appHeader } from './model';

export const Header: FC = () => {
  const header = useStore($appHeader);

  return (
    <div className="bg-abdt-mint400 fixed h-14 top-0 left-0 right-0 z-20 shadow-xl py-2 px-20 flex items-center">
      <button
        className="absolute cursor-pointer left-2 p-4"
        type="button"
        onClick={() => goBack()}
      >
        <ArrowLeft color="#fff" />
      </button>
      <div className="text-white font-bold text-3xl">{header}</div>
    </div>
  );
};
