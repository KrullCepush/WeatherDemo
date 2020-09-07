import React from "react";
import GoogleMapReact from "google-map-react";
//requiers Libery

import { Test } from "@pages/Test";
import Key from "~/../key";
//components
import "~/styles/styles.scss";
//styles

export function App(props) {
  const key = Key;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
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
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
        >
          <Test
            lat={props.center.lat}
            lng={props.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}

App.defaultProps = {
  center: {
    lat: 57.95,
    lng: 30.33,
  },
  zoom: 11,
};
