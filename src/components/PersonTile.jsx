import { Link } from 'react-router-dom';
function PersonTile({ person }) {
  return (
    <>
      <Link to={`/person/details/${person?.id}`}>
        <div className='flex flex-row w-auto md:w-[40rem] '>
          <div className='w-2/5'>
            {person?.profile_path ? (
              <img
                src={'https://image.tmdb.org/t/p/original/' + person?.profile_path}
                alt=''
                className='w-full'
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
