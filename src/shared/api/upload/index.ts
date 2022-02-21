import axios from 'axios';

export const getDateLastUploadData = () =>
  axios.get<{ result: string }>('http://localhost:4004/api/v1/upload/lastDate');

export const uploadXlsx = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    url: 'http://localhost:4004/api/v1/upload/xlsx',
    data: formData,
  });
};
