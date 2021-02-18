import React from "react";
import PropTypes from "prop-types";
// import _ from "lodash";

function Pagination({ itemsCount, pageSize, onPageChange, currentPage }) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  // To create an array of page numbers uncomment:
  // const pages = _.range(1, pagesCount + 1);
  // Create array [1, 2, 3, ...]

  if (itemsCount === 0) return null;

  return (
    <div className="row">
      <div className="col">
        Page {currentPage} of {pagesCount}
      </div>
      <div className="col">
        <nav>
          <ul className="pagination justify-content-end">
            <li
              className={currentPage === 1 ? "page-item disabled" : "page-item"}
            >
              <button onClick={() => onPageChange(1)} className="page-link">
                <span>&laquo;</span>
              </button>
            </li>
            <li
              className={currentPage === 1 ? "page-item disabled" : "page-item"}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
              >
                &lt;
              </button>
            </li>
            {/* {pages.map((page) => (
              <li
                key={page}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))} */}
            <li
              className={
                currentPage === pagesCount ? "page-item disabled" : "page-item"
              }
            >
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
              >
                &gt;
              </button>
            </li>
            <li
              className={
                currentPage === pagesCount ? "page-item disabled" : "page-item"
              }
            >
              <button
                onClick={() => onPageChange(pagesCount)}
                className="page-link"
              >
                <span>&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
