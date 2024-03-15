/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import styles from './Map.module.css'
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useGeoLocation } from '../Hooks/useGeoLocation'
import Button from './Button'
import { useUrl } from '../Hooks/useUrl';



function Map() {
  

 const [ mapPosition, setMapPosition] = useState([40, 0])
 const [Maplat, Maplng ] = useUrl();
  //  const [searchParams, setSearchParams ] = useSearchParams();
 const {
   isLoading: isLoadingPosition,
   position: geoLocationPosition,
   getPosition,
 } = useGeoLocation();
    // const Maplat = searchParams.get("lat");
    // const Maplng = searchParams.get("lng");

    useEffect(
      function () {
        if (Maplat && Maplng) setMapPosition([Maplat, Maplng]);
      },
      [Maplat, Maplng]
    );

    useEffect(
      function () {
        if (geoLocationPosition)
          setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      },
      [geoLocationPosition]
    );

    const {cities} = useCities();

    return (
      <div className={styles.mapContainer}>
        {!geoLocationPosition && (
        <Button onClick={getPosition} type="position" >
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
        <MapContainer
          center={mapPosition}
          zoom={6}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
{Array.isArray(cities) && cities.length > 0 ? (
  cities.map((city) => (
    <Marker
      position={[city.position.lat, city.position.lng]}
      key={city.id}
    >
      <Popup>
        <span>{city.emoji}</span>
        <span>{city.cityName}</span>
      </Popup>
    </Marker>
  ))
) : (
  <p>No cities data available.</p>
)}


           <ChangeCenter position={mapPosition} />
         <DetectClick />
        </MapContainer>

      </div>
    );
}

// custom component
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// costom component
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map
