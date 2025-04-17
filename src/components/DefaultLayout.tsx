import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUserProfile } from "../firebase/userService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/alertSlice";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user")!);

  const [collapsed, setCollapsed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const getData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const response = await getUserProfile();
      if (response.data?.isAdmin) {
        setIsAdmin(true);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch user profile"
      );
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const userMenu = [
    {
      title: "Home",
      path: "/",
      iconClassName: "ri-home-7-line",
    },
    {
      title: "Applied jobs",
      path: "/applied-jobs",
      iconClassName: "ri-file-list-3-line",
    },
    {
      title: "Posted jobs",
      path: "/posted-jobs",
      iconClassName: "ri-file-list-2-line",
    },
    {
      title: "Profile",
      path: "/profile",
      iconClassName: "ri-user-2-line",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      path: "/",
      iconClassName: "ri-home-7-line",
    },
    {
      title: "Applications",
      path: "/admin/applications",
      iconClassName: "ri-file-list-3-line",
    },
    {
      title: "Jobs",
      path: "/admin/jobs",
      iconClassName: "ri-file-list-2-line",
    },
    {
      title: "Users",
      path: "/admin/users",
      iconClassName: "ri-user-2-line",
    },
  ];

  const menuToRender = isAdmin ? adminMenu : userMenu;

  return (
    <div className={`layout${collapsed ? " sidebar-collapsed" : ""}`}>
      <div className="sidebar d-flex justify-content-between">
        <div className="menu">
          {menuToRender.map((menuItem) => (
            <NavLink
              className={({ isActive }) =>
                "menu-item" + (isActive ? " active-menu-item" : "")
              }
              to={menuItem.path}
              key={menuItem.title}
              end={menuItem.path === "/"}
            >
              <i className={menuItem.iconClassName}></i>
              {!collapsed && <span>{menuItem.title}</span>}
            </NavLink>
          ))}
          <NavLink
            className={({ isActive }) =>
              "menu-item" + (isActive ? " active-menu-item" : "")
            }
            to="/login"
            onClick={() => localStorage.removeItem("user")}
          >
            <i className="ri-logout-circle-line"></i>
            {!collapsed && <span>Logout</span>}
          </NavLink>
        </div>
      </div>
      <div className="content-area">
        <div className="header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <button
              className="collapse-btn text-white"
              onClick={() => setCollapsed((prev) => !prev)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: 24,
              }}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <i
                className={
                  collapsed ? "ri-arrow-right-s-line" : "ri-arrow-left-s-line"
                }
              />
            </button>
            <span className="logo">Job Portal</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="ri-shield-user-line"></i>
            <span>{user.name}</span>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
