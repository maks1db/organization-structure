import { Message } from '@abdt/ornament';

export const Messages = () => {
  return (
    <div className="fixed z-50 top-3 right-3">
      <Message variant="danger" title="Что-то пошло не так" />
    </div>
  );
};
