import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovies, deleteMovie } from '../redux/slices/moviesSlice';
import { loadGenres } from '../redux/slices/genresSlice';
import Loader from '../common/Loader';

function Home() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(loadMovies());
    dispatch(loadGenres());
  }, [dispatch]);

  const getGenreName = (id) => {
    return genres.list.filter((genre) => genre.genre_id === parseInt(id, 10))[0]
      .name;
  };

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  // Wait until entities have been fetched to render
  if (movies.lastFetch && genres.lastFetch) {
    return (
      <React.Fragment>
        <h1>Movies</h1>
        <Link to='/movies/new' type='button' className='btn btn-primary mb-2'>
          Add Movie
        </Link>
        <div className='table-responsive'>
          <table className='table table-sm table-striped table-hover table-bordered'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.list.map((movie) => (
                <tr key={movie.movie_id}>
                  <td>
                    <Link to={`/movies/${movie.movie_id}`}>{movie.title}</Link>
                  </td>
                  <td>{getGenreName(movie.genre_id)}</td>
                  <td>{movie.number_in_stock}</td>
                  <td>{movie.daily_rental_rate}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-sm btn-danger'
                      onClick={() => handleDelete(movie.movie_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
    // Display errors (if any)
  } else if (movies.requestError) {
    return <p>{movies.requestError}</p>;
  } else if (genres.requestError) {
    return <p>{genres.requestError}</p>;
    // Loading is the default render state
  } else {
    return <Loader />;
  }
}

export default Home;
