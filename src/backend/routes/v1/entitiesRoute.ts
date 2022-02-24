import express from 'express';
import {
  getArtPositions,
  getEmployees,
} from '../../controllers/entitiesController';

export const entitiesRouter = express.Router();

entitiesRouter.get('/select/artPositions', getArtPositions);
entitiesRouter.get('/select/employees', getEmployees);
