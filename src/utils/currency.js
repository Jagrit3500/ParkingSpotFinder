// Currency conversion utility

// Conversion rate from USD to INR (1 USD = 83.50 INR approximately)
const USD_TO_INR_RATE = 83.50;

/**
 * Convert USD to INR
 * @param {number} amount - Amount in USD
 * @param {boolean} formatted - Whether to return the formatted string with symbol or just the number
 * @returns {string|number} - Converted amount in INR with ₹ symbol if formatted, or just the number
 */
export const convertUSDtoINR = (amount, formatted = true) => {
  if (amount === undefined || amount === null) return formatted ? '₹0.00' : 0;
  
  // Convert to INR
  const inrAmount = parseFloat(amount) * USD_TO_INR_RATE;
  
  // Return formatted or raw value
  if (formatted) {
    return `₹${inrAmount.toFixed(2)}`;
  }
  return parseFloat(inrAmount.toFixed(2));
};

/**
 * Format a price range in INR
 * @param {string} min - Minimum price in USD
 * @param {string} max - Maximum price in USD
 * @returns {string} - Formatted price range in INR
 */
export const formatPriceRangeINR = (min, max) => {
  const minINR = convertUSDtoINR(min, false);
  
  if (max) {
    const maxINR = convertUSDtoINR(max, false);
    return `₹${minINR.toFixed(0)}-₹${maxINR.toFixed(0)}`;
  }
  
  return `₹${minINR.toFixed(0)}+`;
}; 