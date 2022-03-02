import { createRoute, RouteInstance, createHistoryRouter } from 'atomic-router';
import { EntityType } from 'shared/types/api';
import { createBrowserHistory } from 'history';

export const search = createRoute();
export const upload = createRoute();

export const entities: Record<EntityType, RouteInstance<{ id: string }>> = {
  art: createRoute<{ id: string }>(),
  employee: createRoute<{ id: string }>(),
  team: createRoute<{ id: string }>(),
  artPosition: createRoute<{ id: string }>(),
};

export const reports: Record<EntityType, RouteInstance<{ id: string }>> = {
  art: createRoute<{ id: string }>(),
  employee: createRoute<{ id: string }>(),
  team: createRoute<{ id: string }>(),
  artPosition: createRoute<{ id: string }>(),
};

const routes = [
  { path: '/', route: search },
  { path: '/entities/art/:id', route: entities.art },
  { path: '/entities/team/:id', route: entities.team },
  { path: '/entities/employee/:id', route: entities.employee },
  { path: '/reports/art/:id', route: reports.art },
  { path: '/reports/team/:id', route: reports.team },
  { path: '/reports/employee/:id', route: reports.employee },
  { path: '/upload', route: upload },
];

export const router = createHistoryRouter({
  routes,
});

const history = createBrowserHistory();
router.setHistory(history);
