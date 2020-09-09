import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
//requiers Libery

import { Test } from "@pages/Test";
import Key from "~/../key";
//components
import "~/styles/styles.scss";
//styles

export function App() {
  const [positionStore, setPositionStore] = useState({
    center: {
      lat: 57.95,
      lng: 30.33,
    },
    zoom: 11,
    location: false,
  });

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setPositionStore({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 11,
        location: true,
      });
      console.log(positionStore);
    },
    (error) => {
      console.error("ERROR: ", error);
    },
    {
      timeout: 1000,
      maximumAge: 10000,
      enableHighAccuracy: true,
    }
  );

  return (
    <div className="">
      {positionStore.location ? (
        <Geo positionStore={positionStore} />
      ) : (
        "Loading"
      )}
    </div>
  );
}

function Geo({ positionStore }) {
  const key = Key;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key }}
        defaultCenter={positionStore.center}
        defaultZoom={positionStore.zoom}
      >
        <Test
          lat={positionStore.center.lat}
          lng={positionStore.center.lng}
          text="Marke2r"
        />
      </GoogleMapReact>
    </div>
  );
}
