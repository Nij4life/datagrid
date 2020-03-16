import React from 'react';
import { connect } from 'react-redux';
import SortButtons from './SortButtons';
import Search from './Search';

const TableHeaderCell = ({ column, active, children }) => {
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

const TableHeader = ({ headers, activeSort }) => {
  let column, sort;
  if (activeSort) {
    ({ column, sort } = activeSort);
  }

  return (
    <thead>
      <tr className="table-header">
        {headers.map((el, i) => (
          <TableHeaderCell key={el} column={i} active={(i === column) ? sort : ''}>
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

const TableHeaderContainer = connect(mapStateToProps, {})(TableHeader);

export default TableHeaderContainer;
