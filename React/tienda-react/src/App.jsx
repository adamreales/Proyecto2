import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout/PublicLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";

import Home from "./pages/Home/Home";
import Conocenos from "./pages/Conocenos/Conocenos";
import Login from "./pages/Login/Login";
import Register from "./pages/Registro/Register";
import Perfil from "./pages/Perfil/Perfil";
import Normas from "./pages/Normas/Normas";

import "./App.css";

function App() {
  return (
    <Routes>

      {/* RUTAS PÚBLICAS */}
      <Route element={<PublicLayout />}>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/conocenos" element={<Conocenos />} />
        <Route path="/normas" element={<Normas />} />
      </Route>

      {/* RUTAS DE AUTENTICACIÓN */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Perfil />} />
      </Route>

    </Routes>
  );
}

export default App;
