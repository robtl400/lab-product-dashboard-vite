import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product, onRemove }) => {
  // Apply conditional class for out-of-stock items
  const cardClass = product.inStock
    ? styles.productCard
    : `${styles.productCard} ${styles.outOfStockClass}`;

  return (
    <div className={cardClass}>
      {/* Display product name */}
      <h3>{product.name}</h3>

      {/* Display product price */}
      <p>Price: {product.price}</p>

      {/* Show if the product is in stock or out of stock */}
      <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>

      {/* Bonus: Remove button */}
      <button onClick={() => onRemove(product.id)}>Remove</button>
    </div>
  );
};

export default ProductCard;
