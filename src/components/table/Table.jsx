import React from 'react';
import TableBodyContainer from './TableBody';
import TableHeaderContainer from './TableHeader';

const Table = () => {
    return (
      <table>
        <caption>Some kind of table</caption>
        <TableHeaderContainer />
        <TableBodyContainer />
      </table>
    );
};

export default Table;
