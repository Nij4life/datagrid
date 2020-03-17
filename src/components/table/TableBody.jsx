import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { getDataThunkCreator, SORT_RESET } from '../../redux/reducer';
import { DEFAULT_DATA_LENGTH } from '../../utils/constants';

const DefaultRow = ({ dataRow, index }) => {
  if (index > 20) return false;
  const clsName = index % 2 === 0 ? 'row even' : 'row odd';

  return (
    <tr className={clsName} >
      <td className="row__id">{dataRow[0]}</td>
      <td className="row__country">{dataRow[2]}</td>
      <td className="row__age">{dataRow[8]}</td>
      <td className="row__gender">{dataRow[9]}</td>
    </tr>
  );
}

const TableCell = ({ addClass, data }) => {
  return <td className={addClass ? `${addClass} row` : 'row'}>{data}</td>
}

const TableRow = ({ dataRow }) => {
  const activeSort = useSelector(state => state.activeSort);
  let sortColumn;

  if (activeSort) {
    sortColumn = activeSort.column;
    sortColumn = (activeSort.sort === SORT_RESET) ? '-1' : sortColumn;
  }

  return (
    <tr>
      {dataRow.map((data, i) => <TableCell key={i} addClass={(i === sortColumn) ? 'sortColumn' : ''} data={data} />)}
    </tr>
  );
};

const TableBody = ({ data, getData }) => {
  useEffect(() => getData(), [getData]);

  const renderData = !data ? null : data;

  if (!renderData) return false;

  if (renderData.length < 1) {
    return (
      <tbody>
        <tr style={{fontSize: 30, textAlign: 'center'}}>
          <td colSpan='7'> Данных не найдено </td>
        </tr>
      </tbody>
    );
  }
  // If getData rejected
  if (renderData[0].length === DEFAULT_DATA_LENGTH) {
    return (
      <tbody>
        {renderData.map((dataRow, i) => <DefaultRow key={i} dataRow={dataRow} />)}
      </tbody>
    );
  }

  return (
    <tbody>
      {renderData.map((dataRow, i) => <TableRow key={i} dataRow={dataRow} />)}
    </tbody>
  );
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getDataThunkCreator()),
});

const TableBodyContainer = connect(mapStateToProps, mapDispatchToProps)(TableBody);

export default TableBodyContainer;
