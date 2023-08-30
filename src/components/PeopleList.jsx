import PersonTile from './PersonTile';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SentimentSatisfiedRounded } from '@mui/icons-material';

function PeopleList({ input }) {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPageNumber(1);

    if (input !== undefined && input !== '') {
      setIsLoading(true);
      getPersonByName(input, pageNumber);
      console.log(isLoading);
      if (people?.length === 0) {
        setMessage('Nothing has been found');
      }
    }
  }, [input]);

  useEffect(() => {
    if (pageNumber > 1) {
      getPersonByName(input, pageNumber);
    }
  }, [pageNumber]);

  async function getPersonByName(name, page) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(
        `https://api.themoviedb.org/3/search/person?query=${name}&sort_by=popularity.desc&page=${page}`,
        options,
      )
        .then((response) => response.json())
        .then((response) => {
          setPeople(response.results);
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
      {people?.length > 0 && !isLoading ? (
        <>
          <div className='flex flex-col w-full items-center px-3 space-y-12'>
            {people.map((person, key) => (
              <div key={key}>
                <PersonTile person={person}></PersonTile>
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
      ) : people?.length === 0 && !isLoading ? (
        <span className='text-3xl font-thin text-slate-300'>{message}</span>
      ) : isLoading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress size={80} style={{ color: '#0c4a6e' }} />
        </Box>
      ) : null}
    </>
  );
}
export default PeopleList;
