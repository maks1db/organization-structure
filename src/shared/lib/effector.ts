import { createEvent, createStore, Domain } from 'effector';

export const createBaseStore = <T>(defaultValue: T, domain?: Domain) => {
  const event = (domain?.createEvent || createEvent)<T>();
  const store = (domain?.createStore || createStore)(defaultValue).on(
    event,
    (_, value) => value
  );
  return [store, event] as const;
};
