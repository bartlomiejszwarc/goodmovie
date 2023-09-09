import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import HorizontalList from './HorizontalList';
import { MoreVert } from '@mui/icons-material';
function PersonDetails() {
  const { id } = useParams();
  const [person, setPerson] = useState();
  const [personCredits, setPersonCredits] = useState([]);
  const [isLoaded, setIsLoaded] = useState();
  const [isFound, setIsFound] = useState();

  useEffect(() => {
    getPersonDetails(id);
    const fetchData = async () => {
      await getPersonCredits(id, 'movie_credits', 'movie');
      await getPersonCredits(id, 'tv_credits', 'tv');
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (person?.name) {
      const title = person?.name;
      document.title = title;
    }
  }, [person]);

  async function getPersonDetails(id) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/person/${id}`, options)
        .then((response) => response.json())
        .then((response) => {
          setPerson(response);
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
  async function getPersonCredits(id, creditsType, type) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/person/${id}/${creditsType}`, options)
        .then((response) => response.json())
        .then((response) => {
          const newCredits = response.cast.map((credits) => ({
            ...credits,
            type: type,
          }));
          setPersonCredits((credits) => {
            const mergedCredits = [...credits, ...newCredits];
            const filteredCredits = mergedCredits.filter((credit) => credit.vote_count >= 100);
            const sortedCredits = filteredCredits.sort((a, b) => b.vote_average - a.vote_average);
            return sortedCredits;
          });

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

  if (isFound && isLoaded) {
    return (
      <>
        <div className='w-full'>
          <div className=' px-6 md:px-16 min-h-screen flex flex-col md:flex-row justify-center md:space-x-8 rounded-lg'>
            <div className='flex flex-col'>
              {person?.profile_path ? (
                <img
                  src={'https://image.tmdb.org/t/p/original/' + person?.profile_path}
                  alt=''
                  className='w-60'
                />
              ) : (
                <img src={'/unknown_person.png'} alt='' className='w-60' />
              )}
              <div className='flex flex-col pb-4 w-60'>
                <span className='font-medium text-slate-100 text-3xl'>{person?.name}</span>
              </div>
              <div className='flex flex-col space-y-3'>
                <span className='text-slate-100 text-xl'>About</span>
                <div className='flex flex-col'>
                  <span className='text-slate-100 font-medium text-base'>Known for</span>
                  <span className='text-slate-100 text-base'>{person?.known_for_department}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-slate-100 font-medium text-base'>Gender</span>
                  {person?.gender === 2 ? (
                    <span className='text-slate-100 text-base'>Male </span>
                  ) : person?.gender === 1 ? (
                    <span className='text-slate-100 text-base'>Female </span>
                  ) : person?.gender === 0 ? (
                    <span className='text-slate-100 text-base'>Not set / not specified</span>
                  ) : person?.gender === 3 ? (
                    <span className='text-slate-100 text-base'>Non-binary</span>
                  ) : null}
                </div>
                <div className='flex flex-col'>
                  <span className='text-slate-100 font-medium text-base'>Birthday</span>
                  {person?.birthday ? (
                    <span className='text-slate-100 text-base'>{person?.birthday}</span>
                  ) : (
                    <span className='text-slate-100 text-base'>Unknown</span>
                  )}
                </div>
                <div className='flex flex-col'>
                  <span className='text-slate-100 font-medium text-base'>Place of Birth</span>
                  {person?.place_of_birth ? (
                    <span className='text-slate-100 text-base'>{person?.place_of_birth}</span>
                  ) : (
                    <span className='text-slate-100 text-base'>Unknown</span>
                  )}
                </div>
                {person?.deathday ? (
                  <div className='flex flex-col'>
                    <span className='text-slate-100 font-medium text-base'>Death</span>
                    {person?.deathday ? (
                      <span className='text-slate-100 text-base'>{person?.deathday}</span>
                    ) : (
                      <span className='text-slate-100 text-base'>Unknown</span>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
            <div className='w-full md:w-3/5 flex flex-col bg-transparent text-slate-50 pt-4 md:pt-0 space-y-4'>
              {person?.biography ? (
                <div className='flex flex-col'>
                  <span className='text-2xl md:text-3xl text-slate-100 font-medium'>Biography</span>
                  <span className='text-slate-100 text-base'>{person?.biography}</span>
                </div>
              ) : null}

              <div className='w-full space-y-2'>
                <span className='text-2xl md:text-3xl text-slate-100 font-medium'>Known for </span>

                <HorizontalList
                  items={personCredits.slice(0, 15)}
                  width={'full'}
                  renderItem={(movie) => <MovieCard movie={movie} type={movie?.type} />}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (!isFound && isLoaded) {
    return (
      <>
        <div>
          <span className='text-3xl text-slate-100'>Not Found</span>
        </div>
      </>
    );
  }
}
export default PersonDetails;
