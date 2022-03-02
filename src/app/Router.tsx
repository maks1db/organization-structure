import { RouterProvider, Route } from 'atomic-router-react';

import { ArtPage } from 'pages/entities/art';
import { ReportArtPage } from 'pages/reports/art';
import { ReportEmployeePage } from 'pages/reports/employee';

import { SearchPage } from 'pages/search';
import { UploadPage } from 'pages/upload';

import * as routing from 'features/routing';

export const Router = () => (
  <RouterProvider router={routing.router}>
    <Route route={routing.search} view={SearchPage} />
    <Route route={routing.entities.art} view={ArtPage} />
    <Route route={routing.upload} view={UploadPage} />
    <Route route={routing.reports.art} view={ReportArtPage} />
    <Route route={routing.reports.employee} view={ReportEmployeePage} />
  </RouterProvider>
);
