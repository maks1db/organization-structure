import express from 'express';
import * as uploadController from '../../controllers/uploadController';

export const uploadRouter = express.Router();

uploadRouter.post('/xlsx', uploadController.uploadXlsx);
uploadRouter.get('/lastDate', uploadController.getLastUploadDate);
