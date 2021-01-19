import React from "react";

export interface ChildProps {
  children: React.ReactNode;
}

const Layout: React.FC<ChildProps> = ({ children }: ChildProps) => {
  return <>{children}</>;
};
export default Layout;
