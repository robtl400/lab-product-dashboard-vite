import ProductCard from './ProductCard';

const ProductList = ({ products, onRemoveProduct }) => {
  // Check if the product list is empty and display a message if needed
  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div id="product-list">
      {/* Iterate over the products array and render a ProductCard for each product */}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onRemove={onRemoveProduct}
        />
      ))}
    </div>
  );
};

export default ProductList;
