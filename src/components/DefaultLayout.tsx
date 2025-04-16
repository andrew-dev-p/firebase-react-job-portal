import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const user = JSON.parse(localStorage.getItem("user")!);

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

  return (
    <div className="layout">
      <div className="sidebar d-flex justify-content-between">
        <div className="menu">
          {userMenu.map((menuItem) => (
            <NavLink
              className={({ isActive }) =>
                "menu-item" + (isActive ? " active-menu-item" : "")
              }
              to={menuItem.path}
              key={menuItem.title}
              end={menuItem.path === "/"}
            >
              <i className={menuItem.iconClassName}></i>
              <span>{menuItem.title}</span>
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
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
      <div className="content-area">
        <div className="header d-flex justify-content-between">
          <span className="logo">Job Portal</span>
          <div className="d-flex align-items-center gap-2">
            <i className="ri-shield-user-line"></i>
            <span>{user.name}</span>
          </div>
        </div>
        <div className="body">Body</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
