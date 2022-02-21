import axios from 'axios';

export const getDateLastUploadData = () =>
  axios.get<{ result: string }>('http://localhost:4004/api/v1/upload/lastDate');

export const uploadXlsx = () =>
  axios.post('http://localhost:4004/api/v1/upload/xlsx');
