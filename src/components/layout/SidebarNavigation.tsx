import { sidebarNavLinks, type PageObject } from "@/constants/routeConstants";
import { useLocation } from "react-router";
import NavLinkItem from "./NavLinkItem";

const SidebarNavigation = () => {
  const currentPath = useLocation().pathname;

  return (
    <ul className="py-6 mx-4">
      {sidebarNavLinks.map((page: PageObject) => (
        <NavLinkItem
          key={page.title}
          currentPath={currentPath}
          href={page.href}
          icon={page.icon}
          title={page.title}
          color={page.color}
        />
      ))}
    </ul>
  );
};

export default SidebarNavigation;
