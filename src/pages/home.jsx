import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";
import { getUserDisplayName } from "../utils";

function Home() {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogin = () => {
    dispatch(
      login({
        username: "emilys",
        password: "emilyspass",
      })
    );
  };

  const categories = [
    { name: "Smartphones", icon: "📱", path: "/products" },
    { name: "Laptops", icon: "💻", path: "/products" },
    { name: "Fragrances", icon: "✨", path: "/products" },
    { name: "Groceries", icon: "🌿", path: "/products" },
    { name: "Furniture", icon: "🛋️", path: "/products" },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>Next-Gen E-Commerce Experience</span>
          </div>

          <h1 className="hero-title">
            Everything you want. <br />
            <span className="hero-title-accent">One cart away.</span>
          </h1>

          <p className="hero-description">
            Discover a curated universe of premium electronics, lifestyle essentials, and modern living accessories engineered for excellence.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn btn-accent btn-lg">
              Explore Products <span>→</span>
            </Link>
            <Link to="/cart" className="btn btn-secondary btn-lg">
              View Cart
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Benefits Section */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-icon">⚡</div>
              <h3 className="trust-title">Ultra-Fast Dispatch</h3>
              <p className="trust-desc">
                Same-day fulfillment on orders placed before 2 PM. Real-time courier tracking.
              </p>
            </div>

            <div className="trust-card">
              <div className="trust-icon">🛡️</div>
              <h3 className="trust-title">100% Authentic</h3>
              <p className="trust-desc">
                Verified genuine products sourced directly from authorized manufacturers.
              </p>
            </div>

            <div className="trust-card">
              <div className="trust-icon">🔒</div>
              <h3 className="trust-title">Secure Payments</h3>
              <p className="trust-desc">
                Bank-grade encrypted checkouts supporting all major cards and digital wallets.
              </p>
            </div>

            <div className="trust-card">
              <div className="trust-icon">🔄</div>
              <h3 className="trust-title">30-Day Guarantee</h3>
              <p className="trust-desc">
                No-hassle returns and instant replacements if you aren't completely delighted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="categories-section">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Browse through our handpicked collection of trending categories
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <Link to={cat.path} key={idx} className="category-card">
                <div className="category-icon">{cat.icon}</div>
                <span className="category-name">{cat.name}</span>
              </Link>
            ))}
          </div>

          {/* Quick Demo Session Status (Preserving existing home logic) */}
          <div className="demo-auth-panel">
            <div className="demo-auth-info">
              <span
                className={`demo-status-pill ${
                  isAuthenticated ? "logged-in" : "logged-out"
                }`}
              >
                ● {isAuthenticated ? "Logged In" : "Not Logged In"}
              </span>
              {user && (
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                  Welcome back, {getUserDisplayName(user)}!
                </span>
              )}
            </div>

            <div className="demo-auth-actions">
              {!isAuthenticated ? (
                <button
                  onClick={handleLogin}
                  className="btn btn-secondary btn-sm"
                >
                  Test Demo Login
                </button>
              ) : (
                <button
                  onClick={() => dispatch(logout())}
                  className="btn btn-danger-outline btn-sm"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;