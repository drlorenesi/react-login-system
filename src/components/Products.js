import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [products] = useState([
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ]);

  return (
    <React.Fragment>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default Products;
