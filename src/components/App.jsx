// import { requestTrendMovies } from '../services/api'
// import { requestMovies } from '../services/api'
// import { requestDetails } from '../services/api'
// import { requestCredits } from '../services/api'
// import { requestReviews } from '../services/api'
import React from 'react';
import NotFoundPage from 'pages/NotFoundPage';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import MoviesDetails from '../pages/MoviesDetails';
import { MoviesPage } from '../pages/MoviesPage';
import { Reviews } from './Reviews/Reviews';
import { Cast } from './Cast/Cast';
// import Trend from './Trend/Trend';

// import { Header } from "../components/Header";
import 'bulma/css/bulma.css';
export const App = () => {
  const location = useLocation();
  return (
    <div>
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route index element={<HomePage />} /> */}
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MoviesDetails />} />

          <Route
            path="*"
            element={
              <div>
                <NotFoundPage />
                <Link to="/">Go back to Home</Link>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};
