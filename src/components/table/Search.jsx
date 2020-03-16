import React, { useRef, useState } from 'react';

const style = {
  show: {
    position: 'absolute',
    top: '-10'
  },
  hidden: {
    position: 'static'
  }
}

const Input = ({ state, input, hidden, onChangeHandler }) => {
  return (
    <input
      className="searchInput"
      type="text"
      style={hidden ? { display: "none" } : { display: "block" }}
      value={state}
      ref={input}
      onChange={(e) => onChangeHandler(e)}
    />
  );
}

const Search = ({ column }) => {
  const [state, setState] = useState();
  const input = useRef(null);
  const searchBlock = useRef(null);

  if (column === 1 || column === 2 || column === 4) {
    const onClickHandler = () => {
      searchBlock.current.classList.add = 'absolute';
    };

    const onChangeHandler = ({ target }) => {
      setState(target.value);
    }

    return (
      <div className="search-block" ref={searchBlock}>
        <Input state={state} hidden={true} onChange={onChangeHandler} />
        <button className="searchBtn" type="button" onClick={onClickHandler} >🔍</button>
      </div>
    );
  }

  return false;
}

export default Search;
