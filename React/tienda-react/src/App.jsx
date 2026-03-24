import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout/PublicLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import Home from "./pages/Home/Home";
import Conocenos from "./pages/Conocenos/Conocenos";
import Login from "./pages/Login/Login";
import Register from "./pages/Registro/Register";
import Perfil from "./pages/Perfil/Perfil";
import MisDatos from "./pages/MisDatos/MisDatos";
import Normas from "./pages/Normas/Normas";
import Videojuegos from "./pages/Videojuegos/Videojuegos";
import Producto from "./pages/Producto/Producto";
import Favoritos from "./pages/Oulet/Favoritos";
import Blog from "./pages/Blog/Blog";
import Carrito from "./pages/Carrito/Carrito";
import Denegada from "./pages/Denegada/Denegada";
import Aceptada from "./pages/Aceptada/Aceptada";
import Factura from "./pages/Factura/Factura";
import ForgotPassword from "./pages/OlvidarContraseña/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ChangePassword from "./pages/CanvioContraseña/ChangePassword";
import "./App.css";

function App() {
  return (
    <Routes>

      {/* RUTAS PÚBLICAS */}
      <Route element={<PublicLayout />}>
        <Route path="/home" element={<Home />} /> 
        <Route path="/" element={<Home />} />
        <Route path="/conocenos" element={<Conocenos />} />
        <Route path="/normas" element={<Normas />} />
        <Route path="/profile" element={<Perfil />} />
        <Route path="/mis-datos" element={<MisDatos />} />
        <Route path="/videojuegos" element={<Videojuegos />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/denegada" element={<Denegada />} />
        <Route path="/aceptada" element={<Aceptada />} />
        <Route path="/factura/:pedidoId" element={<Factura />} />
        <Route path="/misdatos" element={<MisDatos />} />
      </Route>

      {/* RUTAS DE AUTENTICACIÓN */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/cambiar-contraseña" element={<ChangePassword />} />
      </Route>

    </Routes>
  );
}

export default App;
