import React from "react";
import Menu from "./menu";

export interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      <Menu />
      {children}
    </div>
  );
};
export default Layout;
