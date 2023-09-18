import React, { ReactNode } from "react";
import { Header } from "../components/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
