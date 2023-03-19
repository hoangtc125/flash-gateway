import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Pc from './pc';
import PcDetail from './pc-detail';
import PcUpdate from './pc-update';
import PcDeleteDialog from './pc-delete-dialog';

const PcRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Pc />} />
    <Route path="new" element={<PcUpdate />} />
    <Route path=":id">
      <Route index element={<PcDetail />} />
      <Route path="edit" element={<PcUpdate />} />
      <Route path="delete" element={<PcDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PcRoutes;
