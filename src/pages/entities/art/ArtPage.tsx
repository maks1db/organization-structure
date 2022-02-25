import { FC } from 'react';
import { CellDnD } from './ui/cell';
import './model';

export const Page: FC = () => {
  return (
    <>
      <CellDnD x={1} y={1} />
      <div className="mt-10">
        <CellDnD x={2} y={1} />
      </div>
      <div className="mt-10">
        <CellDnD x={3} y={1} />
      </div>

      <h1>art page</h1>
    </>
  );
};
