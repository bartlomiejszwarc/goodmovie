import './MovieTile.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
function MovieTile({ movie, category, posterOnly }) {
  //const [type, setType] = useState('movie');

  if (!posterOnly) {
    return (
      <>
        <Link to={`/${category}/details/${movie?.id}`}>
          <div className='flex flex-row w-auto md:w-[40rem] bg-transparent'>
            <div className='w-2/5'>
              {movie.poster_path ? (
                <img
                  src={'https://image.tmdb.org/t/p/w400/' + movie.poster_path}
                  alt=''
                  className='w-full'
                  loading='lazy'
                />
              ) : (
                <img src={'/unknown_movie.png'} alt='' className='w-full' />
              )}
            </div>
            <div className='flex flex-col pl-3 w-3/5'>
              {movie?.title ? (
                <span className='text-xl md:text-3xl font-medium text-slate-300 tracking-tight'>
                  {movie?.title}
                </span>
              ) : movie?.name ? (
                <span className='text-xl md:text-3xl font-medium text-slate-300 tracking-tight'>
                  {movie?.name}
                </span>
              ) : (
                <span></span>
              )}
              {movie.release_date ? (
                <span className='text-xs md:text-sm font-thin text-slate-400'>
                  {movie?.release_date?.slice(0, 4)}
                </span>
              ) : (
                <span className='text-sm md:text-base font-thin text-slate-400'>Unknown</span>
              )}

              <span className='text-sm md:text-base text-slate-300 italic'>
                {movie?.overview?.split(/\s+/).slice(0, 20).join(' ')}
                ...
              </span>

              <span className='text-slate-400 text-base pt-3 cursor-pointer'>See more</span>
            </div>
          </div>
        </Link>
      </>
    );
  }
  if (posterOnly) {
    return (
      <>
        <Link to={`/${category}/details/${movie?.id}`}>
          <div className='flex flex-row bg-transparent px-2'>
            <div className='w-36 md:w-44 lg:w-64'>
              {movie.poster_path ? (
                <img
                  src={'https://image.tmdb.org/t/p/w400/' + movie.poster_path}
                  alt=''
                  className='w-full'
                />
              ) : (
                <img src={'/unknown_movie.png'} alt='' className='w-full' />
              )}
            </div>
          </div>
        </Link>
      </>
    );
  }
}
export default MovieTile;
