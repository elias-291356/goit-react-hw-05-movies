import React, { useState, useEffect, useRef } from 'react';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { requestMovies } from '../services/api';
export const MoviesPage = () => {
  const [searchMovie, setsearchedMovie] = useState([]);

  const [params, setUseParams] = useSearchParams();

  // const location = useLocation();
  // const backLinkRef = useRef(location.state?.from);

  const onSubmit = event => {
    event.preventDefault();
    setUseParams({ query: event.currentTarget.elements.inputQuery.value });
  };
  const queryValue = params.get('query');

  useEffect(() => {
    if (!queryValue) {
      return;
    }
    const fetchMovies = async () => {
      try {
        const { results } = await requestMovies(queryValue);
        setsearchedMovie(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies(queryValue);
  }, [queryValue]);

  return (
    <div>
      {/* <Link to={backLinkRef.current ?? '/movies'}>Go back</Link> */}
      <form onSubmit={onSubmit}>
        <input
          className="input is-warning"
          placeholder="search for a movie..."
          type="text"
          name="inputQuery"
          defaultValue={queryValue}
        />
        <button className="button is-success" type="submit">
          search
        </button>
        <ul>
          {searchMovie.map(movie => (
            <li>
              <Link to={`/movies/${movie.id}`}>
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};
