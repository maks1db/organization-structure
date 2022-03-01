import { FC } from 'react';
import { Divider } from '@abdt/ornament';
import { MenuButton } from './components/menu-button';
import { Container } from './components/container';
import { ArtEmployees } from './components/art-employees';
import { Employees } from './components/employees';

export const RightMenu: FC = () => {
  return (
    <>
      <MenuButton />
      <Container>
        <ArtEmployees />
        <Divider className="my-5" />
        <Employees />
      </Container>
    </>
  );
};
