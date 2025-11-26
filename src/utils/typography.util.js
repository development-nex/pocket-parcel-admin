/**
 * Truncates a given text to a maximum length, appending an ellipsis
 * if the text is longer than the maximum length.
 * @param {string} text - The text to be truncated.
 * @param {number} maxLength - The maximum length of the text.
 * @returns {string} The truncated text.
 */
export const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

/**
 * Capitalizes the first letter of a given text.
 * @param {string} text - The text to be capitalized.
 * @returns {string} The capitalized text.
 */
export const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Remove hyphens from a given text
export const removeHyphens = (text) => {
  return text.replace(/-/g, " ");
};

// Remove underscores from a given text
export const removeUnderscores = (text) => {
  return text.replace(/_/g, " ");
};
