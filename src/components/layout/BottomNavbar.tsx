import { sidebarNavLinks, type PageObject } from "@/constants/routeConstants";
import { useLocation } from "react-router";
import NavLinkItem from "./NavLinkItem";
// import { Button } from "../ui/button";

const BottomNavbar = () => {
  const currentPath = useLocation().pathname;
  return (
    <ul className="flex fixed bottom-0 left-0 right-0 bg-card border-t justify-between z-100">
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
              variant="bottom"
            />
          );
        }
      })}
    </ul>
  );
};

export default BottomNavbar;
