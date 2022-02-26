import { FC } from 'react';
import { MenuButton } from './components/menu-button';
import { Container } from './components/container';
import { ArtEmployees } from './components/art-employees';

export const RightMenu: FC = () => {
  return (
    <>
      <MenuButton />
      <Container>
        <ArtEmployees />
      </Container>
    </>
  );
};
