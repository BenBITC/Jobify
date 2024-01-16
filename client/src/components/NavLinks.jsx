import { NavLink } from "react-router-dom";
import navBarLinks from "../utils/navBarLinks";
import { useDashboardContext } from "../pages/DashboardLayout";
import { USER_ROLE } from "../../../server/utils/constants";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {navBarLinks.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === "admin" && role !== USER_ROLE.ADMIN) {
          return;
        }
        return (
          <NavLink
            to={path}
            key={text}
            onClick={isBigSidebar ? null : toggleSidebar}
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
