import { Typography } from '@abdt/ornament';
import { parseDateHours } from 'shared/lib/date';
import { UploadButton } from 'features/upload-xlsx';

export const Page = () => (
  <>
    <div className="w-56">
      <UploadButton />
    </div>
    <Typography variant="caption" display="block" className="mt-6">
      <span>Дата последней загрузки: </span>
      <span>{parseDateHours(new Date())}</span>
    </Typography>
  </>
);
