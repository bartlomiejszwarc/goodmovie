import CarouselList from './CarouselList';
import { useEffect, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function WelcomePage() {
  const [popularMovies, setPopularMovies] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState();
  const [topRatedMovies, setTopRatedMovies] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
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
      fetch(`https://api.themoviedb.org/3/movie/upcoming`, options)
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
  return (
    <>
      {!isLoading && isLoaded ? (
        <>
          <CarouselList items={popularMovies} label={'Popular movies'} />
          <CarouselList items={upcomingMovies} label={'Upcoming'} />
          <CarouselList items={topRatedMovies} label={'Top rated movies of all time'} />
        </>
      ) : !isLoaded ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress size={80} style={{ color: '#0c4a6e' }} />
        </Box>
      ) : null}
    </>
  );
}
export default WelcomePage;
