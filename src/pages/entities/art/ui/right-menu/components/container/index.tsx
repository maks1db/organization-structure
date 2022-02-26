import { useStore } from 'effector-react';
import { FC } from 'react';
import cn from 'classnames';
import { $isOpened } from '../../model';

export const Container: FC = ({ children }) => {
  const isOpened = useStore($isOpened);
  return (
    <div
      className={cn(
        'fixed top-14 transform transition-all shadow-xl w-64 duration-500 right-0 h-full p-3 z-20',
        'border-l border-gray-200 bg-white',
        isOpened && 'translate-x-0',
        !isOpened && 'translate-x-64'
      )}
    >
      {children}
    </div>
  );
};
