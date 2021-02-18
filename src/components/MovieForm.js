import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovies } from '../redux/slices/moviesSlice';
import { loadGenres } from '../redux/slices/genresSlice';
import Loader from '../common/Loader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function MovieForm(props) {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const movies = useSelector((state) => state.movies);

  const movieId = props.match.params.id;

  useEffect(() => {
    dispatch(loadGenres());
    if (movieId === 'new') {
      return;
    }
    dispatch(loadMovies());
  }, [dispatch, movieId]);

  const schema = yup.object().shape({
    movieId: yup.string(),
    title: yup.string().min(2).required('Required!'),
    genreId: yup.string().required('Required'),
    // numberInStock: yup.number().min(0).max(100).required('Required!'),
    // dailyRentalRate: yup.number().min(0).max(10).required('Required!'),
  });

  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
    // dispatch(addMovie(data));
    // console.log(`Movie ${id} saved.`);
    props.history.push('/movies');
  };

  // Movie Form
  function renderForm(movie) {
    return (
      <React.Fragment>
        <div className='col-6 my-3'>
          <form
            className='needs-validation'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <fieldset className='border p-3'>
              <legend>Movie Details</legend>
              {/* Title */}
              <div className='mb-3'>
                <label className='form-label'>Title:</label>
                <input
                  name='title'
                  type='text'
                  className={
                    errors.title ? 'form-control is-invalid' : 'form-control'
                  }
                  defaultValue={movie ? movie.title : null}
                  ref={register}
                />
                {errors.title && (
                  <div className='invalid-feedback'>{errors.title.message}</div>
                )}
              </div>
              {/* Genre */}
              <div className='mb-3'>
                <label className='form-label'>Genre:</label>
                <select
                  name='genreId'
                  className='form-select'
                  defaultValue={movie ? movie.genre_id : null}
                  ref={register}
                >
                  <option value=''>- Select a genre -</option>
                  {genres.list.map((genre) => (
                    <option key={genre.genre_id} value={genre.genre_id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Submit */}
              <button
                type='submit'
                disabled={!formState.isValid}
                className='btn btn-primary'
              >
                Submit
              </button>
            </fieldset>
          </form>
        </div>
        <hr />
        <button
          className='btn btn-outline-primary mr-2'
          // Not working after clicking "back" from new product
          onClick={props.history.goBack}
        >
          &laquo; Back
        </button>
      </React.Fragment>
    );
  }

  // Main Render Function
  if (movieId === 'new') {
    return renderForm(null);
  }
  if (movies.lastFetch && genres.lastFetch) {
    const index = movies.list.findIndex(
      (movie) => movie.movie_id === parseInt(movieId, 10)
    );
    if (index === -1) {
      return <p>No movie found</p>;
    } else {
      // Possible because it is not a controlled component
      let movie = movies.list[index];
      return renderForm(movie);
    }
  } else if (movies.loadingError) {
    return <p>{movies.loadingError}</p>;
  } else {
    return <Loader />;
  }
}

export default MovieForm;
