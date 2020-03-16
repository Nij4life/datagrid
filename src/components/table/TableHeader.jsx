import React from 'react';
import { connect } from 'react-redux';
import SortButtons from './SortButtons';

const TableHeaderCell = ({ column, active, children }) => {
  return (
    <th>
      <div>
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
        <TableHeaderCell key={el} column={i} active={(i == column) ? sort : ''}>
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

const TableHeaderContainer = connect(mapStateToProps, null)(TableHeader);

export default TableHeaderContainer;
