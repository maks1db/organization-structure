import { FC } from 'react';

import { EntityEditor } from 'widgets/entity-editor';
import { Header } from 'widgets/header';
import { Employees, Positions, Teams } from './ui/art-structure';
import { BaseCell, DEFAULT_CELL_WIDTH } from './ui/cell';
import { RightMenu, EmployeeInfo } from './ui/right-menu';
import './model';

export const Page: FC = () => {
  return (
    <>
      <EntityEditor />
      <Header />
      <EmployeeInfo className="fixed z-20 top-4 right-4 text-white" />
      <div className="w-full relative top-14">
        <RightMenu />
        <div className="absolute z-10">
          <BaseCell row={0} className="mb-1 mr-1 font-bold flex" />
          <Positions />
        </div>
        <div className="relative" style={{ left: `${DEFAULT_CELL_WIDTH}rem` }}>
          <div className="flex">
            <Teams />
          </div>
          <Employees />
        </div>
      </div>
    </>
  );
};
