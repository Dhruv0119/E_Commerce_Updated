import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="container page-wrapper">
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon-badge">
            ✓
          </div>

          <h1 className="success-title">Order Placed Successfully!</h1>

          <p className="success-message">
            Thank you for your purchase. Your order has been registered and our fulfillment team is preparing your package for shipment.
          </p>

          <div className="success-actions">
            <Link to="/orders" className="btn btn-primary btn-lg">
              View My Orders
            </Link>

            <Link to="/products" className="btn btn-secondary btn-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;