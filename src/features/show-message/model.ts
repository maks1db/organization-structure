import { createStore, createEffect, createEvent } from 'effector';

type MessageType = {
  id: number;
  message: string;
  type: string;
};

const setMessage = createEvent<MessageType>();
const deleteMessage = createEvent<number>();
