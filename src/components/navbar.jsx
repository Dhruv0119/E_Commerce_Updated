import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useTheme } from "../context/themeContext";
import { calculateCartCount } from "../utils";
import cartSvg from "../assets/shopping-cart-svgrepo-com.svg";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartCount = calculateCartCount(cartItems);

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo with User's SVG */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            <span className="navbar-logo-icon">
              <img src={cartSvg} alt="NovaCart" />
            </span>
            <span className="navbar-logo-text">NovaCart</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Orders
              </NavLink>

              <button
                className="btn-nav-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn-nav-login"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="btn-nav-register"
              >
                Register
              </NavLink>
            </>
          )}

          {/* Theme Toggle Button (Desktop) */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle light and dark theme"
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Header Actions */}
        <div className="mobile-header-actions" style={{ display: "none", alignItems: "center", gap: "8px" }}>
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle light and dark theme"
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          end
          className="nav-link"
          onClick={closeMenu}
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className="nav-link"
          onClick={closeMenu}
        >
          Products
        </NavLink>

        <NavLink
          to="/cart"
          className="nav-link"
          onClick={closeMenu}
        >
          <span>Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </NavLink>

        {isAuthenticated ? (
          <div className="mobile-drawer-auth">
            <NavLink
              to="/dashboard"
              className="nav-link"
              onClick={closeMenu}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/orders"
              className="nav-link"
              onClick={closeMenu}
            >
              Orders
            </NavLink>

            <button
              className="btn btn-danger-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="mobile-drawer-auth">
            <NavLink
              to="/login"
              className="btn btn-secondary"
              onClick={closeMenu}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="btn btn-primary"
              onClick={closeMenu}
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;