import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovies, deleteMovie } from '../redux/slices/moviesSlice';

function Home() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(loadMovies());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  if (movies.loading) {
    return (
      <div className='d-flex justify-content-center'>
        <div className='spinner-border text-secondary' role='status'></div>
      </div>
    );
  } else if (movies.loadingError) {
    return <p>{movies.loadingError}</p>;
  } else {
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
                  <td>{movie.genre}</td>
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
  }
}

export default Home;
