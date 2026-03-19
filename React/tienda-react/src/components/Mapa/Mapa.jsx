import React from "react";
import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapa.css";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <section
      className="mapa-localizacion"
      aria-label={t("map.aria")}
    >

      <div className="mapa-localizacion__encabezado">
        <h2>{t("map.title")}</h2>
        <p>{t("map.description")}</p>
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
            <strong>{t("map.storeName")}</strong>
            <br />
            <p>{t("map.storeAddress")}</p>
            <p>{t("map.storeCity")}</p>
          </Popup>
        </Marker>

      </MapContainer>
    </section>
  );
}