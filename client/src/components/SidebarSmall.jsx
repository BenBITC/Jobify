import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import navBarLinks from "../utils/navBarLinks";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

const SidebarSmall = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" type="button" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks functionOnClickingALink={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};
export default SidebarSmall;
