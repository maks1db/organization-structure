import { createEvent, createStore, createEffect, split } from 'effector';
import { createBaseStore } from '../../shared/lib/effector';
import { isExcel } from './lib';

export const uploadFile = createEvent<File>();
uploadFile.watch(console.log);
const [$errorMessage, setErrorMessage] = createBaseStore('');

const showErrorMessage = (msg: string) =>
  createEffect(() => setErrorMessage(msg));

$errorMessage.watch(console.log);

const uploadFileFx = createEffect();

split({
  source: uploadFile,
  match: (file: File) => (isExcel(file.name) ? 'upload' : 'error'),
  cases: {
    upload: uploadFileFx,
    error: showErrorMessage('Возможно загрузить данные только из excel-файла'),
  },
});
