import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  searchProduct,
  fetchProductsByCategory,
} from "../redux/slices/productSlice";

import ProductCard from "../components/productCard";
import { sortProducts } from "../utils";

function Products() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  // Fetch products whenever category or search changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim() !== "") {
        dispatch(searchProduct(search.trim()));
      } else if (category !== "all") {
        dispatch(fetchProductsByCategory(category));
      } else {
        dispatch(fetchProducts());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, category, dispatch]);

  // Sort products locally using helper function
  const sortedProducts = sortProducts(products, sort);

  const isInitialLoading = loading || (!error && (products || []).length === 0 && search === "" && category === "all");

  return (
    <div className="container page-wrapper">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <p className="page-subtitle">
          Explore our collection of top-rated modern essentials.
        </p>
      </div>

      {/* Unified Filter & Search Bar */}
      <div className="filter-bar">
        {/* Search */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="form-input"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-dropdowns">
          {/* Category */}
          <div className="category-container">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="fragrances">Fragrances</option>
              <option value="groceries">Groceries</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>

          {/* Sort */}
          <div className="sort-container">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Sort By: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating-high">Rating: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State Skeleton */}
      {isInitialLoading ? (
        <div className="skeleton-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-img"></div>
              <div className="skeleton skeleton-line-sm"></div>
              <div className="skeleton skeleton-line"></div>
              <div className="skeleton skeleton-line-lg"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        /* Error State */
        <div className="alert alert-error">
          <span>⚠️</span>
          <div>
            <strong>Failed to load products:</strong> {error}
          </div>
        </div>
      ) : sortedProducts.length === 0 ? (
        /* Empty State */
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h2 className="empty-state-title">No products found</h2>
          <p className="empty-state-text">
            We couldn't find any products matching your search or filters. Try adjusting your keywords.
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearch("");
              setCategory("all");
              setSort("default");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* Products Grid */
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;