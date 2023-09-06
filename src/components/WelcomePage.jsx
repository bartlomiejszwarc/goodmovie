import CarouselList from './CarouselList';
import { useEffect, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function WelcomePage() {
  const [popularMovies, setPopularMovies] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState();
  const [topRatedMovies, setTopRatedMovies] = useState();
  const [popularTvSeries, setPopularTvSeries] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getTrendingTvSeries();
  }, []);
  async function getTrendingMovies() {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/movie/popular`, options)
        .then((response) => response.json())
        .then((response) => {
          setPopularMovies(response.results);
        })

        .catch((err) => console.error(err));
    } catch (e) {
      console.log(e);
    }
  }
  async function getUpcomingMovies() {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=PL', options)
        .then((response) => response.json())
        .then((response) => {
          setUpcomingMovies(response.results);
        })

        .catch((err) => console.error(err));
    } catch (e) {
      console.log(e);
    }
  }
  async function getTopRatedMovies() {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/movie/top_rated`, options)
        .then((response) => response.json())
        .then((response) => {
          setTopRatedMovies(response.results);
          setIsLoading(false);
          setIsLoaded(true);
        })

        .catch((err) => console.error(err));
    } catch (e) {
      console.log(e);
    }
  }
  async function getTrendingTvSeries() {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/tv/top_rated`, options)
        .then((response) => response.json())
        .then((response) => {
          setPopularTvSeries(response.results);
          setIsLoading(false);
          setIsLoaded(true);
        })

        .catch((err) => console.error(err));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      {!isLoading && isLoaded ? (
        <>
          <CarouselList items={popularMovies} label={'Popular movies'} category={'movie'} />
          <CarouselList items={upcomingMovies} label={'Upcoming movies'} category={'movie'} />
          <CarouselList
            items={topRatedMovies}
            label={'Top rated movies of all time'}
            category={'movie'}
          />
          <CarouselList items={popularTvSeries} label={'Top rated TV Shows'} category={'tv'} />
        </>
      ) : isLoading && !isLoaded ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress size={80} style={{ color: '#0c4a6e' }} />
        </Box>
      ) : null}
    </>
  );
}
export default WelcomePage;
