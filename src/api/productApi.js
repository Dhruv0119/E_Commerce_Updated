const BASE_URL = "https://dummyjson.com";

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};

export const searchProducts = async (query) => {
  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json();
};

export const getProductsByCategory = async (category) => {
  const response = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(
    `${BASE_URL}/products/categories`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};
