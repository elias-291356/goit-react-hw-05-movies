import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestCasts } from 'services/api';

const Cast = () => {
  const [fetchResultCast, setFetchResultCast] = useState();
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchCast = async () => {
      try {
        const result = await requestCasts(movieId);

        setFetchResultCast(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className="card">
      <div className="card-image">
        <ul>
          {fetchResultCast?.cast?.length > 0 ? (
            fetchResultCast.cast.map(el => (
              <li key={el.id}>
                <figure className='className="image is-4by3"'>
                  <img
                    src={`http://image.tmdb.org/t/p/w300${el.profile_path}`}
                    alt="Actor"
                  />
                </figure>
                <p className='title is-4"'>{el.original_name}</p>
                <p className="subtitle is-6">Character{el.character}</p>
              </li>
            ))
          ) : (
            <li>
              <p>No information about the film cast</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Cast;
