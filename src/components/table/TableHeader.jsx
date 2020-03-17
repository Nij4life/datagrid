import React from 'react';
import { connect } from 'react-redux';
import SortButtons from './SortButtons';
import Search from './Search';
import { filterOnlyTrue, filterTrueAndFalse } from '../../redux/reducer';
import { LAST_COLUMN_NUMBER } from '../../utils/constants';

const TableHeaderCell = ({ column, active, filterOnlyTrue, filterTrueAndFalse, children }) => {
  if (column === LAST_COLUMN_NUMBER) {
    return (
      <th>
        <div className="table-header-cell">
          <span>{children}</span>
          <label>
            <input className='input-checkbox' type="checkbox" onChange={(e) => {
              if (e.target.checked) {
                filterOnlyTrue();
              } else {
                filterTrueAndFalse();
              }
            }}
            />
            (Yes)
          </label>
        </div>
      </th>
    );
  }

  return (
    <th>
      <div className="table-header-cell">
        <Search column={column} />
        <span>{children}</span>
        <SortButtons column={column} active={active} />
      </div>
    </th>
  );
};

const TableHeader = ({ headers, activeSort, filterOnlyTrue, filterTrueAndFalse }) => {
  let column, sort;
  if (activeSort) {
    ({ column, sort } = activeSort);
  }

  return (
    <thead>
      <tr className="table-header">
        {headers.map((el, i) => (
          <TableHeaderCell
            key={el}
            column={i}
            active={(i === column) ? sort : ''}
            filterOnlyTrue={filterOnlyTrue}
            filterTrueAndFalse={filterTrueAndFalse}
          >
            {el}
          </TableHeaderCell>)
        )}
      </tr>
    </thead>
  );
}

const mapStateToProps = (state) => (
  {
    headers: state.headers,
    activeSort: state.activeSort,
  }
);

const TableHeaderContainer = connect(mapStateToProps, { filterOnlyTrue, filterTrueAndFalse })(TableHeader);

export default TableHeaderContainer;
