const CURRENCY_SYMBOL = () => {
  const locale = process.env.MIX_CASHIER_CURRENCY_LOCALE;
  const currency = process.env.MIX_CASHIER_CURRENCY;
  return (0).toLocaleString(locale, {
    style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).replace(/\d/g, '').trim();
};

export default CURRENCY_SYMBOL;
