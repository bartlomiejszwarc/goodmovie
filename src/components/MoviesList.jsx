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
  const [sortValue, setSortValue] = useState('popularity');

  useEffect(() => {
    setMovies([]);
    setPageNumber(1);
    if (input !== undefined && input !== '') {
      if (category === 'movie') {
        setIsLoading(true);
        getMoviesByKeyword(input, 1, sortValue);
      }
      if (category === 'tv') {
        setIsLoading(true);
        getSeriesByKeyword(input, 1, sortValue);
      }
      if (movies.length === 0) {
        setMessage('Nothing has been found');
      }
    }
  }, [input, category]);

  useEffect(() => {
    sortItemsByValue(sortValue);
  }, [sortValue]);

  useEffect(() => {
    setSortValue('popularity');
  }, [category]);

  useEffect(() => {
    if (pageNumber > 1) {
      if (category === 'movie') {
        getMoviesByKeyword(input, pageNumber);
      } else if (category === 'tv') {
        getSeriesByKeyword(input, pageNumber);
      }
    }
  }, [pageNumber]);

  function sortItemsByValue(sortByValue) {
    let sortedResults = [...movies];
    if (sortByValue === 'release_date') {
      sortedResults = sortedResults.sort((a, b) => {
        const dateA = a[sortByValue] ? new Date(a[sortByValue]) : null;
        const dateB = b[sortByValue] ? new Date(b[sortByValue]) : null;
        return dateB - dateA;
      });
    } else {
      sortedResults = sortedResults.sort((a, b) => b[sortByValue] - a[sortByValue]);
    }
    setMovies(sortedResults);
  }

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
          let sortedResults = [...response.results];
          sortedResults = sortedResults.sort((a, b) => b[sortValue] - a[sortValue]);

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
          let sortedResults = [...response.results];
          sortedResults = sortedResults.map((result) => {
            result.release_date = result.first_air_date;
            return result;
          });
          sortedResults = sortedResults.sort((a, b) => b[sortValue] - a[sortValue]);

          setMovies((series) => [...series, ...sortedResults]);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    } catch (e) {
      console.log(e);
    }
  }

  function loadMoreData() {
    //not sorted
    setPageNumber((pageNumber) => pageNumber + 1);
  }

  return (
    <>
      {movies?.length > 0 && !isLoading ? (
        <>
          <div className='w-full md:w-1/2 flex flex-row space-x-3 px-2 md:px-0 md:space-x-4 items-center justify-center md:justify-end text-slate-200 font-thin py-4'>
            <span className=''>Sort by </span>

            <span
              onClick={() => setSortValue('popularity')}
              className={`cursor-pointer ${
                sortValue === 'popularity' ? 'font-bold border-b-[1px]' : 'font-thin'
              }`}
            >
              Popularity{' '}
            </span>
            <span
              onClick={() => setSortValue('release_date')}
              className={`cursor-pointer ${
                sortValue === 'release_date' ? 'font-bold border-b-[1px]' : 'font-thin'
              }`}
            >
              Release date{' '}
            </span>
            <span
              onClick={() => setSortValue('vote_average')}
              className={`cursor-pointer ${
                sortValue === 'vote_average' ? 'font-bold border-b-[1px]' : 'font-thin'
              }`}
            >
              Rating{' '}
            </span>
          </div>
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
