import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ShowEntries({ displaySize, allEntries, clearQuery }) {
  const items = [
    { value: 10, label: 'Show 10 entries' },
    { value: 15, label: 'Show 15 entries' },
    { value: 20, label: 'Show 20 entries' },
    { value: allEntries, label: 'Show all entries' },
  ];

  const [show, setShow] = useState(items[0].label);

  const handleChange = (value) => {
    displaySize(parseInt(value, 10));
    setShow(items.filter((item) => item.value === value)[0].label);
    clearQuery();
  };

  return (
    <div className='btn-group mb-2' role='group'>
      <div className='btn-group' role='group'>
        <button
          id='btnGroupDrop1'
          type='button'
          className='btn btn-secondary dropdown-toggle'
          data-bs-toggle='dropdown'
        >
          {show}
        </button>
        <ul className='dropdown-menu'>
          {items.map((item) => (
            <li key={item.label} onClick={() => handleChange(item.value)}>
              <a className='dropdown-item'>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <button type='button' className='btn btn-secondary'>
        Download
      </button>
    </div>
  );
}

ShowEntries.propTypes = {
  displaySize: PropTypes.func.isRequired,
  allEntries: PropTypes.number.isRequired,
  clearQuery: PropTypes.func.isRequired,
};

export default ShowEntries;
