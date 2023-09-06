import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonCard from './PersonCard';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import HorizontalList from './HorizontalList';
import TvSeriesSeasons from './TvSeriesSeasons';
function TvSeriesDetails() {
  const [series, setSeries] = useState(null);
  const [seriesProviders, setSeriesProviders] = useState(null);
  const [cast, setCast] = useState([]);
  const [isFound, setIsFound] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getSeriesDetails(id);
    getSeriesCredits(id);
    getSeriesProviders(id, 'PL');
  }, [isFound, isLoaded]);

  async function getSeriesProviders(id, region) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/tv/${id}/watch/providers`, options)
        .then((response) => response.json())
        .then((response) => {
          setSeriesProviders(response?.results[`${region}`]?.flatrate);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function getSeriesDetails(id) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/tv/${id}`, options)
        .then((response) => response.json())
        .then((response) => {
          setSeries(response);
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

  async function getSeriesCredits(id) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/tv/${id}/credits`, options)
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
              backgroundImage: `linear-gradient(223deg, rgba(10, 0, 0, 0.90), rgba(0, 0, 10, 0.90)), url(https://image.tmdb.org/t/p/original/${series?.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              backgroundColor: 'transparent',
              width: '100%',
            }}
          >
            <div className=' flex flex-col md:flex-row justify-center'>
              <div className=''>
                {series?.seasons[series?.seasons.length - 1]?.poster_path ? (
                  <img
                    src={
                      'https://image.tmdb.org/t/p/original/' +
                      series?.seasons[series?.seasons.length - 1]?.poster_path
                    }
                    alt=''
                    className='w-72 md:w-64 shadow-2xl pt-4'
                  />
                ) : (
                  <img
                    src={'https://image.tmdb.org/t/p/original/' + series?.poster_path}
                    alt=''
                    className='w-72 md:w-64 shadow-2xl pt-4'
                  />
                )}
              </div>
              <div className='w-full lg:w-1/2 flex flex-col bg-transparent text-slate-50 pt-4 md:p-4 space-y-4'>
                <div className='flex flex-col'>
                  <span className='text-slate-300'> {series?.first_air_date?.slice(0, 4)}</span>{' '}
                  <span className='font-medium text-3xl'>{series?.name}</span>
                  <span className='font-medium text-lg'>
                    {series?.production_companies[0]?.name}
                  </span>
                  <Rating defaultValue={series?.vote_average / 2} precision={0.1} readOnly />
                </div>
                <div className='flex flex-col'>
                  <span className='font-medium'>
                    First episode: <span className='font-thin'>{series?.first_air_date}</span>
                  </span>
                  <span className='font-medium'>
                    Last episode: <span className='font-thin'>{series?.last_air_date}</span>
                  </span>
                </div>
                <div className='flex flex-row space-x-2'>
                  <span>{series?.number_of_episodes} episodes &bull;</span>
                  <span>{series?.number_of_seasons} seasons</span>
                </div>
                <div className='flex flex-col space-y-1'>
                  <span className='text-lg font-medium'>Where to watch</span>
                  <div className='flex flex-row space-x-4'>
                    {seriesProviders?.map((provider, key) => (
                      <img
                        src={'https://image.tmdb.org/t/p/w92/' + provider?.logo_path}
                        className='w-8 md:w-10 rounded-md'
                        key={key}
                      />
                    ))}
                  </div>
                </div>
                <div className='flex md:flex-row space-x-3 '>
                  {series?.genres?.map((genre, key) => (
                    <div
                      className=' text-slate-200 text-center rounded-2xl bg-slate-700 bg-opacity-30 px-3 py-1 max-h-8 max-w-max'
                      key={key}
                    >
                      {genre?.name?.split(' ')[0]}
                    </div>
                  ))}
                </div>
                <span className='font-thin text-xl text-justify'>{series?.overview}</span>
              </div>
            </div>
            <span className='text-xl text-slate-100 font-medium'>Top paid cast</span>

            <HorizontalList
              width={'3/5'}
              items={cast}
              renderItem={(person) => <PersonCard person={person} />}
            />
            <TvSeriesSeasons
              series={series}
              seasons={series?.seasons?.slice(1, series?.seasons?.length)}
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
          <span className='font-thin'>Something went wrong</span>
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

export default TvSeriesDetails;
