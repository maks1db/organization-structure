import { FC } from 'react';
import { useStore } from 'effector-react';
import { combine } from 'effector';
import { Typography, CircularProgress } from '@abdt/ornament';
import cn from 'classnames';
import { Link } from 'atomic-router-react';
import { upload } from 'features/routing';

import { getLastUploadDateFx, $lastUploadDate } from '../model';

const $store = combine({
  isFetching: getLastUploadDateFx.pending,
  lastUploadDate: $lastUploadDate,
});

export const LastUpdate: FC = () => {
  const { isFetching, lastUploadDate } = useStore($store);
  return (
    <div className="fixed top-0 right-0 p-4 bg-white">
      {isFetching && (
        <div className="text-center w-full">
          <CircularProgress size={40} className="mt-8" />
        </div>
      )}

      {!isFetching && (
        <>
          {lastUploadDate && (
            <Typography
              variant="caption"
              component="div"
              className="font-medium text-abdt-gray500"
            >
              <span>Данные от:</span>
              <span>{lastUploadDate}</span>
            </Typography>
          )}
          <div
            className={cn(
              'text-center pt-2 w-full',
              !lastUploadDate && 'text-red-800',
              lastUploadDate && 'text-abdt-mint550'
            )}
          >
            <Link to={upload}>
              {lastUploadDate ? 'Обновить' : 'Загрузить данные'}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
