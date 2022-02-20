import { createEvent, createEffect, split } from 'effector';
import { showAppMessage } from 'features/show-message';
import { isExcel } from './lib';

const VALIDATION_ERROR = 'Возможно загрузить данные только из excel-файла';

export const uploadFile = createEvent<File>();

const uploadFileFx = createEffect();

split({
  source: uploadFile,
  match: (file: File) => (isExcel(file.name) ? 'upload' : 'error'),
  cases: {
    upload: uploadFileFx,
    error: showAppMessage(VALIDATION_ERROR, 'warning'),
  },
});
