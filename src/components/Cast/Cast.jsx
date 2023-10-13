import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { requestCasts } from 'services/api';

export const Cast = () => {
  const [fetchResultCast, setFetchResultCast] = useState();
  const { movieId } = useParams();
  console.log(fetchResultCast);

  useEffect(() => {
    if (!movieId) return;
    const fetchCast = async () => {
      try {
        const result = await requestCasts(movieId);
        console.log(result);
        setFetchResultCast(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCast();
  }, [movieId]);

  //
  //
  //
  //

  return (
    <div>
      <ul>
        {fetchResultCast?.cast?.map(movie => (
          <li key={movie.id}>
            <img
              src={`http://image.tmdb.org/t/p/w300${movie.profile_path}`}
              alt={movie.title}
            />
            <p>{movie.original_name}</p>
            <p>Character{movie.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
