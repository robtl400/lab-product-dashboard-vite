import { useState } from 'react';
import ProductList from './components/ProductList';

const App = () => {
  // Define initial product data
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: '$999', inStock: true },
    { id: 2, name: 'Phone', price: '$699', inStock: false },
    { id: 3, name: 'Tablet', price: '$499', inStock: true },
  ]);

  // Handle removing a product
  const handleRemoveProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div>
      <h1 id="header">Product Dashboard</h1>

      {/* Render the ProductList component and pass products */}
      <ProductList products={products} onRemoveProduct={handleRemoveProduct} />
    </div>
  );
};

export default App;
