export const formatPrice = (amount) => {
  const locale = process.env.MIX_CASHIER_CURRENCY_LOCALE || 'en-US';
  const currency = process.env.MIX_CASHIER_CURRENCY || 'USD';
  return (Number(amount))
    .toLocaleString(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
};

export default formatPrice;
