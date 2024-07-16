export default function formatDisplay(value, maxDigits = 8) {
  let formatted = parseFloat(value).toString();

  if (!formatted) return value
  
  if (formatted.length > maxDigits) {
    if (formatted.includes('e')) {
      // Already in scientific notation, truncate
      return formatted.slice(0, maxDigits);
    } else if (Math.abs(parseFloat(value)) < 1) {
      // Small number, use fixed notation
      return parseFloat(value).toFixed(maxDigits - 2);
    } else {
      // Large number, use exponential notation
      return parseFloat(value).toExponential(maxDigits - 6);
    }
  }
  
  return formatted;
}