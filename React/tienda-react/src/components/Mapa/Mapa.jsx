import React from "react";
import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapa.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const posicionTienda = [41.3477, 2.0775];

const iconoTienda = new Icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Mapa() {
  return (
    <section className="mapa-localizacion" aria-label="Mapa de localizacion">
      <div className="mapa-localizacion__encabezado">
        <h2>Visítanos en nuestra tienda física</h2>
        <p>
          Para disfrutar una experiencia de compra unica, te invitamos a visitar nuestra tienda física en el corazón de Barcelona. Estamos ubicados en el Centro Comercial Splau, a 50 metros del mejor estadio de Barcelona, a pocos pasos de las principales atracciones de la ciudad. Ven y descubre nuestro amplio catálogo de productos, recibe asesoramiento personalizado y disfruta de un ambiente acogedor diseñado para ti. ¡Te esperamos con los brazos abiertos!
        </p>
      </div>

      <MapContainer
        center={posicionTienda}
        zoom={15}
        scrollWheelZoom={false}
        className="mapa-localizacion__mapa"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={posicionTienda} icon={iconoTienda}>
          <Popup>
            <strong>Tienda React</strong>
            <br />
            <p>Centro Comercial Splau Local 21</p>
            <p>Barcelona, España  </p>
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}