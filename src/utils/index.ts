import {
  Wallet,
  Landmark,
  CreditCard,
  PiggyBank,
  Briefcase,
  Home,
  Coins,
  Plane,
  ShoppingBag,
  Car,
  Gamepad2,
  HeartPulse,
  GraduationCap,
  Smartphone,
  Bitcoin,
  type LucideIcon,
} from "lucide-react";

export interface Currency {
  code: string;
  currency: string;
  symbol: string;
}

export interface WalletIconsSchema {
  name: string;
  label: string;
  icon: LucideIcon
}

export const currencies: Currency[] = [
  { code: "BDT", currency: "Taka", symbol: "৳" },
  { code: "USD", currency: "US Dollar", symbol: "$" },
  { code: "EUR", currency: "Euro", symbol: "€" },
  { code: "GBP", currency: "British Pound", symbol: "£" },
  { code: "INR", currency: "Indian Rupee", symbol: "₹" },
  { code: "PKR", currency: "Pakistani Rupee", symbol: "₨" },
  { code: "JPY", currency: "Japanese Yen", symbol: "¥" },
  { code: "CNY", currency: "Chinese Yuan", symbol: "¥ " },
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


export const walletIcons: WalletIconsSchema[] = [
  {
    name: "wallet",
    label: "Wallet",
    icon: Wallet,
  },
  {
    name: "bank",
    label: "Bank",
    icon: Landmark,
  },
  {
    name: "card",
    label: "Card",
    icon: CreditCard,
  },
  {
    name: "savings",
    label: "Savings",
    icon: PiggyBank,
  },
  {
    name: "business",
    label: "Business",
    icon: Briefcase,
  },
  {
    name: "home",
    label: "Home",
    icon: Home,
  },
  {
    name: "cash",
    label: "Cash",
    icon: Coins,
  },
  {
    name: "travel",
    label: "Travel",
    icon: Plane,
  },
  {
    name: "shopping",
    label: "Shopping",
    icon: ShoppingBag,
  },
  {
    name: "car",
    label: "Car",
    icon: Car,
  },
  {
    name: "gaming",
    label: "Gaming",
    icon: Gamepad2,
  },
  {
    name: "health",
    label: "Health",
    icon: HeartPulse,
  },
  {
    name: "education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    name: "mobile",
    label: "Mobile",
    icon: Smartphone,
  },
  {
    name: "crypto",
    label: "Crypto",
    icon: Bitcoin,
  },
];