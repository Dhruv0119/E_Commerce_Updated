/**
 * Format a numeric price or string into a formatted currency string (e.g. $19.99).
 * @param {number|string} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  const num = Number(amount);
  if (isNaN(num) || amount == null) return "$0.00";
  return `$${num.toFixed(2)}`;
};

/**
 * Format an ISO date string or timestamp into a localized readable date.
 * @param {string|number|Date} dateString
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return "Recently";
  return new Date(dateString).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get formatted user display name.
 * @param {object|null} user
 * @returns {string}
 */
export const getUserDisplayName = (user) => {
  if (!user) return "";
  if (user.firstName) {
    return `${user.firstName} ${user.lastName || ""}`.trim();
  }
  return user.name || user.username || "User";
};
