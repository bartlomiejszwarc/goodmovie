import { Link } from 'react-router-dom';
function PersonCard({ person }) {
  return (
    <>
      <Link to={`/person/details/${person?.id}`}>
        <div className=' rounded-lg w-36 flex flex-col items-start pb-4'>
          {person?.profile_path ? (
            <img
              src={'https://image.tmdb.org/t/p/original/' + person?.profile_path}
              alt='Person photo'
              className='rounded-sm w-full'
            />
          ) : (
            <img
              src={'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'}
              alt='Person photo'
              className='rounded-sm w-full'
            />
          )}
          <span className='text-slate-100 text-lg font-thin '>{person?.name}</span>
          <span className='text-slate-400 font-base font-thin '>{person?.character}</span>
        </div>
      </Link>
    </>
  );
}
export default PersonCard;
