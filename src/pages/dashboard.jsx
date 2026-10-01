import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { calculateCartCount, getUserDisplayName } from "../utils";

function Dashboard() {
  const user = useSelector(
    (state) => state.auth.user
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const orders = useSelector(
    (state) => state.orders.orders
  );

  const cartCount = calculateCartCount(cartItems);

  const ordersCount = (orders || []).length;

  if (!user) {
    return (
      <div className="container page-wrapper">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Loading profile information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Account Dashboard</h1>
        <p className="page-subtitle">
          Welcome back, {getUserDisplayName(user)}!
        </p>
      </div>

      {/* Shopping Overview Stats */}
      <div className="dashboard-grid">
        <div className="dashboard-stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <span className="stat-value">{cartCount}</span>
            <span className="stat-label">Items in Cart</span>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <span className="stat-value">{ordersCount}</span>
            <span className="stat-label">Total Orders Placed</span>
          </div>
        </div>
      </div>

      {/* Account Details Card */}
      <div className="card" style={{ marginBottom: "32px" }}>
        <h2 className="section-title" style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
          Account Information
        </h2>

        <div className="dashboard-info-row">
          <span className="info-label">Full Name</span>
          <span className="info-value">
            {user.firstName ? `${user.firstName} ${user.lastName || ""}` : (user.name || "N/A")}
          </span>
        </div>

        <div className="dashboard-info-row">
          <span className="info-label">Username</span>
          <span className="info-value">{user.username || "N/A"}</span>
        </div>

        <div className="dashboard-info-row">
          <span className="info-label">Email Address</span>
          <span className="info-value">{user.email || "N/A"}</span>
        </div>

        <div className="dashboard-info-row">
          <span className="info-label">Account Status</span>
          <span className="badge badge-success">Active Member</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="dashboard-actions">
        <Link to="/cart">
          <button className="btn btn-primary btn-lg">
            View Cart ({cartCount})
          </button>
        </Link>

        <Link to="/orders">
          <button className="btn btn-secondary btn-lg">
            View Orders ({ordersCount})
          </button>
        </Link>

        <Link to="/products">
          <button className="btn btn-accent btn-lg">
            Continue Shopping →
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;