import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../redux/slices/moviesByGenreSlice';
import Loader from '../common/Loader';
import { formatDec } from '../utils/formatNumber';

function Home() {
  const dispatch = useDispatch();
  const moviesByGenre = useSelector((state) => state.moviesByGenre);

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  const genres = moviesByGenre.list.map((item) => item.genre);
  const series = moviesByGenre.list.map((item) => parseInt(item.total, 10));

  const options = {
    labels: genres,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            type: 'pie',
            width: 380,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  if (moviesByGenre.lastFetch) {
    return (
      <React.Fragment>
        <h1>Home</h1>
        <div id='chart'>
          <Chart options={options} series={series} type='pie' width={380} />
        </div>
      </React.Fragment>
    );
  } else if (moviesByGenre.loadingError) {
    return <p>{moviesByGenre.loadingError}</p>;
  } else {
    return <Loader />;
  }
}

export default Home;
