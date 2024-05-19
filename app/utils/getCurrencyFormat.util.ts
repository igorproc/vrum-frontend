export const formattedPrice = (price: number | null, currency = 'USD') => {
  if (!price) {
    return `$0`
  }

  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 2,
  }).format(price)
}
