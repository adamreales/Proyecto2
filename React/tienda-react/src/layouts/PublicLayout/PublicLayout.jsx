import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./PublicLayout.css";

function PublicLayout() {
  return (
    <>
      <Header />
      <main className="public-layout">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
