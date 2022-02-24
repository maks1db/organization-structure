import { FC } from 'react';
import { Cell } from './ui/cell';

export const Page: FC = () => {
  return (
    <>
      <Cell x={1} y={1} />
      <div className="mt-10">
        <Cell x={2} y={1} />
      </div>
      <div className="mt-10">
        <Cell x={3} y={1} />
      </div>

      <h1>art page</h1>
    </>
  );
};
