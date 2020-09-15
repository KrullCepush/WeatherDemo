import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import GoogleMapReact from "google-map-react";

import styles from "./styles.module.scss";

import { save_cords_AC } from "~/store/reducers/actions";

import Container from "@components/Container";
import SelectGeo from "./components/select";
import Dashboard from "./components/dashboard";
import LoadingGeo from "./components/loadingGeo";
import AcceptGeo from "./components/acceptGeo";

import wetherKey from "~/../weatherKey";

function FindGeo() {
  const [loading, setLoading] = useState(null);
  const [positionStatus, setPositionStatus] = useState(null);
  const [geoCoord, setGeoCoord] = useState({
    lat: null,
    lng: null,
    accept: null,
  });
  const positionStore = useSelector((state) => state.currentPossition);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    if (!positionStore.id) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoCoord({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accept: true,
          });
          setPositionStatus("accept");
        },
        (error) => {
          setPositionStatus("reject");
        },
        {
          timeout: 1000,
          maximumAge: 10000,
          enableHighAccuracy: true,
        }
      );
    }

    setTimeout(() => {
      setLoading(null);
    }, 3000);
  }, []);

  useEffect(() => {
    if (geoCoord.accept) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoCoord.lat}&lon=${geoCoord.lng}&appid=${wetherKey}`
      )
        .then((res) => res.json())
        .then((res) => dispatch(save_cords_AC(res)))
        .catch((error) => {
          console.log(error);
          setPositionStatus("reject");
        });
    }
  }, [geoCoord.accept]);

  function rejectCity() {
    setPositionStatus("reject");
  }

  function redirectTo(position = {}) {
    if (Object.keys(position).length > 0) {
      dispatch(save_cords_AC(position));
    }
    history.push("/home");
  }

  return (
    <div className={styles.bg}>
      <Container>
        <div className={styles.window}>
          <Dashboard />
          {loading && <LoadingGeo />}
          {!loading && positionStatus === "accept" && positionStore.id && (
            <AcceptGeo
              city={positionStore.name}
              reject={rejectCity}
              redirectTo={redirectTo}
            />
          )}
          {!loading && positionStatus === "reject" && (
            <SelectGeo redirectTo={redirectTo} />
          )}
        </div>
      </Container>
    </div>
  );
}

export default FindGeo;
