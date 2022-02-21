import express from 'express';
import { searchEntities } from '../../controllers/searchController';

export const searchRouter = express.Router();

searchRouter.get('/search', searchEntities);
