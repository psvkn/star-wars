import { lazy } from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';

const PeopleListPage = lazy(() => import('./people-list'));
const PersonDetailsPage = lazy(() => import('./person-details'));

export const Routing = () => (
  <Routes>
    <Route path="/" element={<PeopleListPage />} />
    <Route path="/:personId" element={<PersonDetailsPage />} />
  </Routes>
);
