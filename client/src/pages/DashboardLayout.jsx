import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import {
  LoadingIndicator,
  Navbar,
  SidebarLarge,
  SidebarSmall,
} from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import apiFetch from "../utils/apiFetch";
import { toast } from "react-toastify";

export const dashboardLoader = async () => {
  try {
    const { data } = await apiFetch.get("users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    navigate("/");
    await apiFetch.get("/auth/logout");
    toast.success("Logout successful");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SidebarSmall />
          <SidebarLarge />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? (
                <div className="loading-container">
                  <LoadingIndicator />
                </div>
              ) : (
                <Outlet context={{ user }} />
              )}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
