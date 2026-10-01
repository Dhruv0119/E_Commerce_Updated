import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getProductById } from "../api/productApi";
import { addToCart } from "../redux/slices/cartSlice";
import { formatCurrency } from "../utils";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product));
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  if (loading) {
    return (
      <div className="container page-wrapper">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container page-wrapper">
        <div className="alert alert-error">
          <span>⚠️</span>
          <div>
            <strong>Error loading product:</strong> {error}
          </div>
        </div>
        <Link to="/products" className="btn btn-secondary">
          ← Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container page-wrapper">
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h2 className="empty-state-title">Product Not Found</h2>
          <p className="empty-state-text">
            We couldn't locate the product you were looking for.
          </p>
          <Link to="/products" className="btn btn-primary">
            Explore All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-wrapper">
      <div className="product-details-container">
        {/* Back Link */}
        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>

        <div className="product-details">
          {/* Left Column: Image */}
          <div className="product-details-image">
            <img
              src={product.thumbnail}
              alt={product.title}
            />
          </div>

          {/* Right Column: Info & Actions */}
          <div className="product-details-info">
            <span className="product-details-category">
              {product.category}
            </span>

            <h1 className="product-details-title">
              {product.title}
            </h1>

            {/* Badges */}
            <div className="product-details-badges">
              <span className="badge-rating">
                ★ {product.rating} Rating
              </span>

              {product.discountPercentage && (
                <span className="badge-discount">
                  {product.discountPercentage}% OFF
                </span>
              )}

              <span className="badge badge-success">
                ● In Stock ({product.stock} left)
              </span>
            </div>

            {/* Price */}
            <div className="product-details-price-row">
              <span className="product-details-price">
                {formatCurrency(product.price)}
              </span>
            </div>

            {/* Description */}
            <p className="product-details-description">
              {product.description}
            </p>

            {/* Metadata Grid */}
            <div className="product-details-meta-grid">
              <div className="meta-item">
                <span className="meta-label">Category</span>
                <span className="meta-value" style={{ textTransform: "capitalize" }}>
                  {product.category}
                </span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Stock Availability</span>
                <span className="meta-value">{product.stock} units</span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Discount</span>
                <span className="meta-value">
                  {product.discountPercentage ? `${product.discountPercentage}%` : "None"}
                </span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Delivery</span>
                <span className="meta-value">Free Express Shipping</span>
              </div>
            </div>

            {/* Feedback alert */}
            {addedNotice && (
              <div className="alert alert-success" style={{ margin: "8px 0 0" }}>
                <span>✓</span>
                <span>Added to cart successfully!</span>
              </div>
            )}

            {/* Add to Cart CTA */}
            <div className="product-details-actions">
              <button
                className="btn btn-accent btn-lg btn-full"
                onClick={handleAddToCart}
              >
                <span>🛒</span> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;