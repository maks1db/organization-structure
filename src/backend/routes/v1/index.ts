import express from 'express';
import { uploadRouter } from './uploadRoute';
import { searchRouter } from './searchRoute';
import { entitiesRouter } from './entitiesRoute';

export const router = express.Router();

router.use('/v1/upload', uploadRouter);
router.use('/v1', searchRouter);
router.use('/v1/entities', entitiesRouter);
