import { FC } from 'react';
import { Edit } from '@material-ui/icons';
import cn from 'classnames';
import { openArt } from './model';

export const EditButton: FC = () => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        'fixed z-50 bottom-8 right-8 bg-abdt-mint400 rounded-full p-5',
        'shadow cursor-pointer'
      )}
      onClick={() => openArt()}
      onKeyUp={() => openArt()}
    >
      <Edit fontSize="large" className="font-2xl" htmlColor="#fff" />
    </div>
  );
};
