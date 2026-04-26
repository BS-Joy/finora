interface Currency {
  code: string;
  currency: string;
  symbol: string;
}

export const currencies: Currency[] = [
  { code: "BDT", currency: "Taka", symbol: "৳" },
  { code: "USD", currency: "US Dollar", symbol: "$" },
  { code: "EUR", currency: "Euro", symbol: "€" },
  { code: "GBP", currency: "British Pound", symbol: "£" },
  { code: "INR", currency: "Indian Rupee", symbol: "₹" },
  { code: "PKR", currency: "Pakistani Rupee", symbol: "₨" },
  { code: "JPY", currency: "Japanese Yen", symbol: "¥" },
  { code: "CNY", currency: "Chinese Yuan", symbol: "¥" },
  { code: "AUD", currency: "Australian Dollar", symbol: "A$" },
  { code: "CAD", currency: "Canadian Dollar", symbol: "C$" },
  { code: "SGD", currency: "Singapore Dollar", symbol: "S$" },
  { code: "AED", currency: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", currency: "Saudi Riyal", symbol: "﷼" },
  { code: "MYR", currency: "Malaysian Ringgit", symbol: "RM" },
  { code: "THB", currency: "Thai Baht", symbol: "฿" },
  { code: "KRW", currency: "South Korean Won", symbol: "₩" },
  { code: "RUB", currency: "Russian Ruble", symbol: "₽" },
  { code: "TRY", currency: "Turkish Lira", symbol: "₺" },
  { code: "ZAR", currency: "South African Rand", symbol: "R" },
  { code: "BRL", currency: "Brazilian Real", symbol: "R$" }
];