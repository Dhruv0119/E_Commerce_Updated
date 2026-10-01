/**
 * Sort product items based on selected criteria.
 * @param {Array} products
 * @param {string} sortType
 * @returns {Array}
 */
export const sortProducts = (products = [], sortType = "default") => {
  const list = [...(products || [])];

  switch (sortType) {
    case "price-low":
      return list.sort((a, b) => a.price - b.price);
    case "price-high":
      return list.sort((a, b) => b.price - a.price);
    case "rating-high":
      return list.sort((a, b) => b.rating - a.rating);
    default:
      return list;
  }
};
