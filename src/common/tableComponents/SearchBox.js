import React from "react";
import PropTypes from "prop-types";

function SearchBox({ value, onChange }) {
  return (
    <input
      name="query"
      type="search"
      onChange={(e) => onChange(e.currentTarget.value)}
      value={value}
      className="form-control"
      placeholder="Search"
    />
  );
}

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SearchBox;
