import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import {
  calculateCartTotal,
  calculateCartCount,
  formatCurrency,
} from "../utils";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rawCartItems = useSelector(
    (state) => state.cart.items
  );

  const cartItems = Array.isArray(rawCartItems) ? rawCartItems : [];

  const total = calculateCartTotal(cartItems);
  const totalItemsCount = calculateCartCount(cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="container page-wrapper">
        <div className="page-header">
          <h1 className="page-title">Your Cart</h1>
        </div>

        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2 className="empty-state-title">Your cart is empty.</h2>
          <p className="empty-state-text">
            Looks like you haven't added anything to your cart yet. Explore our curated collection to find something you love.
          </p>
          <Link to="/products" className="btn btn-accent btn-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Your Cart</h1>
        <p className="page-subtitle">
          {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} in your shopping bag
        </p>
      </div>

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-img"
              />

              <div className="cart-item-info">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">
                  ${item.price} each
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() =>
                    dispatch(decreaseQuantity(item.id))
                  }
                  aria-label="Decrease quantity"
                >
                  -
                </button>

                <span className="qty-value">{item.quantity}</span>

                <button
                  className="qty-btn"
                  onClick={() =>
                    dispatch(increaseQuantity(item.id))
                  }
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Remove Action */}
              <button
                className="btn btn-danger-outline"
                onClick={() =>
                  dispatch(removeFromCart(item.id))
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="cart-summary-card">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span style={{ fontWeight: 600 }}>{formatCurrency(total)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span style={{ color: "var(--success)", fontWeight: 600 }}>FREE</span>
          </div>

          <div className="summary-row">
            <span>Taxes</span>
            <span style={{ color: "var(--text-muted)" }}>Calculated at checkout</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <div className="cart-actions">
            <button
              className="btn btn-accent btn-lg btn-full"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout →
            </button>

            <button
              className="btn btn-secondary btn-full"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;