import { FC, useRef } from 'react';
import { Button } from '@abdt/ornament';
import { pipe, path } from 'ramda';

import { uploadFile } from '../model';

const getFileAndUpload = pipe(path(['target', 'files', 0]), uploadFile);

export const UploadButton: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button className="w-full" onClick={() => ref.current?.click()}>
        Загрузить
      </Button>
      <input hidden type="file" onChange={getFileAndUpload} ref={ref} />
    </>
  );
};
