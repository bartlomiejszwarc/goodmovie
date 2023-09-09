import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Rating } from '@mui/material';
import TvSeriesSeasonEpisodes from './TvSeriesSeasonEpisodes';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';

function TvSeriesSeasonDetails() {
  const { series_id } = useParams();
  const { season_number } = useParams();

  const [season, setSeason] = useState();
  const [series, setSeries] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getSeasonDetails();
    getSeriesDetails();
  }, []);

  useEffect(() => {
    if (series?.name) {
      const title =
        series?.name +
        (season?.air_date ? ` (${season?.air_date.slice(0, 4)})` : '') +
        ' / ' +
        season?.name;
      document.title = title;
    }
  }, [series, season]);

  async function getSeriesDetails() {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/tv/${series_id}`, options)
        .then((response) => response.json())
        .then((response) => {
          setSeries(response);
          setIsLoading(false);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function getSeasonDetails() {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}`, options)
        .then((response) => response.json())
        .then((response) => {
          setSeason(response);

          setIsLoading(false);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (e) {
      console.log(e);
    }
  }
  if (isLoaded) {
    return (
      <>
        <div className='w-full'>
          <div className='flex flex-row justify-start items-center pt-4 pl-4'>
            <Link to={`/tv/details/${series_id}`}>
              <span className='text-white font-medium text-base md:text-xl'>
                <ChevronLeftIcon /> Go back to TV Series page
              </span>
            </Link>
          </div>
          <div
            className='px-6 md:px-16 min-h-screen flex flex-col lg:flex-col items-center justify-center lg:space-x-8 space-y-10'
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
                <img
                  src={'https://image.tmdb.org/t/p/w400/' + season?.poster_path}
                  alt=''
                  className='w-72 md:w-64 shadow-2xl pt-4'
                />
              </div>
              <div className='w-full lg:w-1/2 flex flex-col bg-transparent text-slate-50 pt-4 md:p-4 space-y-4'>
                <div className='flex flex-col'>
                  <span className='text-slate-300'> {season?.air_date?.slice(0, 4)}</span>{' '}
                  <span className='font-medium text-2xl'>{series?.name}</span>
                  <span className='font-medium text-4xl tracking-wide'>{season?.name}</span>
                  <span className='font-medium text-lg'>
                    {series?.production_companies[0]?.name}
                  </span>
                  <Rating defaultValue={season?.vote_average / 2} precision={0.1} readOnly />
                </div>
                <div className='flex flex-col'>
                  <span className='font-medium'>
                    First episode:{' '}
                    <span className='font-thin'>{season?.episodes[0]?.air_date}</span>
                  </span>
                  <span className='font-medium'>
                    Last episode:{' '}
                    <span className='font-thin'>
                      {season?.episodes[season?.episodes?.length - 1]?.air_date}
                    </span>
                  </span>
                </div>

                <span className='font-thin text-xl text-justify'>{season?.overview}</span>
              </div>
            </div>

            <TvSeriesSeasonEpisodes episodes={season?.episodes} />
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
export default TvSeriesSeasonDetails;
