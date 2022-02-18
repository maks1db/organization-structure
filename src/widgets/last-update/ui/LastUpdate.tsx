import { FC } from 'react';
import { Typography } from '@abdt/ornament';
import { parseDateHours } from 'shared/lib/date';

export const LastUpdate: FC = () => (
  <div className="fixed top-0 right-0 p-4 bg-white">
    <Typography
      variant="caption"
      component="div"
      className="font-medium text-abdt-gray500"
    >
      <span>Данные от:</span>
      <span>{parseDateHours(new Date())}</span>
    </Typography>
    <button type="button" className="text-center pt-2 w-full text-abdt-mint550">
      Обновить
    </button>
  </div>
);
