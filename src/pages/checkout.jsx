import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { createOrder } from "../redux/slices/ordersSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { calculateCartTotal, formatCurrency } from "../utils";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rawCartItems = useSelector(
    (state) => state.cart.items
  );

  const cartItems = Array.isArray(rawCartItems) ? rawCartItems : [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const total = calculateCartTotal(cartItems);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      customer: formData,
      items: cartItems,
      total: Number(total.toFixed(2)),
    };

    dispatch(createOrder(order));
    dispatch(clearCart());
    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container page-wrapper">
        <div className="page-header">
          <h1 className="page-title">Checkout</h1>
        </div>

        <div className="empty-state">
          <div className="empty-state-icon">🛍️</div>
          <h2 className="empty-state-title">Your cart is empty</h2>
          <p className="empty-state-text">
            Add items to your cart before proceeding to checkout.
          </p>
          <Link to="/products" className="btn btn-primary">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Checkout</h1>
        <p className="page-subtitle">
          Please provide your shipping and contact information to complete your order.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="checkout-layout">
          {/* Customer & Shipping Info */}
          <div className="checkout-form-card">
            <h2 className="checkout-section-title">Shipping & Contact Details</h2>

            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">Street Address *</label>
              <input
                id="address"
                type="text"
                name="address"
                className="form-input"
                placeholder="123 Nebula Way, Suite 400"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="city">City *</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  className="form-input"
                  placeholder="San Francisco"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="state">State / Province *</label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  className="form-input"
                  placeholder="California"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="pincode">Postal / Pincode *</label>
              <input
                id="pincode"
                type="text"
                name="pincode"
                className="form-input"
                placeholder="94103"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Order Summary & Place Order */}
          <div className="cart-summary-card">
            <h3 className="summary-title">Order Overview</h3>

            <div className="checkout-items-preview">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <div>
                    <span style={{ fontWeight: 600, color: "var(--primary-dark)" }}>
                      {item.title}
                    </span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginLeft: "6px" }}>
                      × {item.quantity || 1}
                    </span>
                  </div>
                  <span style={{ fontWeight: 600 }}>
                    {formatCurrency((item.price || 0) * (item.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>{formatCurrency(total)}</span>
            </div>

            <div className="summary-row">
              <span>Standard Shipping</span>
              <span style={{ color: "var(--success)", fontWeight: 600 }}>FREE</span>
            </div>

            <div className="summary-row total">
              <span>Order Total</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <div className="cart-actions">
              <button
                type="submit"
                className="btn btn-accent btn-lg btn-full"
              >
                Place Order ({formatCurrency(total)})
              </button>
            </div>

            <div className="trust-badges">
              <span>🔒 256-Bit SSL Encrypted</span>
              <span>•</span>
              <span>🛡️ Safe & Protected</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;