/**
 * Calculate the total price of all items in the cart.
 * @param {Array} items
 * @returns {number}
 */
export const calculateCartTotal = (items = []) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce(
    (sum, item) => sum + (Number(item?.price) || 0) * (Number(item?.quantity) || 1),
    0
  );
};

/**
 * Calculate the total item count across all cart items.
 * @param {Array} items
 * @returns {number}
 */
export const calculateCartCount = (items = []) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce(
    (total, item) => total + (Number(item?.quantity) || 0),
    0
  );
};
