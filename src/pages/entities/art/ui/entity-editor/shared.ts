import { createDomain, createEvent } from 'effector';

export const reset = createEvent();

export const domain = createDomain();
domain.onCreateStore(store => store.reset(reset));
