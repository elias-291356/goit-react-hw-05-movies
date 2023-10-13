import { Cast } from 'components/Cast/Cast';
import { Reviews } from 'components/Reviews/Reviews';
import { useEffect, useRef, useState } from 'react';
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { requestDetails } from 'services/api';
import styles from './stylePages.module.css';

// import { useSearchParams } from 'react-router-dom';

const MoviesDetails = () => {
  // const location = useLocation();
  const [ResultMovieDetailse, setResultMovieDetailse] = useState();
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetails = async () => {
      try {
        const data = await requestDetails(movieId);
        console.log(data);
        setResultMovieDetailse(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      <div>
        <Link to={backLinkRef.current ?? '/'}>Go back</Link>
        {ResultMovieDetailse && (
          <div
            key={ResultMovieDetailse.id}
            className={styles.movieDetailseWrap}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${ResultMovieDetailse.poster_path}`}
              alt={ResultMovieDetailse.title}
              className={styles.movieDetailseImg}
            />
            <div className={styles.movieDetailseDescr}>
              <h1>{ResultMovieDetailse.original_title}</h1>
              <p>User Score {ResultMovieDetailse.popularity}</p>
              <h2>Overview</h2>
              <p>{ResultMovieDetailse.overview}</p>
              <h3>Genres</h3>
              <ul>
                {ResultMovieDetailse.genres.map(genre => (
                  <p>{genre.title || genre.name}</p>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div>
        <h3> Additional information</h3>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>
      <div>
        <Routes>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Routes>
      </div>
    </div>
  );
};

export default MoviesDetails;
