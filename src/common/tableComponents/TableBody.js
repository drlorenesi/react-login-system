import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { formatDec } from '../../utils/formatNumber';

function TableBody({ tableData, tableColumns, keyId }) {
  const alignCell = (dataAlign) => {
    return {
      textAlign: dataAlign,
    };
  };

  const renderCell = (item, column) => {
    // Render function passed in through "cell" column property
    if (column.cell) return column.cell(item);
    // Render as decimal if "type" equals "decimal"
    if (column.type === 'decimal') {
      // use Lodash to account for embedded documents "property1.property2"
      return formatDec(_.get(item, column.accessor));
    }
    // Default case
    return _.get(item, column.accessor);
  };

  return (
    <tbody>
      {tableData[0].display !== false ? (
        tableData.map((item) => (
          // Need to pass in a unique key
          // ---------------------------
          <tr key={item[keyId]}>
            {tableColumns.map((column) => (
              <td key={column.accessor} style={alignCell(column.dataAlign)}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={tableColumns.length} style={{ textAlign: 'center' }}>
            There are no results to display.
          </td>
        </tr>
      )}
    </tbody>
  );
}

TableBody.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
};

export default TableBody;
