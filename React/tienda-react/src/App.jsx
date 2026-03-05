import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout/PublicLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";

import Home from "./pages/Home/Home";
import Conocenos from "./pages/Conocenos/Conocenos";
import Login from "./pages/Login/Login";
import Register from "./pages/Registro/Register";
import Perfil from "./pages/Perfil/Perfil";
import Normas from "./pages/Normas/Normas";
import Videojuegos from "./pages/Videojuegos/Videojuegos";
import Producto from "./pages/Producto/Producto";
import Oulet from "./pages/Oulet/Oulet";
import Blog from "./pages/Blog/Blog";
import Merchan from "./pages/Merchan/Merchan";
import Carrito from "./pages/Carrito/Carrito";
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
        <Route path="/videojuegos" element={<Videojuegos />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/oulet" element={<Oulet />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/merchan" element={<Merchan />} />
        <Route path="/carrito" element={<Carrito />} />
      </Route>

      {/* RUTAS DE AUTENTICACIÓN */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Route>

    </Routes>
  );
}

export default App;
