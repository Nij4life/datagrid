import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { sort, sortReset, SORT_ASC, SORT_DES } from '../../redux/reducer';

const SortButtons = ({ column, active }) => {
  const dispatch = useDispatch();

  const handler = useCallback(({ target }, active, column) => {

    if (target.tagName !== 'SPAN') return false;
    if (target.dataset.sort === active) {
      dispatch(sortReset(0));
    } else {
      dispatch(sort(target.dataset.sort, column));
    }
  }, [dispatch]);

  const arrowASC = <span className={active === SORT_ASC ? `activeBtn arrowASC` : "arrowASC"} data-sort={SORT_ASC}>▲</span>;
  const arrowDES = <span className={active === SORT_DES ? `activeBtn arrowDES` : "arrowDES"} data-sort={SORT_DES}>▼</span>;

  return (
    <>
      <button className="SortBtn" onClick={(e) => handler(e, active, column)}>
        <span>
          {arrowASC}
          {arrowDES}
        </span>
      </button>
    </>
  )
}

export default SortButtons;
