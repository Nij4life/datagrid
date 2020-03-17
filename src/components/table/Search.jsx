import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../redux/reducer';

const Search = ({ column }) => {
  const dispatch = useDispatch();
  const input = useRef(null);
  const searchBlock = useRef(null);

  const searchStart = (text) => {
    dispatch(search(column, text))
    input.current.value = '';
  }

  const onKeyHandler = (e) => {
    if (e.target !== input.current) return;
    if (e.key === 'Enter') {
      if (input.current.value !== '') searchStart(input.current.value);
      input.current.classList.remove('dp-block');
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
        if (input.current.value !== '') searchStart(input.current.value);
        input.current.classList.remove('dp-block');
      }
    };

    return (
      <div className="search-block" ref={searchBlock}>
        <span className="searchBtn" role="button" onClick={onClickHandler} >
          <span role="img" aria-label="search">🔍</span>
        </span>
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
