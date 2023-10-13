import React, { Suspense, lazy } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Loader from './Loader/Loader';
import 'bulma/css/bulma.css';

const HomePage = lazy(() => import('pages/HomePage'));
const MoviesDetails = lazy(() => import('../pages/MoviesDetails'));
const MoviesPage = lazy(() => import('../pages/MoviesPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

export const App = () => {
  return (
    <div className="container">
      <nav
        className="navbar is-warning "
        role="navigation"
        aria-label="dropdown navigation "
      >
        <Link className="navbar-item" to="/">
          Home
        </Link>
        <Link className="navbar-item" to="/movies">
          Movies
        </Link>
      </nav>

      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MoviesDetails />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};
