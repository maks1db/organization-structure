import express from 'express';
import multer from 'multer';
import * as uploadController from '../../controllers/upload';

export const uploadRouter = express.Router();

const upload = multer({ dest: './.temp' });

uploadRouter.post('/xlsx', upload.single('file'), uploadController.uploadXlsx);
uploadRouter.get('/lastDate', uploadController.getLastUploadDate);
