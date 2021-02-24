import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovies, deleteMovie } from '../redux/slices/moviesSlice';
import { loadGenres } from '../redux/slices/genresSlice';
import DataTable from '../common/DataTable';
import Loader from '../common/Loader';

function Home() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(loadMovies());
    dispatch(loadGenres());
  }, [dispatch]);

  const columns = [
    {
      accessor: 'title',
      label: 'Title',
    },
    {
      accessor: 'genre_id',
      label: 'Genre',
    },
    {
      accessor: 'number_in_stock',
      label: 'Stock',
      dataAlign: 'right',
      type: 'int',
    },
    {
      accessor: 'daily_rental_rate',
      label: 'Rate',
      dataAlign: 'right',
      type: 'decimal',
    },
    {
      accessor: 'delete',
      label: 'Actions',
      dataAlign: 'center',
      cell: (user) => (
        <button
          className='btn btn-sm btn-danger'
          onClick={() => handleDelete(user)}
        >
          Delete
        </button>
      ),
    },
  ];

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
        <DataTable
          tableColumns={columns}
          tableData={movies.list}
          id={'movie_id'}
        />
      </React.Fragment>
    );
  } else if (movies.loadingError) {
    return <p>{movies.loadingError}</p>;
  } else {
    return <Loader />;
  }
}

export default Home;
