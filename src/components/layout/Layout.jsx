// components/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="site-wrapper">
      <Header />
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;