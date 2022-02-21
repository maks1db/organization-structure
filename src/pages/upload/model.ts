import { createEffect, createEvent, sample, split } from 'effector';
import { showAppMessage } from 'features/show-message';
import { path } from 'ramda';
import { uploadXlsx } from 'shared/api/upload';

import { isExcel } from './lib';

const VALIDATION_ERROR_MESSAGE =
  'Возможно загрузить данные только из excel-файла';

export const uploadFile = createEvent<File>();

export const uploadFileFx = createEffect(uploadXlsx);

split({
  source: uploadFile,
  match: (file: File) => (isExcel(file.name) ? 'upload' : 'error'),
  cases: {
    upload: uploadFileFx,
    error: showAppMessage('warning', VALIDATION_ERROR_MESSAGE),
  },
});

sample({
  clock: uploadFileFx.failData,
  fn: data => path(['response', 'data'], data),
  target: showAppMessage('danger'),
});
