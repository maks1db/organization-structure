import express from 'express';
import { uploadRouter } from './uploadRoute';

export const router = express.Router();

router.use('/v1/upload', uploadRouter);
