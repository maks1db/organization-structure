import { createHistoryRouter } from 'atomic-router';
import { RouterProvider, Route } from 'atomic-router-react';
import { createBrowserHistory } from 'history';

import { ArtPage } from 'pages/art';
import { SearchPage } from 'pages/search';
import { UploadPage } from 'pages/upload';

import * as routing from 'features/routing';

const routes = [
  { path: '/', route: routing.search },
  { path: '/art/:id', route: routing.art },
  { path: '/upload', route: routing.upload },
];

const router = createHistoryRouter({
  routes,
});

const history = createBrowserHistory();
router.setHistory(history);

export const Router = () => (
  <RouterProvider router={router}>
    <Route route={routing.search} view={SearchPage} />
    <Route route={routing.art} view={ArtPage} />
    <Route route={routing.upload} view={UploadPage} />
  </RouterProvider>
);
