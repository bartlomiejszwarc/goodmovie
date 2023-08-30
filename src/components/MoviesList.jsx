import MovieTile from './MovieTile';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function MoviesList({ input, category }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMovies([]);
    setPageNumber(1);
    if (input !== undefined && input !== '') {
      if (category === 'movie') {
        setIsLoading(true);
        getMoviesByKeyword(input, 1);
      }
      if (category === 'series') {
        setIsLoading(true);
        getSeriesByKeyword(input, 1);
      }
      if (movies.length === 0) {
        setMessage('Nothing has been found');
      }
    }
  }, [input, category]);

  useEffect(() => {
    if (pageNumber > 1) {
      if (category === 'movie') {
        getMoviesByKeyword(input, pageNumber);
      } else if (category === 'series') {
        getSeriesByKeyword(input, pageNumber);
      }
    }
  }, [pageNumber]);

  async function getMoviesByKeyword(keyword, page) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${page}`,
        options,
      )
        .then((response) => response.json())
        .then((response) => {
          const sortedResults = response.results.sort((a, b) => b.popularity - a.popularity);
          setMovies((movies) => [...movies, ...sortedResults]);
          setIsLoading(false);
        })

        .catch((err) => console.error(err));
    } catch (e) {
      console.log(e);
    }
  }

  async function getSeriesByKeyword(keyword, page) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(
        `https://api.themoviedb.org/3/search/tv?query=${keyword}&sort_by=popularity.desc&include_adult=false&sort=popularity.desc&language=en-US&page=${page}`,
        options,
      )
        .then((response) => response.json())
        .then((response) => {
          const sortedResults = response.results.sort((a, b) => b.popularity - a.popularity);
          setMovies((series) => [...series, ...sortedResults]);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    } catch (e) {
      console.log(e);
    }
  }

  function loadMoreData() {
    setPageNumber((pageNumber) => pageNumber + 1);
  }

  return (
    <>
      {movies?.length > 0 && !isLoading ? (
        <>
          <div className='flex flex-col w-full items-center px-3 space-y-12'>
            {movies.map((movie, key) => (
              <div key={key}>
                <MovieTile movie={movie} category={category}></MovieTile>
              </div>
            ))}
          </div>
          <button
            className='bg-slate-800 bg-opacity-30 text-slate-50 rounded-full px-2 py-2'
            onClick={loadMoreData}
          >
            <ExpandMoreIcon />
          </button>
        </>
      ) : movies?.length === 0 && !isLoading ? (
        <span className='text-3xl font-thin text-slate-300'>{message}</span>
      ) : isLoading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress size={80} style={{ color: '#0c4a6e' }} />
        </Box>
      ) : null}
    </>
  );
}
export default MoviesList;
