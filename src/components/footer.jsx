import { Link } from "react-router-dom";
import cartSvg from "../assets/shopping-cart-svgrepo-com.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="navbar-logo-icon">
                <img src={cartSvg} alt="NovaCart" />
              </span>
              <span>NovaCart</span>
            </div>
            <p className="footer-text">
              Elevating everyday living with thoughtfully curated products, transparent pricing, and lightning-fast delivery across the cosmos.
            </p>
          </div>

          <div>
            <h4 className="footer-title">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Account</h4>
            <ul className="footer-links">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/orders">Order History</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Create Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Guarantees</h4>
            <ul className="footer-links">
              <li><span>⚡ Ultra-Fast Dispatch</span></li>
              <li><span>🔒 256-Bit SSL Encrypted</span></li>
              <li><span>🔄 30-Day Hassle-Free Returns</span></li>
              <li><span>💬 24/7 Dedicated Support</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NovaCart Inc. All rights reserved.</p>
          <p>Designed with precision for modern commerce.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
