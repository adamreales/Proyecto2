import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer";
import Buscador from "../../components/Buscador/Buscador.jsx";
import { Outlet } from "react-router-dom";
import "./PublicLayout.css";

function PublicLayout() {
  return (
    <>
      <Header />
      <div className="public-layout-buscador">
        <Buscador />
      </div>
      <main className="public-layout">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
