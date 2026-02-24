import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./PublicLayout.css";
import Buscador from "../../components/Buscador/Buscador.jsx";

function PublicLayout() {
  return (
    <>
      <Header />
      <Buscador />
      <main className="public-layout">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
