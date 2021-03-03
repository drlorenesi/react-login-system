import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDownUp } from 'react-bootstrap-icons';
import { ArrowUp } from 'react-bootstrap-icons';
import { ArrowDown } from 'react-bootstrap-icons';

function TableHeader({ tableColumns, sortColumn, onSort }) {
  const raiseSort = (column) => {
    const newSort = { ...sortColumn };
    if (newSort.column === column)
      newSort.order = newSort.order === 'asc' ? 'desc' : 'asc';
    else {
      newSort.column = column;
      newSort.order = 'asc';
    }
    onSort(newSort);
  };

  const renderSortIcon = (column) => {
    if (column.accessor === sortColumn.column && sortColumn.order === 'asc') {
      return <ArrowUp />;
    }
    if (column.accessor === sortColumn.column && sortColumn.order === 'desc') {
      return <ArrowDown />;
    }
    if (column.accessor !== sortColumn.column) {
      return <ArrowDownUp />;
    }
  };

  return (
    <thead>
      <tr>
        {tableColumns.map((column) => (
          <th
            key={column.accessor}
            style={{ cursor: 'pointer', textAlign: 'center' }}
            onClick={() => raiseSort(column.accessor)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  tableColumns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TableHeader;
