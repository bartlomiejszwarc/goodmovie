import { Link } from 'react-router-dom';
function PersonTile({ person }) {
  return (
    <>
      <Link to={`/person/details/${person?.id}`}>
        <div className='flex flex-row md:w-[40rem]'>
          <div className='w-2/5'>
            {person?.profile_path ? (
              <img
                src={'https://image.tmdb.org/t/p/w300/' + person?.profile_path}
                alt=''
                className='w-96'
              />
            ) : (
              <img src={'/unknown_person.png'} alt='' className='w-96' />
            )}
          </div>
          <div className='flex flex-col pl-3 w-3/5'>
            <span className='text-3xl font-medium text-slate-300'>{person?.name}</span>
            <span className='text-lg font-thin text-slate-500'>{person?.known_for_department}</span>
            <span className='text-slate-400 text-base pt-3 cursor-pointer'>See more</span>
          </div>
        </div>
      </Link>
    </>
  );
}
export default PersonTile;
