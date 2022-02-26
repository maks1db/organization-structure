import { useStore } from 'effector-react';
import { FC } from 'react';
import cn from 'classnames';
import { $isOpened } from '../../model';

export const Container: FC = () => {
  const isOpened = useStore($isOpened);
  return (
    <div
      className={cn(
        'fixed top-14 transform transition-all shadow-xl w-64 duration-500 right-0 h-full p-3',
        'border-l border-gray-200',
        isOpened && 'translate-x-0',
        !isOpened && 'translate-x-64'
      )}
    >
      <h1>Подбора сотрудников</h1>
      <h1>Нераспределенный сотрудники</h1>
    </div>
  );
};
