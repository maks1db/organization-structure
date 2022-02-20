/* eslint-disable react/jsx-no-useless-fragment */
import { Message } from '@abdt/ornament';
import { useStore } from 'effector-react';
import { $messages } from '../model';

export const Messages = () => {
  const messages = useStore($messages);
  return (
    <>
      {messages.length > 0 && (
        <div className="fixed z-50 top-3 right-3">
          {messages.map(x => (
            <div className="mb-4">
              <Message variant={x.variant} title={x.message} key={x.id} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
