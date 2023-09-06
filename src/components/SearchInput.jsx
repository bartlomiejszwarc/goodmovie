import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function SearchInput({ input, category }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {}, [searchInput]);
  useEffect(() => {}, [searchKeyword]);
  useEffect(() => {}, [selectedCategory]);

  const handleInputSubmit = () => {
    setSearchKeyword(searchInput);
    input(searchInput);
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setSearchKeyword(searchInput);
      input(searchInput);
    }
  };
  const handleSelectedCategory = (newCategory) => {
    setSelectedCategory(newCategory);
    category(newCategory);
  };
  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='flex items-center justify-between border-b-2 border-slate-500 w-10/12 md:w-1/2'>
          <input
            className='w-full h-12 bg-transparent opacity-70 px-3 py-1 placeholder-slate-50 font-thin text-2xl outline-none text-slate-50'
            type='text'
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder='Search movie or TV Series by title'
          />
          <button
            onClick={() => {
              handleInputSubmit();
            }}
            className='text-slate-300'
          >
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div>
          <FormControl
            onChange={(e) => {
              handleSelectedCategory(e.target.value);
            }}
          >
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              defaultValue='movie'
              name='row-radio-buttons-group'
            >
              <FormControlLabel
                className='text-slate-200 px-2'
                value='movie'
                control={
                  <Radio
                    sx={{
                      color: '#e2e8f0',
                      '&.Mui-checked': {
                        color: '#e2e8f0',
                      },
                    }}
                  />
                }
                label='Movie'
              />
              <FormControlLabel
                className='text-slate-200 px-2'
                value='tv'
                control={
                  <Radio
                    sx={{
                      color: '#e2e8f0',
                      '&.Mui-checked': {
                        color: '#e2e8f0',
                      },
                    }}
                  />
                }
                label='TV Series'
              />
              <FormControlLabel
                className='text-slate-200 px-2'
                value='person'
                control={
                  <Radio
                    sx={{
                      color: '#e2e8f0',
                      '&.Mui-checked': {
                        color: '#e2e8f0',
                      },
                    }}
                  />
                }
                label='Person'
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </>
  );
}
export default SearchInput;
