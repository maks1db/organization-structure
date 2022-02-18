import { FC } from 'react';
import cn from 'classnames';
import styles from './Layout.module.scss';

export const Layout: FC = ({ children }) => (
  <div
    className={cn(
      styles.layout,
      'flex justify-center flex-col w-full items-center'
    )}
  >
    {children}
  </div>
);
