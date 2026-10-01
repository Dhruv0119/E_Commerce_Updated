/**
 * Safe retrieval from browser localStorage with JSON parsing.
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch {
    return defaultValue;
  }
};

/**
 * Safe write to browser localStorage.
 * @param {string} key
 * @param {*} value
 */
export const setStorageItem = (key, value) => {
  try {
    const serialized = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.error(`Failed to write to localStorage for key: ${key}`, err);
  }
};

/**
 * Safe removal from browser localStorage.
 * @param {string} key
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Failed to remove key from localStorage: ${key}`, err);
  }
};
