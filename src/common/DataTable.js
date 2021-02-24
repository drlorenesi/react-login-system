import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Pagination from './tableComponents/Pagination';
import Table from './tableComponents/Table';
import ShowEntries from './tableComponents/ShowEntries';
import SearchBox from './tableComponents/SearchBox';

function DataTable({ tableColumns, tableData, id }) {
  // Set initial Table properties here
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState({
    column: 'title',
    order: 'asc',
  });

  const handlePageSize = (input) => {
    setPageSize(input);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSort = (newSort) => {
    setSortColumn(newSort);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const handleClearQuery = () => {
    setSearchQuery('');
  };

  // Helper Methods
  // --------------
  // 1. Filter Data
  let filteredData = tableData;
  function filterByValue(array, value) {
    return array.filter(
      (data) =>
        JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
  if (searchQuery) {
    let results = filterByValue(tableData, searchQuery);
    results.length
      ? // Set filteredData to query results
        (filteredData = results)
      : // If there are no results set display to false for TableBody component
        (filteredData = [{ display: false }]);
  }
  // 2. Sort data by column
  const sortedData = _.orderBy(
    filteredData,
    [sortColumn.column],
    [sortColumn.order]
  );
  // 3 Paginate data
  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    // use Lodash wrapper "_()" to chain functions
    return _(items).slice(startIndex).take(pageSize).value();
  };
  const pagedData = paginate(sortedData, currentPage, pageSize);
  // Go back to previous page if all items are deleted on current page
  if (pagedData.length === 0 && filteredData.length !== 0) {
    setCurrentPage(currentPage - 1);
  }

  if (filteredData.length === 0)
    return (
      <div>
        <p>There are no records in the database.</p>
      </div>
    );

  return (
    <React.Fragment>
      {filteredData.length === 0 ? (
        <div>
          <p>There are no records in the database.</p>
        </div>
      ) : (
        <div>
          <div className='row'>
            <div className='col-4'>
              <ShowEntries
                displaySize={handlePageSize}
                allEntries={tableData.length}
                clearQuery={handleClearQuery}
              />
            </div>
            <div className='col-4 ml-auto'>
              <SearchBox value={searchQuery} onChange={handleSearch} />
            </div>
          </div>
          <div className='table-responsive'>
            <Table
              tableColumns={tableColumns}
              tableData={pagedData}
              sortColumn={sortColumn}
              onSort={handleSort}
              id={id}
            />
          </div>
          <Pagination
            itemsCount={filteredData.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </React.Fragment>
  );
}

DataTable.propTypes = {
  tableColumns: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
};

export default DataTable;
