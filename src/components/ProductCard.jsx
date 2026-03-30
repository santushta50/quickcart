import "../styles/ProductCard.css";
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} width="200" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>{product.category}</p>
    </div>
  );
}

export default ProductCard;