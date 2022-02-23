import { createRoute } from 'atomic-router';

export const search = createRoute();
export const upload = createRoute();

export const entities = {
  art: createRoute<{ id: string }>(),
};
