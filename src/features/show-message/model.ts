import { createStore, createEffect, createEvent } from 'effector';
import { MessageProps } from '@abdt/ornament';

const TIMEOUT_VISIBLE_MESSAGE = 6000;

type MessageType = {
  id: number;
  message: string;
  variant: MessageProps['variant'];
};

const addMsg = createEvent<MessageType>();
const deleteMsg = createEvent<number>();

export const $messages = createStore<MessageType[]>([])
  .on(addMsg, (state, payload) => [...state, payload])
  .on(deleteMsg, (state, payload) => state.filter(x => x.id !== payload));

export const showAppMessage = (
  message: string,
  variant?: MessageProps['variant']
) =>
  createEffect(() => {
    const id = new Date().valueOf();

    setTimeout(() => deleteMsg(id), TIMEOUT_VISIBLE_MESSAGE);
    addMsg({
      id,
      message,
      variant: variant || 'info',
    });
  });
