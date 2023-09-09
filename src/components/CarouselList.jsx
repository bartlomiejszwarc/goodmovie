import { useEffect, useRef, useState } from 'react';
import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MovieTile from './MovieTile';
import './CarouselList.css';

function CarouselList({ items, label, category }) {
  const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } =
    useSmoothHorizontalScroll();

  const [scrollSpeed, setScrollSpeed] = useState(100);
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    if (width < 500) {
      setScrollSpeed(200);
    }
    if (width < 1000 && width >= 500) {
      setScrollSpeed(350);
    }
    if (width < 1500 && width >= 1000) {
      setScrollSpeed(650);
    }
    if (width >= 1500) {
      setScrollSpeed(1000);
    }
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [scrollSpeed, width]);
  if (!items) {
    return null;
  }

  return (
    <>
      <span className='text-2xl md:text-4xl text-slate-100 pl-8 tracking-wide font-bebas pt-8'>
        {label}
      </span>
      <div className='relative w-full'>
        <button
          onClick={() => scrollTo(-scrollSpeed)}
          className={`bg-transparent flex items-center justify-start absolute w-16 top-0 left-0 h-full cursor-pointer background-gradient-shade-left ${
            isAtStart ? 'text-transparent' : 'text-slate-400'
          }`}
        >
          <ArrowBackIosNewIcon />
        </button>

        <div
          className='flex flex-row space-x-3 custom-scrollbar'
          ref={scrollContainerRef}
          onScroll={handleScroll}
          style={{ overflowX: 'scroll' }}
        >
          {items?.map((movie, key) => (
            <div key={key} className=''>
              <MovieTile movie={movie} category={category} posterOnly={true}></MovieTile>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollTo(scrollSpeed)}
          className={`bg-transparent flex items-center justify-end absolute w-16 top-0 right-0 h-full cursor-pointer background-gradient-shade-right ${
            isAtEnd ? 'text-transparent' : 'text-slate-400'
          } `}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </>
  );
}
export default CarouselList;
