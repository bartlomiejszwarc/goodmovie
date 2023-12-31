import './App.css';
import MovieDetails from './components/MovieDetails';
import TvSeriesDetails from './components/TvSeriesDetails';
import PersonDetails from './components/PersonDetails';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Navbar from './components/Navbar';
import WelcomePage from './components/WelcomePage';
import TvSeriesSeasonDetails from './components/TvSeriesSeasonDetails';

function App() {
  return (
    <div className='flex flex-col items-center page-container '>
      <div className='page-background'></div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<WelcomePage />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/movie/details/:id' element={<MovieDetails />}></Route>
        <Route path='/tv/details/:id' element={<TvSeriesDetails />}></Route>
        <Route path='/person/details/:id' element={<PersonDetails />}></Route>
        <Route
          path='/tv/:series_id/season/:season_number'
          element={<TvSeriesSeasonDetails />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
