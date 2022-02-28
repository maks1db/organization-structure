import express from 'express';
import {
  getArtPositions,
  getEmployees,
  getTeams,
} from 'backend/controllers/entitiesController/selectEntities';

import { art } from 'backend/controllers/entitiesController/getEntities';

export const entitiesRouter = express.Router();

entitiesRouter.get('/select/artPositions', getArtPositions);
entitiesRouter.get('/select/employees', getEmployees);
entitiesRouter.get('/select/teams', getTeams);
entitiesRouter.get('/art', art);
