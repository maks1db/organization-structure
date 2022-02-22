import { createEffect, createEvent, sample, split } from 'effector';
import { showAppMessage } from 'features/show-message';
import { always, path } from 'ramda';
import { uploadXlsx } from 'shared/api/upload';
import { getLastUploadDate } from 'widgets/last-update';

import { isExcel } from './lib';

const VALIDATION_ERROR_MESSAGE =
  'Возможно загрузить данные только из excel-файла';

const SUCCESS_MESSAGE = 'Данные успешно загружены';

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

sample({
  clock: uploadFileFx.doneData,
  target: getLastUploadDate,
});

sample({
  clock: uploadFileFx.doneData,
  fn: always(SUCCESS_MESSAGE),
  target: showAppMessage('success', SUCCESS_MESSAGE),
});
