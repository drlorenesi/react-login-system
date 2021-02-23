import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovies, deleteMovie } from '../redux/slices/moviesSlice';
import { loadGenres } from '../redux/slices/genresSlice';
import Loader from '../common/Loader';
import { formatDec } from '../utils/formatNumber';

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

  if (movies.lastFetch && genres.lastFetch) {
    return (
      <React.Fragment>
        <h1>Movies</h1>
        <Link to='/movies/new' type='button' className='btn btn-primary mb-2'>
          Add Movie
        </Link>
        <div className='table-responsive'>
          <table className='table table-bordered table-striped table-sm'>
            <thead>
              <tr>
                <th scope='col'>Title</th>
                <th scope='col'>Genre</th>
                <th scope='col'>Number in Stock</th>
                <th scope='col'>Daily Rental Rate</th>
                <th scope='col'>Delete</th>
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
                  <td>{formatDec(movie.daily_rental_rate)}</td>
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
  } else if (movies.loadingError) {
    return <p>{movies.loadingError}</p>;
  } else {
    return <Loader />;
  }
}

export default Home;
