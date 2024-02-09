import React from 'react';
import './Search.css';

function Search({ type, id, data, onSearch }) {

  const [searchText, setSearchText] = React.useState('');

  function handleSearchText(e) {
    setSearchText(e.target.value);
  }

  React.useEffect(() => {
    if (data.length > 0) {
      const changeData = data.filter((item) => {
       return item.name.toLowerCase().includes(searchText.toLowerCase());
      })
      onSearch(changeData);
    }
  // eslint-disable-next-line
  }, [searchText]);

  return (

    <div className={`search search_type_${type}`}>
      <input
      className='search__input'
      placeholder='Поиск'
      type='text'
      id={`search-filter-${id}`}
      name={`search-filter-${id}`}
      autoComplete='disabled'
      value={searchText}
      onChange={handleSearchText}
      >
      </input>
    </div>

  );
}

export default Search; 