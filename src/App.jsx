import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartUser } from "./redux/slices/cartSlice";
import { setOrdersUser } from "./redux/slices/ordersSlice";
import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/orderSuccess";
import Orders from "./pages/orders";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { restoreSession } from "./redux/slices/authSlice";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetails from "./pages/productDetails";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Dashboard from "./pages/dashboard";

import ProtectedRoute from "./components/protectedRoute";

function App() {
  const dispatch = useDispatch();

  const restoring = useSelector(
    (state) => state.auth.restoring
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(setCartUser(user.id));
      dispatch(setOrdersUser(user.id));
    } else {
      dispatch(setCartUser(null));
      dispatch(setOrdersUser(null));
    }
  }, [user, dispatch]);

  if (restoring) {
    return (
      <div className="loading-container" style={{ minHeight: "100vh" }}>
        <div className="loading-spinner-large"></div>
        <p style={{ fontWeight: 600, color: "var(--text-muted)" }}>
          Restoring session...
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;