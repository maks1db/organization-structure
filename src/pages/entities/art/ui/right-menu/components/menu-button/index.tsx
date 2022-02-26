import { FC } from 'react';
import { ChevronRight } from '@abdt/icons';
import cn from 'classnames';

import { useStore } from 'effector-react';
import { $isOpened, toggleMenuVisibility } from '../../model';

export const MenuButton: FC = () => {
  const isOpened = useStore($isOpened);
  return (
    <div
      className={cn(
        'bg-abdt-mint400 w-10 h-14 shadow right-0 top-1/2 transition-all fixed',
        'flex items-center justify-center transform duration-500',
        'rounded-tl-md rounded-bl-md',
        isOpened && '-translate-x-64'
      )}
      role="button"
      onClick={() => toggleMenuVisibility()}
      onKeyUp={() => toggleMenuVisibility()}
      tabIndex={0}
    >
      <ChevronRight
        color="#fff"
        width={30}
        height={30}
        className={cn(
          'transition-all transform duration-500',
          isOpened && 'rotate-180'
        )}
      />
    </div>
  );
};
