import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import MoviesList from './MoviesList';
import PeopleList from './PeopleList';

function Search() {
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('movie');

  useEffect(() => {}, [input]);

  useEffect(() => {}, [category]);

  const handleInputChange = (newInput) => {
    setInput(newInput);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  return (
    <>
      <SearchInput input={handleInputChange} category={handleCategoryChange}></SearchInput>
      {category === 'movie' || category === 'tv' ? (
        <MoviesList input={input} category={category}></MoviesList>
      ) : (
        <PeopleList input={input}></PeopleList>
      )}
    </>
  );
}

export default Search;
