export default function getLighterColor(color) {
  const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  
  let [, r, g, b] = match.map(Number);

  // Increase each component by 10%
  r = Math.min(Math.round(r * 1.5), 255);
  g = Math.min(Math.round(g * 1.5), 255);
  b = Math.min(Math.round(b * 1.5), 255);

  // Return the new color string
  return `rgb(${r}, ${g}, ${b})`;
}