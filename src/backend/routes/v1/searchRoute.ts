import express from 'express';
import { searchEntities } from '../../controllers/search';

export const searchRouter = express.Router();

searchRouter.get('/search', searchEntities);
