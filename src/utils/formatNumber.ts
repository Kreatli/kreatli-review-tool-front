interface FormatPriceOptions {
  minimumFractionDigits?: number;
}

export const formatPrice = (number: number, options?: FormatPriceOptions) => {
  const { minimumFractionDigits = 2 } = options ?? {};

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
  }).format(number);
};
