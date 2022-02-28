import './styles.css';
import '@abdt/fonts';

import { themes } from '@abdt/ornament';
import { FC } from 'react';

import { ThemeProvider } from '@material-ui/core';
import { Messages } from 'features/show-message';
import { ContextMenu } from 'features/select-from-context-menu';
import { Router } from './Router';
import { Layout } from './ui/layout';
import { MuiStylesProvider } from './providers/StylesProvider';

export const App: FC = () => (
  <MuiStylesProvider>
    <ThemeProvider theme={themes.base}>
      <Layout>
        <Messages />
        <ContextMenu />
        <Router />
      </Layout>
    </ThemeProvider>
  </MuiStylesProvider>
);
