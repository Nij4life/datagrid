import React, { useRef, useEffect } from 'react';

const Search = ({ column }) => {
  const input = useRef(null);
  const searchBlock = useRef(null);

  const searchStart = () => {
    console.log(input.current.value);
    // поиск по колонке! <<<
    input.current.value = '';
  }

  const onKeyHandler = (e) => {
    if (e.target !== input.current) return;
    if (e.key === 'Enter') {
      input.current.classList.remove('dp-block');
      if (input.current.value !== '') searchStart();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyHandler);
    return () => window.removeEventListener('keydown', onKeyHandler);
  })

  if (column === 1 || column === 2 || column === 4) {
    const onClickHandler = () => {
      if (!input.current.classList.contains('dp-block')) {
        input.current.classList.add('dp-block');
        input.current.focus();
      } else {
        input.current.classList.remove('dp-block');
        if (input.current.value !== '') searchStart();
      }
    };

    return (
      <div className="search-block" ref={searchBlock}>
        <button className="searchBtn" type="button" onClick={onClickHandler} >🔍</button>
        <input
          className="searchInput"
          type="text"
          placeholder="Поиск..."
          ref={input}
        />
      </div>
    );
  }

  return false;
}

export default Search;
