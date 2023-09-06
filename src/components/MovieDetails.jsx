import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonCard from './PersonCard';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import HorizontalList from './HorizontalList';

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [isFound, setIsFound] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getMovieDetails(id);
    getMovieCredits(id);
  }, []);

  async function getMovieDetails(id) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
        .then((response) => response.json())
        .then((response) => {
          setMovie(response);
          setIsLoaded(true);
          if (response.success === false) {
            setIsFound(false);
          } else {
            setIsFound(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function getMovieCredits(id) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options)
        .then((response) => response.json())
        .then((response) => {
          setCast(response?.cast?.slice(0, 10));
        })
        .catch((err) => console.error(err));
    } catch (e) {
      console.log(e);
    }
  }

  if (isFound && isLoaded) {
    return (
      <>
        <div className='w-full'>
          <div
            className='px-16 py-6 min-h-screen flex flex-col lg:flex-col items-center justify-center lg:space-x-8 rounded-lg space-y-10'
            style={{
              backgroundImage: `linear-gradient(223deg, rgba(10, 0, 0, 0.90), rgba(0, 0, 10, 0.90)), url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              backgroundColor: 'transparent',
              width: '100%',
            }}
          >
            <div className=' flex flex-col md:flex-row justify-center'>
              <div className=''>
                <img
                  src={'https://image.tmdb.org/t/p/w400/' + movie?.poster_path}
                  alt=''
                  className='w-72 md:w-64 shadow-2xl pt-4'
                />
              </div>
              <div className='w-full lg:w-1/2 flex flex-col bg-transparent text-slate-50 pt-4 md:p-4 space-y-4'>
                <div className='flex flex-col'>
                  <span className='text-slate-300'> {movie?.release_date?.slice(0, 4)}</span>{' '}
                  <span className='font-medium text-3xl'>{movie?.title}</span>
                  <span className='font-medium text-lg'>
                    {movie?.production_companies[0]?.name}
                  </span>
                  <Rating defaultValue={movie?.vote_average / 2} precision={0.1} readOnly />
                </div>
                <div>
                  <span> {movie?.release_date}</span>{' '}
                  <span>
                    • {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m
                  </span>
                </div>
                <div className='flex md:flex-row space-x-3 '>
                  {movie?.genres.slice(0, 3)?.map((genre, key) => (
                    <div
                      className=' text-slate-200 text-center rounded-2xl bg-slate-700 bg-opacity-30 px-3 py-1 max-h-8 max-w-max'
                      key={key}
                    >
                      {genre?.name?.split(' ')[0]}
                    </div>
                  ))}
                </div>
                <span className='font-thin text-xl text-justify'>{movie?.overview}</span>
              </div>
            </div>
            <span className='text-xl text-slate-100 font-medium'>Top paid cast</span>
            <HorizontalList
              width={'3/5'}
              items={cast}
              renderItem={(person) => <PersonCard person={person} />}
            />
          </div>
        </div>
      </>
    );
  } else if (!isFound && isLoaded) {
    return (
      <>
        <div className='flex flex-col space-y-3 text-2xl items-center justify-center h-screen text-slate-100'>
          <span className='font-bold'>Oops...</span>
          <span className='font-thin'>Something went wrong...</span>
          <Link to={`/search`}>
            {' '}
            <span className='text-base border-slate-500 border-b-[1px] px-3 py-1'>
              Try searching something else
            </span>
          </Link>
        </div>
      </>
    );
  }
}

export default MovieDetails;
