import React from "react";
import GoogleMapReact from "google-map-react";

//requiers Libery
import { Test } from "@pages/Test";
//components
import "~/styles/styles.scss";
//styles

export function App(props) {
  const key = "AIzaSyDiwN_yv2iQGNiNOovFH-SqLYmcOCI91pA";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
    },
    (error) => {
      console.error(error);
    },
    {
      timeout: 1000,
      maximumAge: 10000,
      enableHighAccuracy: true,
    }
  );

  return (
    <div className="">
      <div className="f-title">Hello</div>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
        >
          <Test lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </div>
  );
}

App.defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};
