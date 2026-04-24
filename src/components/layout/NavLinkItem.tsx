import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { type LucideIcon } from "lucide-react";

interface NavLinkItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: string;
  currentPath: string;
  variant?: "sidebar" | "bottom";
}

const NavLinkItem = ({
  title,
  href,
  icon: Icon,
  color,
  currentPath,
  variant = "sidebar",
}: NavLinkItemProps) => {
  const navigate = useNavigate();

  const isActive = currentPath === href;
  const isBottom = variant === "bottom";

  return (
    <li
      onClick={() => navigate(href)}
      className={cn(
        "group cursor-pointer transition-colors duration-500",
        isBottom
          ? "w-full flex flex-col items-center gap-3 text-primary/50 p-2 sm:px-6 sm:py-4 text-sm font-semibold"
          : "flex items-center gap-3 px-6 py-4 text-sm font-medium rounded-lg",
        {
          // active
          "bg-primary text-accent hover:cursor-not-allowed":
            isActive && !isBottom,
          "border-t-2 border-t-primary hover:cursor-not-allowed text-primary font-bold":
            isActive && isBottom,

          // inactive
          "text-primary hover:bg-secondary": !isActive,
        },
      )}
    >
      {/* Icon */}
      <span
        className={cn(
          title === "Settings"
            ? "group-hover:animate-spin"
            : "group-hover:scale-110",
        )}
      >
        <Icon
          size={isBottom ? 18 : 20}
          color={color}
          strokeWidth={isActive ? 3 : 2}
        />
      </span>

      {/* Title */}
      <span className="text-md">{title}</span>

      {/* Active indicator (sidebar only) */}
      {!isBottom && isActive && (
        <span className="ml-auto w-2 h-2 rounded-full bg-lime animate-pulse" />
      )}
    </li>
  );
};

export default NavLinkItem;
