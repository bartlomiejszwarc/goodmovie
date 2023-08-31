import { Link } from 'react-router-dom';
function MovieCard({ movie }) {
  return (
    <Link to={`/movie/details/${movie?.id}`}>
      <div className=' rounded-lg w-36 flex flex-col items-start pb-4'>
        {movie?.poster_path ? (
          <img
            src={'https://image.tmdb.org/t/p/original/' + movie?.poster_path}
            alt='Movie poster'
            className='rounded-sm w-full'
          />
        ) : (
          <img
            src={'/unknown_movie.png'}
            alt='Movie poster unknown'
            className='rounded-sm w-full'
          />
        )}
        <span className='text-slate-100 text-lg font-thin '>{movie?.title}</span>
        <span className='text-slate-400 font-base font-thin '>{movie?.character}</span>
      </div>
    </Link>
  );
}
export default MovieCard;
