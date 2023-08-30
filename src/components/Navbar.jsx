import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
function Navbar() {
  return (
    <>
      <div className='flex flex-row justify-between items-center px-4 transparent w-full h-12'>
        <div className=''>
          <Link to={`/search`}>
            <img
              src={
                'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
              }
              className='w-16'
              alt='TMDB Logo'
            />
          </Link>
        </div>
        <div>
          <Link to={`/search`} className='flex space-x-2 items-center'>
            <span className='text-xl text-slate-100 invisible md:visible bg-transparent'>
              Search
            </span>
            <SearchIcon className='text-slate-100 visible md:invisible' />
          </Link>
        </div>
      </div>
    </>
  );
}
export default Navbar;
