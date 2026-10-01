import { Link } from "react-router-dom";
import { formatCurrency } from "../utils";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <span className="product-card-category">
        {product.category}
      </span>

      <h3 className="product-card-title" title={product.title}>
        {product.title}
      </h3>

      <div className="product-card-meta">
        <span className="product-card-price">
          {formatCurrency(product.price)}
        </span>
        <span className="badge-rating">
          ★ {product.rating}
        </span>
      </div>

      <Link
        to={`/products/${product.id}`}
        className="product-card-cta"
      >
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;