import { useRef } from 'react';
import { Button, Typography, CircularProgress } from '@abdt/ornament';
import { pipe, path } from 'ramda';
import { useStore } from 'effector-react';
import { combine } from 'effector';
import { $lastUploadDate } from 'widgets/last-update';

import { uploadFile, uploadFileFx } from '../model';

const getFileAndUpload = pipe(path(['target', 'files', 0]), uploadFile);

const $store = combine({
  isFetching: uploadFileFx.pending,
  lasUploadDate: $lastUploadDate,
});

export const Page = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { isFetching, lasUploadDate } = useStore($store);

  return (
    <>
      <div className="w-56">
        <Button
          className="w-full"
          onClick={() => ref.current?.click()}
          disabled={isFetching}
        >
          Загрузить
        </Button>
        <input hidden type="file" onChange={getFileAndUpload} ref={ref} />
      </div>
      {isFetching && (
        <div className="mt-6">
          <CircularProgress size={50} />
        </div>
      )}
      {lasUploadDate && (
        <Typography variant="caption" display="block" className="mt-6">
          <span>Дата последней загрузки: </span>
          <span>{lasUploadDate}</span>
        </Typography>
      )}
    </>
  );
};
