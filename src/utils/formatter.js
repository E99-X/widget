const DECIMALS = BigInt(1e9);
const MAX_U64 = BigInt("18446744073709551615");

/**
 * Converts a fixed-point number (Sui format) to a rounded float.
 * @param {string | number | bigint} n
 * @returns {number}
 */
export function fixedToFloat(n) {
  return Number(n) / 1e9; // Ensure correct float division by 1e9
}
/**
 * Converts a float number to fixed-point (u64-compatible).
 * @param {string | number} n
 * @returns {bigint}
 */
export function floatToFixed(n) {
  return BigInt(Math.floor(Number(n) * 1e9));
}

/**
 * Checks if the input string is a valid positive number.
 * Useful for input validation.
 * @param {string} value
 * @returns {boolean}
 */
export function isValidPositiveNumber(value) {
  return /^[+]?\d*\.?\d*$/.test(value);
}

/**
 * Calculates the max number of tokens that can be bought
 * without exceeding u64 max limit.
 * @param {bigint} priceFixed
 * @returns {bigint}
 */
export function getMaxTokenAmount(priceFixed) {
  return MAX_U64 / priceFixed;
}

/**
 * Returns the raw maximum allowed input (in float) based on u64 max.
 * @returns {number}
 */
export function getMaxInputFloat() {
  return Number(MAX_U64 / DECIMALS);
}
