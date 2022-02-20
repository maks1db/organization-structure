import { createEvent, createStore } from 'effector';

export const createBaseStore = <T>(defaultValue: T) => {
  const event = createEvent<T>();
  const store = createStore(defaultValue).on(event, (_, value) => value);
  return [store, event] as const;
};
