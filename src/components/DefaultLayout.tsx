import { PropsWithChildren } from "react";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <div className="layout">
      <div className="sidebar d-flex justify-content-between">
        <span>Sidebar</span>
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
