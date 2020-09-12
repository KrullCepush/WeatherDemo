import React, { useState, useEffect } from "react";

import Container from "@components/Container";
import SelectGeo from "./components/select";
import Dashboard from "./components/dashboard";

import styles from "./styles.module.scss";

function FindGeo() {
  const [errorGeo, setEroorGeo] = useState(null);
  const [loading, setLoading] = useState(null);
  const [positionStore, setPositionStore] = useState(null);
  console.log(errorGeo);

  useEffect(() => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPositionStore({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom: 10,
        });
      },
      (error) => {
        setEroorGeo("error");
        console.log("hi");
      },
      {
        timeout: 1000,
        maximumAge: 10000,
        enableHighAccuracy: true,
      }
    );
    setLoading(false);
  }, []);

  return (
    <Container>
      <div className={styles.window}>
        <div className={styles.bg}>
          <Dashboard />
          {errorGeo ? <SelectGeo /> : ""}
        </div>
      </div>
    </Container>
  );
}

export default FindGeo;
