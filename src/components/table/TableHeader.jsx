import React from 'react';
import { connect } from 'react-redux';
import { sort } from '../../redux/reducer';
import { TYPE_NUMBER, TYPE_STRING } from '../../utils/constants';
import SortButtons from './SortButtons';

const TableHeader = ({ sort }) => {

  return (
    <thead>
      <tr>
        <th>
          <SortButtons dataType={TYPE_NUMBER} index="0" sort={sort} />
          №
        </th>
        <th>
          <SortButtons dataType={TYPE_STRING} index="1" sort={sort} />
          Country
        </th>
        <th>Language</th>
        <th>Hobby</th>
      </tr>
    </thead>
  );
}

const TableHeaderContainer = connect(null, { sort })(TableHeader);

export default TableHeaderContainer;
