export function lowerBound(value: number, boundary: number, minValue: number): number {
  return (value <= boundary) ? minValue : value;
}

export function upperBound(value: number, boundary: number, maxValue: number): number {
  return (value >= boundary) ? maxValue : value;
}
