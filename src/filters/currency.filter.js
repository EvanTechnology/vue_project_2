export default function currencyFilter(value, currency = "AUD") {
  return new Intl.NumberFormat("au-AU", {
    style: "currency",
    currency: currency
  }).format(value);
}
