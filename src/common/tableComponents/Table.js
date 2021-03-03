import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

function Table({ tableColumns, tableData, sortColumn, onSort, keyId }) {
  return (
    <div className='table-responsive'>
      <table className='table table-sm align-middle table-striped table-hover table-bordered'>
        <TableHeader
          tableColumns={tableColumns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody
          tableData={tableData}
          tableColumns={tableColumns}
          keyId={keyId}
        />
        <TableFooter tableData={tableData} tableColumns={tableColumns} />
      </table>
    </div>
  );
}

Table.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Table;
