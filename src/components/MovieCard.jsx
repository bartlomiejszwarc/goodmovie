import { Link } from 'react-router-dom';
function MovieCard({ movie }) {
  return (
    <>
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
              src={
                'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
              }
              alt='Movie  image'
              className='rounded-sm w-full'
            />
          )}
          <span className='text-slate-100 text-lg font-thin '>{movie?.title}</span>
          <span className='text-slate-400 font-base font-thin '>{movie?.character}</span>
        </div>
      </Link>
    </>
  );
}
export default MovieCard;
