import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate, formatCurrency } from "../utils";

function Orders() {
  const orders = useSelector(
    (state) => state.orders.orders
  );

  if (!orders || orders.length === 0) {
    return (
      <div className="container page-wrapper">
        <div className="page-header">
          <h1 className="page-title">My Orders</h1>
        </div>

        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h2 className="empty-state-title">You have no orders yet</h2>
          <p className="empty-state-text">
            Once you make a purchase, you can track shipment updates and order history right here.
          </p>
          <Link to="/products" className="btn btn-accent btn-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-wrapper">
      <div className="page-header">
        <h1 className="page-title">My Orders</h1>
        <p className="page-subtitle">
          Showing {orders.length} past {orders.length === 1 ? "order" : "orders"}
        </p>
      </div>

      <div className="orders-list">
        {orders.map((order, index) => (
          <div key={order.id || index} className="order-card">
            {/* Order Header */}
            <div className="order-header">
              <div>
                <span className="order-id">Order #{order.id || "N/A"}</span>
                <p className="order-date">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>

              <span className="badge badge-success">
                ● Order Confirmed
              </span>
            </div>

            {/* Itemized list */}
            <div className="order-items-table">
              {(order.items || []).map((item) => (
                <div key={item.id} className="order-item-row">
                  <span className="order-item-name">
                    {item.title} <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>× {item.quantity || 1}</span>
                  </span>

                  <span className="order-item-price">
                    {formatCurrency((item.price || 0) * (item.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>

            {/* Order Total Footer */}
            <div className="order-footer">
              <span className="order-total-label">Total Amount</span>
              <span className="order-total-amount">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;