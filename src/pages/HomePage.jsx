import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestTrendMovies } from '../services/api';

const HomePage = () => {
  const [trendMovies, setTrendMovies] = useState([]);

  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!trendMovies || trendMovies.length === 0) {
      const fetchTrendMovies = async () => {
        try {
          const { results } = await requestTrendMovies();
          setTrendMovies(results);
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchTrendMovies();
    }
  }, [trendMovies]);

  return (
    <div>
      <h1 className="title is-4">Trending movies</h1>
      <ul>
        {trendMovies.map(el => {
          return (
            <li key={el.id}>
              <Link to={`/movies/${el.id}`} key={el.id}>
                {el.title || el.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default HomePage;
