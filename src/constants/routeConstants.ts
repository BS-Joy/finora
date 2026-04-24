import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  LayoutDashboard,
  Plus,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface PageObject {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: string;
}

export const sidebarNavLinks: PageObject[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Income",
    href: "/income",
    icon: BanknoteArrowUp,
    // color: "#91ad00",
  },
  {
    title: 'Button',
    href: '#',
    icon: Plus,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: BanknoteArrowDown,
    // color: "#e7000b",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];