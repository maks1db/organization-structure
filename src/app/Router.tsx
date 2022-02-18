import { createHistoryRouter } from 'atomic-router';
import { RouterProvider, Route } from 'atomic-router-react';
import { createBrowserHistory } from 'history';

import { ArtPage } from 'pages/art';
import { SearchPage } from 'pages/search';
import { UploadPage } from 'pages/upload';

const routes = [
  { path: '/', route: SearchPage.route },
  { path: '/art/:id', route: ArtPage.route },
  { path: '/upload', route: UploadPage.route },
];

const router = createHistoryRouter({
  routes,
});

const history = createBrowserHistory();
router.setHistory(history);

export const Router = () => (
  <RouterProvider router={router}>
    <Route route={SearchPage.route} view={SearchPage.Page} />
    <Route route={ArtPage.route} view={ArtPage.Page} />
    <Route route={UploadPage.route} view={UploadPage.Page} />
  </RouterProvider>
);
