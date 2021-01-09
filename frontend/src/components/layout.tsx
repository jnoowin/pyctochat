import React from "react";

interface ChildProps {
  children: React.ReactNode;
}

const Layout: React.FC<ChildProps> = ({ children }) => {
  return <div className="flex w-screen h-screen">{children}</div>;
};
export default Layout;
