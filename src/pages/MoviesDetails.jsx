import Cast from 'components/Cast/Cast';
import Loader from 'components/Loader/Loader';
import Reviews from 'components/Reviews/Reviews';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { requestDetails } from 'services/api';
import styles from './stylePages.module.css';

const MoviesDetails = () => {
  // const [error, setError] = useState(null);
  const [ResultMovieDetailse, setResultMovieDetailse] = useState();
  const { movieId } = useParams();

  const location = useLocation();
  const backMoviesPageRef = useRef(location.state?.from);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetails = async () => {
      try {
        const data = await requestDetails(movieId);

        setResultMovieDetailse(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      <div>
        <Link className="button is-dark" to={backMoviesPageRef.current ?? '/'}>
          Go back
        </Link>
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
                  <p key={genre.id}>{genre.title || genre.name}</p>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div>
        <h3 className="title is-4"> Additional information</h3>
        <Link to="cast" className="title is-6">
          Cast
        </Link>
        <Link to="reviews" className="title is-6 is-light">
          /Reviews
        </Link>
      </div>
      <div>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default MoviesDetails;
