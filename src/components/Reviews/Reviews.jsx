import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestReviews } from 'services/api';

const Reviews = () => {
  const [fetchResultReviews, setFetchResultReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const results = await requestReviews(movieId);
        setFetchResultReviews(results);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className="content is-normal">
      <ul>
        {fetchResultReviews?.results?.length > 0 ? (
          fetchResultReviews.results.map(el => (
            <li key={el.id}>
              <p>Author: {el.author}</p>
              {el.content ? <p>{el.content}</p> : <p>No reviews available</p>}
            </li>
          ))
        ) : (
          <li>
            <p>No reviews available</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Reviews;
