import React, {useCallback} from 'react';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import IconButton from '@material-ui/core/IconButton';
import { SORT_ASC, SORT_DES } from '../../redux/reducer';
import { useDispatch } from 'react-redux';
import { sort } from '../../redux/reducer';

const SortButtons = ({ column, active }) => {
  const dispatch = useDispatch();

  const handler = useCallback(({target}) => {
    dispatch(sort(target.dataset.sort, column));
  }, []);
  console.log('222', column);
  const arrowASC = <span className={ active === SORT_ASC ? `activeBtn arrowASC` : "arrowASC" } data-sort={SORT_ASC}>▲</span>;
  const arrowDES = <span className={ active === SORT_DES ? `activeBtn arrowDES` : "arrowDES" } data-sort={SORT_DES}>▼</span>;

  // const onClickHandler = ({target}) => {
  //   if (target.tagName !== 'SPAN') return false;
  //   sort(target.dataset.sort, column, dataType);
  // };

  return (
    <>
      <button className="SortBtn" onClick={handler}>
        <span>
          {arrowASC}
          {arrowDES}
        </span>
      </button>
      {/* <button type="button" onClick={() => sort(SORT_ASC, column, dataType)}>T</button>
      <button type="button" onClick={() => sort(SORT_DES, column, dataType)}>B</button> */}
      {/* <IconButton className="iconButton" aria-label="filter list" >
        <ArrowUpwardIcon onClick={() => sort(SORT_ASC, column, dataType)} />
        <ArrowDownwardIcon onClick={() => sort(SORT_DES, column, dataType)} />
      </IconButton> */}
    </>
  )
}

export default SortButtons;
