import React from 'react';

function ProducDetails(props) {
  const { id } = props.match.params;

  const handleSave = (id) => {
    console.log(`Product ${id} saved.`);
    // Allows use of the "back" button on the browser
    props.history.push('/products');
    // Clears browser history (use in login pages)
    // props.history.replace('/products');
  };

  return (
    <React.Fragment>
      <h1>Product - {id}</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleSave(id)}
      >
        Save
      </button>
    </React.Fragment>
  );
}

export default ProducDetails;
