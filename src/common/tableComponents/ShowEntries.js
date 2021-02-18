import React from "react";
import PropTypes from "prop-types";

function ShowEntries({ displaySize, allEntries, clearQuery }) {
  const items = [
    { value: 10, label: "Show 10 entries" },
    { value: 15, label: "Show 15 entries" },
    { value: 20, label: "Show 20 entries" },
    { value: allEntries, label: "Show all entries" }
  ];

  const handleChange = (event) => {
    displaySize(parseInt(event.target.value, 10));
    clearQuery();
  };

  return (
    <select className="form-select mb-3" onChange={handleChange}>
      {items.map((item) => (
        <option key={item.label} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

ShowEntries.propTypes = {
  displaySize: PropTypes.func.isRequired,
  allEntries: PropTypes.number.isRequired,
  clearQuery: PropTypes.func.isRequired
};

export default ShowEntries;
