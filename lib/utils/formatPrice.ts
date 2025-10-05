export const formatPrice = (value: number) => {
  const fractionDigits = value < 5 ? 4 : 2
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B'
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M'
  } else if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(2) + 'T'
  } else {
    return num.toString()
  }
}
