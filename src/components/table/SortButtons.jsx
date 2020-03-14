import React from 'react';
import { SORT_ASC, SORT_DES } from '../../redux/reducer';

const SortButtons = ({ dataType, index, sort }) => {
  return (
    <>
      <button type="button" onClick={() => sort(SORT_ASC, index, dataType)}>T</button>
      <button type="button" onClick={() => sort(SORT_DES, index, dataType)}>B</button>
    </>
  )
}

export default SortButtons;
