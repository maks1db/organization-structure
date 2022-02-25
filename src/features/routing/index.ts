import { createRoute, RouteInstance } from 'atomic-router';
import { EntityType } from 'shared/types/api';

export const search = createRoute();
export const upload = createRoute();

export const entities: Record<EntityType, RouteInstance<{ id: string }>> = {
  art: createRoute<{ id: string }>(),
  employee: createRoute<{ id: string }>(),
  team: createRoute<{ id: string }>(),
  artPosition: createRoute<{ id: string }>(),
};
