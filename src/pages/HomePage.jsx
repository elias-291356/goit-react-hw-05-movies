import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { requestTrendMovies } from '../services/api';

export const HomePage = () => {
  const [trendMovies, setTrendMovies] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trendMovies) return;
    const fetchTrendMovies = async () => {
      try {
        const { results } = await requestTrendMovies();
        setTrendMovies(results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTrendMovies(trendMovies);
  }, [trendMovies]);

  return (
    <div>
      <aside>
        <h1 className="menu-label">Trending movies</h1>
        <ul className="menu-list">
          {trendMovies.map(el => {
            return (
              <Link to={`/movies/${el.id}`} key={el.id}>
                {el.title || el.name}
              </Link>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};
