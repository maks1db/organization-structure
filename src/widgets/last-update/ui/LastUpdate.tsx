import { FC } from 'react';
import { Typography, CircularProgress } from '@abdt/ornament';
import { parseDateHours } from 'shared/lib/date';
import { Link } from 'atomic-router-react';
import { upload } from 'features/routing';

export const LastUpdate: FC = () => (
  <div className="fixed top-0 right-0 p-4 bg-white">
    <div className="text-center w-full">
      <CircularProgress size={40} className="mt-8" />
    </div>

    <Typography
      variant="caption"
      component="div"
      className="font-medium text-abdt-gray500"
    >
      <span>Данные от:</span>
      <span>{parseDateHours(new Date())}</span>
    </Typography>
    <div className="text-center pt-2 w-full text-abdt-mint550">
      <Link to={upload}>Обновить</Link>
    </div>
  </div>
);
