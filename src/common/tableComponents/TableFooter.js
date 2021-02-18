import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { pipe } from 'lodash/fp';
import { formatDec } from '../../utils/formatNumber';

function TableFooter({ tableData, tableColumns }) {
  const alignCell = (dataAlign) => {
    return {
      textAlign: dataAlign
    };
  };

  // Check if tableColumns array contains a "footer" property (first ocurrance)
  // console.log(containsFooter) => {accessor: "id", label: "Id", footer: "sum"}
  let containsFooter = _.find(tableColumns, 'footer');

  // If tableColumns object has "footer" property, create array of accesor values
  // console.log(accesor) => ["id", null, null, "account_balance", null]
  let colAccessor = tableColumns.map((column, i) =>
    column.footer ? column.accessor : null
  );

  // Reducer function
  function reducer(action, items, prop) {
    switch (action) {
      case 'sum':
        return _.sum(items.map((item) => item[prop]));
      case 'min':
        return _.min(items.map((item) => item[prop]));
      case 'max':
        return _.max(items.map((item) => item[prop]));
      case 'avg':
        return _.mean(items.map((item) => item[prop]));
      default:
        return null;
    }
  }

  const checkIfNotNumber = (value) => (!isNaN(value) ? value : null);

  // Currying and formatting
  const operation = pipe(reducer, checkIfNotNumber);

  // Render footer if "containsFooter" is truthy
  return containsFooter ? (
    <tfoot>
      <tr>
        {tableColumns.map((column, i) => (
          <td key={column.accessor} style={alignCell(column.dataAlign)}>
            {column.footer
              ? formatDec(operation(column.footer, tableData, colAccessor[i]))
              : null}
          </td>
        ))}
      </tr>
    </tfoot>
  ) : null;
}

TableFooter.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired
};

export default TableFooter;
