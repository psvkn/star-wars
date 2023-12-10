import { lazy } from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';

const PeopleListPage = lazy(() => import('./people-list'));

export const Routing = () => (
  <Routes>
    <Route path="/" element={<PeopleListPage />} />
  </Routes>
);
