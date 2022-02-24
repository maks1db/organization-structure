import { FC } from 'react';
import { Cell } from './ui/cell';

export const Page: FC = () => {
  return (
    <>
      <Cell x={1} y={1} />
      <Cell x={2} y={1} />
      <h1>art page</h1>
    </>
  );
};
