import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
function PersonDetails() {
  const { id } = useParams();
  const [person, setPerson] = useState();
  const [personCredits, setPersonCredits] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [isFound, setIsFound] = useState();

  useEffect(() => {
    getPersonDetails(id);
    getPersonCredits(id);
  }, []);

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
  async function getPersonCredits(id) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };
      fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits`, options)
        .then((response) => response.json())
        .then((response) => {
          setPersonCredits(response.cast.slice(0, 10));
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
          <div className=' px-16 py-6 min-h-screen flex flex-col md:flex-row justify-center md:space-x-8 rounded-lg'>
            <div className='flex flex-col'>
              {person?.profile_path ? (
                <img
                  src={'https://image.tmdb.org/t/p/original/' + person?.profile_path}
                  alt=''
                  className='w-60'
                />
              ) : (
                <img
                  src={
                    'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
                  }
                  alt=''
                  className='w-full'
                />
              )}
              <div className='flex flex-col pb-4'>
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
                  <span className='text-slate-100 text-base'>{person?.birthday}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-slate-100 font-medium text-base'>Place of Birth</span>
                  <span className='text-slate-100 text-base'>{person?.place_of_birth}</span>
                </div>
              </div>
            </div>
            <div className='w-full md:w-3/5 flex flex-col bg-transparent text-slate-50 pt-4 md:pt-0 space-y-4'>
              <div className='flex flex-col'>
                <span className='text-slate-100 text-2xl'>Bio</span>
                <span className='text-slate-100 text-base'>{person?.biography}</span>
              </div>
              <div className='w-full space-y-2'>
                <span className='text-xl text-slate-100 font-medium'>Known for </span>
                <div className='flex overflow-x-auto items-start space-x-8 custom-scrollbar -z-10'>
                  {personCredits?.map((credit, key) => (
                    <div key={key}>
                      <MovieCard movie={credit}></MovieCard>
                    </div>
                  ))}
                </div>
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
