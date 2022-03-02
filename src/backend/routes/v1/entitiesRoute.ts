import express from 'express';
import {
  getArtPositions,
  getEmployees,
  getTeams,
} from 'backend/controllers/entities/selectEntities';

import { art, employee } from 'backend/controllers/entities/getEntities';
import * as save from 'backend/controllers/entities/saveEntities';

export const entitiesRouter = express.Router();

entitiesRouter.get('/select/artPositions', getArtPositions);
entitiesRouter.get('/select/employees', getEmployees);
entitiesRouter.get('/select/teams', getTeams);
entitiesRouter.get('/art', art);
entitiesRouter.get('/employee', employee);
entitiesRouter.patch('/art', save.saveArt);
