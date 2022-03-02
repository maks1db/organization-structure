/* eslint-disable react/jsx-no-useless-fragment */
import { Save } from '@material-ui/icons';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { FC } from 'react';
import cn from 'classnames';

import { $isModify, saveArt, $artIsPendingSave } from '../../model';
import { $isOpened } from '../right-menu';

const $store = combine({
  isModify: $isModify,
  isOpened: $isOpened,
  isFetching: $artIsPendingSave,
});

const events = {
  onClick: () => saveArt(),
  onKeyUp: () => saveArt(),
};

export const SaveButton: FC = () => {
  const { isModify, isOpened, isFetching } = useStore($store);
  return (
    <>
      {isModify && (
        <div
          role="button"
          tabIndex={0}
          className={cn(
            'fixed z-50 bottom-8 right-8 bg-abdt-mint400 rounded-full p-5',
            'shadow cursor-pointer transform transition-all duration-500',
            isOpened && '-translate-x-64',
            !isOpened && 'translate-x-0',
            isFetching && 'opacity-50'
          )}
          {...(isFetching && events)}
          onClick={() => saveArt()}
          onKeyUp={() => saveArt()}
        >
          <Save fontSize="large" className="font-2xl" htmlColor="#fff" />
        </div>
      )}
    </>
  );
};
