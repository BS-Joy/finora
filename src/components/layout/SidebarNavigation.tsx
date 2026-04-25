import { sidebarNavLinks, type PageObject } from "@/constants/routeConstants";
import { useLocation } from "react-router";
import NavLinkItem from "./NavLinkItem";

const SidebarNavigation = () => {
  const currentPath = useLocation().pathname;

  return (
    <ul className="py-6 mx-4">
      {sidebarNavLinks.map((page: PageObject) => {
        if (page.title === "Button") {
          return (
            // <Button variant="outline" className="rounded-full">
            //   <page.icon size={18} />{" "}
            //   {/* Using the icon from the routeConstants */}
            // </Button>
            null
          );
        } else {
          return (
            <NavLinkItem
              key={page.title}
              currentPath={currentPath}
              href={page.href}
              icon={page.icon}
              title={page.title}
              color={page.color}
            />
          );
        }
      })}
    </ul>
  );
};

export default SidebarNavigation;
