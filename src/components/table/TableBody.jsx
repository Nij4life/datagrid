import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDataThunkCreator } from '../../redux/reducer';

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

const TableRow = ({ dataRow, index }) => {
  const clsName = index % 2 === 0 ? 'row even' : 'row odd';

  return (
    <tr className={clsName} >
      <td className="row__id">{dataRow[0]}</td>
      <td className="row__country">{dataRow[1]}</td>
      <td className="row__language">{dataRow[2]}</td>
      <td className="row__hobby">{dataRow[3]}</td>
    </tr>
  );
};

const TableBody = ({ data, getData }) => {
  useEffect(() => getData(), [getData]);

  const renderData = !data ? null : data;

  if (!renderData) {
    return (
      <tbody>
        <tr>
          <td>Oops!</td>
        </tr>
      </tbody>
    );
  }

  if (renderData[0].length < 7) {
    return (
      <tbody>
        {renderData.map((dataRow, i) => <TableRow key={i} index={i} dataRow={dataRow} />)}
      </tbody>
    );
  }

  return (
    <tbody>
      {renderData.map((dataRow, i) => <DefaultRow key={i} index={i} dataRow={dataRow} />)}
    </tbody>
  );
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getDataThunkCreator()),
});

const TableBodyContainer = connect(mapStateToProps, mapDispatchToProps)(TableBody);

export default TableBodyContainer;
