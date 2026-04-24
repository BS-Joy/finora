import { cn } from "@/lib/utils";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";

interface Pages {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarPages: Pages[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard />,
  },
  {
    title: "Income",
    href: "/income",
    icon: <BanknoteArrowUp color="#91ad00" />,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: <BanknoteArrowDown color="#e7000b" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings />,
  },
];

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  return (
    <ul className="py-6 mx-4">
      {sidebarPages.map((page) => (
        <li
          key={page.title}
          className={cn(
            "group flex items-center gap-3 px-6 py-4 text-sm font-medium rounded-lg cursor-pointer transition-colors duration-500",
            {
              "bg-primary text-accent hover:cursor-not-allowed":
                currentPath === page.href,
              "text-primary hover:bg-secondary": currentPath !== page.href,
            },
          )}
          onClick={() => navigate(page.href)}
        >
          <span
            className={cn(
              `${page.title === "Settings" ? "group-hover:animate-spin" : " group-hover:scale-110"}`,
            )}
          >
            {page.icon}
          </span>
          <span className="text-md">{page.title}</span>
          {currentPath === page.href && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default SidebarNavigation;
