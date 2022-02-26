import { FC } from 'react';
import { MenuButton } from './components/menu-button';
import { Container } from './components/container';

export const RightMenu: FC = () => {
  return (
    <>
      <MenuButton />
      <Container />
    </>
  );
};
