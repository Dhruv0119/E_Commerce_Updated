import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import cartSvg from "../assets/shopping-cart-svgrepo-com.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      login({
        username,
        password,
      })
    );

    if (login.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="container page-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo-badge">
              <img src={cartSvg} alt="NovaCart" />
            </div>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">
              Sign in to manage your orders and account
            </p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>⚠️</span>
              <span>{typeof error === "string" ? error : "Login failed. Please check your credentials."}</span>
            </div>
          )}

          {isAuthenticated && (
            <div className="alert alert-success">
              <span>✓</span>
              <span>Login successful! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full"
              disabled={loading}
              style={{ marginTop: "10px" }}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div style={{ marginTop: "16px", padding: "12px", background: "var(--bg-subtle)", borderRadius: "var(--radius-md)", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Demo: <strong>emilys</strong> / <strong>emilyspass</strong></span>
            <button
              type="button"
              onClick={() => {
                setUsername("emilys");
                setPassword("emilyspass");
              }}
              style={{ background: "none", border: "none", color: "var(--accent)", fontWeight: "600", cursor: "pointer", textDecoration: "underline", padding: 0 }}
            >
              Autofill
            </button>
          </div>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;