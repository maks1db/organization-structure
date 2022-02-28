import { createEvent, createStore, Domain, createDomain } from 'effector';

export const createBaseStore = <T>(defaultValue: T, domain?: Domain) => {
  const event = (domain?.createEvent || createEvent)<T>();
  const store = (domain?.createStore || createStore)(defaultValue).on(
    event,
    (_, value) => value
  );
  return [store, event] as const;
};

export const createResetDomain = () => {
  const domain = createDomain();
  const reset = createEvent();

  domain.onCreateStore(store => {
    store.reset(reset);
  });
  return { domain, reset };
};
