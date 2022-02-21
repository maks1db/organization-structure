import axios from 'axios';
import { makeApiUrl } from '../lib';

export const getDateLastUploadData = () =>
  axios.get<{ result: string }>(makeApiUrl('/upload/lastDate'));

export const uploadXlsx = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    url: makeApiUrl('/upload/xlsx'),
    data: formData,
  });
};
