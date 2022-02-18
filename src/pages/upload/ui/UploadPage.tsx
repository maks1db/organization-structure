import { Typography, Button } from '@abdt/ornament';
import { parseDateHours } from 'shared/lib/date';

export const Page = () => (
  <>
    <Button className="w-52">Загрузить</Button>

    <Typography variant="caption" display="block" className="mt-6">
      <span>Дата последней загрузки: </span>
      <span>{parseDateHours(new Date())}</span>
    </Typography>
  </>
);
