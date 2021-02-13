import React from "react";

// Components
import SideBar from "@Components/molecules/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="designSystem">
      <SideBar />
      <section className="designSystem--content">{children}</section>
    </div>
  );
};

export default Layout;
